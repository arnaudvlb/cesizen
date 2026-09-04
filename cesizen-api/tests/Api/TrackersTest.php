<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\BrowserKit\Cookie;

class TrackersTest extends ApiTestCaseBase
{
    public function testGetTrackers(): void
    {
        $client = static::createClient();
        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);

        $jwtManager = $container->get(JWTTokenManagerInterface::class);

        $user = $userRepository->findOneBy([]);

        $this->assertNotNull(
            $user,
            'TEST INIT ECHOUE: aucun utilisateur en base'
        );

        $token = $jwtManager->create($user);

        $client->getCookieJar()->set(
            new Cookie('JWT', $token)
        );

        $response = $client->request(
            'GET',
            '/api/trackers/me'
        );

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertArrayHasKey('@context', $data);
        $this->assertArrayHasKey('member', $data);
        $this->assertIsArray($data['member']);

        if (!empty($data['member'])) {
            $this->assertArrayHasKey('dateDebut', $data['member'][0]);
            $this->assertArrayHasKey('dateFin', $data['member'][0]);
            $this->assertArrayHasKey('libelle', $data['member'][0]);
            $this->assertArrayHasKey('description', $data['member'][0]);
        }
    }

    public function testAlterTracker(): void
    {
        $client = static::createClient();
        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);

        $jwtManager = $container->get(JWTTokenManagerInterface::class);

        $user = $userRepository->findOneBy([]);

        $this->assertNotNull(
            $user,
            'TEST INIT ECHOUE: aucun utilisateur en base'
        );

        $token = $jwtManager->create($user);

        $client->getCookieJar()->set(
            new Cookie('JWT', $token)
        );

        $csrfResponse = $client->request(
            'GET',
            '/api/csrf-token'
        );

        $this->assertResponseIsSuccessful();

        $csrfData = $csrfResponse->toArray();
        $csrfToken = $csrfData['token'];

        $response = $client->request(
            'POST',
            '/api/trackers',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Accept' => 'application/ld+json',
                    'Content-Type' => 'application/ld+json',
                ],
                'json' => [
                    'dateDebut' => (new \DateTime())->format(DATE_ATOM),
                    'dateFin' => (new \DateTime('+1 day'))->format(DATE_ATOM),
                    'libelle' => 'test-create',
                    'description' => 'init',
                ],
            ]
        );

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $iri = $data['@id'] ?? null;

        $this->assertNotNull(
            $iri,
            'CREATE ECHOUE: @id absent dans la réponse'
        );

        $id = (int) basename($iri);

        $this->assertGreaterThan(
            0,
            $id,
            'CREATE ECHOUE: ID invalide'
        );

        $client->request(
            'PATCH',
            '/api/trackers/' . $id,
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Accept' => 'application/ld+json',
                    'Content-Type' => 'application/merge-patch+json',
                ],
                'json' => [
                    'libelle' => 'test-patch',
                    'description' => 'updated desc',
                ],
            ]
        );

        $this->assertResponseIsSuccessful();

        $client->request(
            'DELETE',
            '/api/trackers/' . $id,
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Accept' => 'application/ld+json',
                ],
            ]
        );

        $this->assertResponseIsSuccessful();

        $em = $container
            ->get('doctrine')
            ->getManager();

        $deleted = $em
            ->getRepository(\App\Entity\Trackers::class)
            ->find($id);

        $this->assertNull(
            $deleted,
            'DELETE ECHOUE: le tracker n\'a pas été supprimé de la base de données'
        );
    }
}
