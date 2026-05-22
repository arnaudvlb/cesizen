<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class UtilisateursTest extends ApiTestCaseBase
{
    public function testGetUtilisateur(): void
    {
        $client = static::createClient();

        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);
        $jwtManager = $container->get(JWTTokenManagerInterface::class);

        $user = $userRepository->findOneBy([]);

        $token = $jwtManager->create($user);

        $client->request(
            'GET',
            '/api/utilisateurs/' . $user->getId(),
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                ],
            ]
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

        $client->request(
            'PATCH',
            '/api/utilisateurs/' . $user->getId(),
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
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

        $client->request(
            'DELETE',
            '/api/utilisateurs/' . $user->getId(),
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/ld+json',
                ],
            ]
        );

        $this->assertResponseStatusCodeSame(403);
    }
}
