<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;
use Symfony\Component\BrowserKit\Cookie;

class EmotionsTest extends ApiTestCaseBase
{
    public function testGetEmotions(): void
    {
        $client = static::createClient();
        $response = $client->request('GET', '/api/emotions');

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertArrayHasKey('@context', $data);
        $this->assertArrayHasKey('member', $data);
        $this->assertIsArray($data['member']);

        if (!empty($data['member'])) {
            $this->assertArrayHasKey('libelle', $data['member'][0]);
            $this->assertArrayHasKey('emotionGenerale', $data['member'][0]);
        }
    }

    public function testGetEmotionsByEmotionGenerale(): void
    {
        $client = static::createClient();

        $response = $client->request(
            'GET',
            '/api/emotions?emotionGenerale.id=1'
        );

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertArrayHasKey('member', $data);
        $this->assertIsArray($data['member']);

        if (!empty($data['member'])) {
            foreach ($data['member'] as $emotion) {
                $this->assertArrayHasKey(
                    'emotionGenerale',
                    $emotion
                );

                $this->assertEquals(
                    1,
                    $emotion['emotionGenerale']['id']
                );
            }
        }
    }

    public function testAlterEmotion(): void
    {
        $client = static::createClient();
        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);

        $emotionGeneraleRepository = $container->get(\App\Repository\EmotionGeneralesRepository::class);

        $jwtManager = $container->get(\Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface::class);

        $admin = $userRepository->createQueryBuilder('u')
            ->join('u.role', 'r')
            ->where('r.code = :code')
            ->setParameter('code', 'ROLE_ADMIN')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        $this->assertNotNull(
            $admin,
            'TEST INIT ECHOUE: Aucun administrateur n\'a pas été trouvé en base'
        );

        $emotionGenerale = $emotionGeneraleRepository->findOneBy([]);

        $this->assertNotNull(
            $emotionGenerale,
            'TEST INIT ECHOUE: Aucune émotion générale n\'a été trouvée en base'
        );

        $token = $jwtManager->create($admin);

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
            '/api/emotions',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Accept' => 'application/ld+json',
                    'Content-Type' => 'application/ld+json',
                ],
                'json' => [
                    'libelle' => 'Test Emotion',
                    'description' => 'Description test',
                    'emotionGenerale' =>
                    '/api/emotion_generales/' .
                        $emotionGenerale->getId(),
                ],
            ]
        );

        $this->assertResponseIsSuccessful(
            'CREATE ECHOUE: impossible de créer une emotion'
        );

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
            '/api/emotions/' . $id,
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Accept' => 'application/ld+json',
                    'Content-Type' => 'application/merge-patch+json',
                ],
                'json' => [
                    'libelle' => 'Emotion Modifiée',
                    'description' => 'Description modifiée',
                ],
            ]
        );

        $this->assertResponseIsSuccessful();

        $client->request(
            'DELETE',
            '/api/emotions/' . $id,
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

        $deletedEmotion = $em
            ->getRepository(\App\Entity\Emotions::class)
            ->find($id);

        $this->assertNull(
            $deletedEmotion,
            'DELETE ECHOUE: l\'emotion existe encore en base'
        );
    }
}
