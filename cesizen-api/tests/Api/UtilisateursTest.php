<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\BrowserKit\Cookie;

class UtilisateursTest extends ApiTestCaseBase
{
    public function testGetUtilisateur(): void
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
            '/api/utilisateurs/' . $admin->getId()
        );

        $this->assertResponseIsSuccessful();
    }

    public function testAlterUtilisateur(): void
    {
        $client = static::createClient();
        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);

        $jwtManager = $container->get(JWTTokenManagerInterface::class);

        $user = $userRepository->createQueryBuilder('u')
            ->join('u.role', 'r')
            ->where('r.code = :code')
            ->setParameter('code', 'ROLE_USER')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

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

        $client->request(
            'PATCH',
            '/api/utilisateurs/' . $user->getId(),
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Accept' => 'application/ld+json',
                    'Content-Type' => 'application/merge-patch+json',
                ],
                'json' => [
                    'nom' => 'nom-update-test',
                    'prenom' => 'prenom-update-test',
                    'email' => 'test@testovich.com',
                    'dateCreation' => (new \DateTime())->format(DATE_ATOM),
                ],
            ]
        );

        $this->assertResponseIsSuccessful();
    }

    public function testDeleteUtilisateurUnauthorized(): void
    {
        $client = static::createClient();
        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);

        $jwtManager = $container->get(JWTTokenManagerInterface::class);

        $user = $userRepository->createQueryBuilder('u')
            ->join('u.role', 'r')
            ->where('r.code = :code')
            ->setParameter('code', 'ROLE_USER')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

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

        $client->request(
            'DELETE',
            '/api/utilisateurs/' . $user->getId(),
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Accept' => 'application/ld+json',
                ],
            ]
        );

        $this->assertResponseStatusCodeSame(403);
    }
}