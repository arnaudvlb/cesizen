<?php

namespace App\Tests\Controller;

use App\Tests\Api\ApiTestCaseBase;

final class MeControllerTest extends ApiTestCaseBase
{
    public function testMeUnauthorized(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/me');

        $this->assertResponseStatusCodeSame(401);
    }

    public function testMeAuthorized(): void
    {
        $client = static::createClient();

        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);
        $jwtManager = $container->get(\Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface::class);

        $user = $userRepository->findOneBy([]);

        $token = $jwtManager->create($user);

        $response = $client->request('GET', '/api/me', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
            ],
        ]);

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertSame($user->getEmail(), $data['email']);
        $this->assertSame($user->getId(), $data['id']);
        $this->assertSame($user->getRoles(), $data['roles']);
        $this->assertSame($user->getNom(), $data['nom']);   
        $this->assertSame($user->getPrenom(), $data['prenom']);
        $this->assertSame($user->getDateCreation()->format('Y-m-d H:i:s'), $data['date_creation']);
    }
}
