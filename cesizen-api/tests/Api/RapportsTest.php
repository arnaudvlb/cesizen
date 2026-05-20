<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class RapportsTest extends ApiTestCaseBase
{
    public function testGetRapports(): void
    {
        $client = static::createClient();

        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);
        $jwtManager = $container->get(JWTTokenManagerInterface::class);

        $user = $userRepository->findOneBy([]);

        $token = $jwtManager->create($user);

        $response = $client->request('GET', '/api/rapports/me', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
            ],
        ]);

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertArrayHasKey('@context', $data);
        $this->assertArrayHasKey('member', $data);

        $this->assertIsArray($data['member']);

        if (!empty($data['member'])) {
            $this->assertArrayHasKey('reponses', $data['member'][0]);
            $this->assertArrayHasKey('dateRapport', $data['member'][0]);
            $this->assertArrayHasKey('emotionGenerale', $data['member'][0]);
            $this->assertArrayHasKey('utilisateur', $data['member'][0]);
        }
    }

    public function testAlterRapport(): void
    {
        $client = static::createClient();
        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);
        $emotionRepository = $container->get(\App\Repository\EmotionGeneralesRepository::class);
        $jwtManager = $container->get(\Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface::class);

        $user = $userRepository->findOneBy([]);
        $this->assertNotNull($user, 'TEST INIT ECHOUE: aucun utilisateur en base');

        $emotion = $emotionRepository->findOneBy([]);
        $this->assertNotNull($emotion, 'TEST INIT ECHOUE: aucune emotionGenerale en base');

        $token = $jwtManager->create($user);

        $response = $client->request('POST', '/api/rapports', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/ld+json',
                'Content-Type' => 'application/ld+json',
            ],
            'json' => [
                'reponses' => 'test-create',
                'commentaire' => 'init',
                'dateRapport' => (new \DateTime())->format(DATE_ATOM),
                'emotionGenerale' => '/api/emotion_generales/' . $emotion->getId(),
            ],
        ]);

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $iri = $data['@id'] ?? null;
        $this->assertNotNull($iri, 'CREATE ECHOUE: @id absent dans la réponse');

        $id = (int) basename($iri);
        $this->assertGreaterThan(0, $id, 'CREATE ECHOUE: ID invalide');


        $client->request('PATCH', '/api/rapports/' . $id, [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/ld+json',
                'Content-Type' => 'application/merge-patch+json',
            ],
            'json' => [
                'reponses' => 'test-patch',
                'commentaire' => 'updated',
            ],
        ]);

        $this->assertResponseIsSuccessful();


        $client->request('DELETE', '/api/rapports/' . $id, [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/ld+json',
            ],
        ]);

        $this->assertResponseIsSuccessful();


        $em = $container->get('doctrine')->getManager();

        $deleted = $em
            ->getRepository(\App\Entity\Rapports::class)
            ->find($id);

        $this->assertNull($deleted, 'DELETE ECHOUE: le rapport n\'a pas été supprimé de la base de données');
    }
}
