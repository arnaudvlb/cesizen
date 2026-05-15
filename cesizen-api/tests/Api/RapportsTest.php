<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class RapportsTest extends ApiTestCase
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

    public function testCreateRapport(): void
    {
        $client = static::createClient();
        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);
        $jwtManager = $container->get(JWTTokenManagerInterface::class);

        $user = $userRepository->findOneBy([]);
        $token = $jwtManager->create($user);

        $response = $client->request('POST', '/api/rapports', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/ld+json',
                'Accept' => 'application/ld+json',
            ],
            'json' => [
                'reponses' => 'test',
                'dateRapport' => (new \DateTime())->format(DATE_ATOM),
                'emotionGenerale' => '/api/emotion_generales/1',
            ]
        ]);

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertEquals('test', $data['reponses']);
        $this->assertArrayHasKey('dateRapport', $data);
        $this->assertArrayHasKey('emotionGenerale', $data);
        $this->assertArrayHasKey('utilisateur', $data);
    }
}
