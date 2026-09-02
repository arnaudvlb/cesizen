<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\BrowserKit\Cookie;

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

        $this->assertNotNull(
            $admin,
            'TEST INIT ECHOUE: aucun administrateur en base'
        );

        $token = $jwtManager->create($admin);

        $client->getCookieJar()->set(
            new Cookie('JWT', $token)
        );

        $client->request(
            'GET',
            '/api/roles_utilisateurs'
        );

        $this->assertResponseIsSuccessful();
    }
}
