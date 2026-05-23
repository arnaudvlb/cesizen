<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class RolesUtilisateursTest extends ApiTestCaseBase
{
    public function testGetRolesUtilisateurs(): void
    {
        $client = static::createClient();

        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);
        $jwtManager = $container->get(JWTTokenManagerInterface::class);

        $admin = $userRepository->createQueryBuilder('u')
            ->join('u.role', 'r')
            ->where('r.code = :code')
            ->setParameter('code', 'ROLE_ADMIN')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        $token = $jwtManager->create($admin);

        $client->request(
            'GET',
            '/api/roles_utilisateurs',
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                ],
            ]
        );

        $this->assertResponseIsSuccessful();
    }
}