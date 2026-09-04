<?php

namespace App\Tests\Controller;

use App\Tests\Api\ApiTestCaseBase;

class AuthControllerTest extends ApiTestCaseBase
{
    public function testLoginSuccess(): void
    {
        $client = static::createClient();

        $csrfResponse = $client->request(
            'GET',
            '/api/csrf-token'
        );

        $this->assertResponseIsSuccessful();

        $csrfData = $csrfResponse->toArray();
        $csrfToken = $csrfData['token'];

        $client->request(
            'POST',
            '/api/login',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'email' => 'admin@test.com',
                    'password' => 'mdp',
                ],
            ]
        );

        $this->assertResponseIsSuccessful();

        $data = json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertArrayHasKey('message', $data);
        $this->assertSame('Connexion réussie.', $data['message']);

        $jwtCookie = $client
            ->getCookieJar()
            ->get('JWT');

        $this->assertNotNull($jwtCookie);
        $this->assertNotEmpty($jwtCookie->getValue());
    }

    public function testLoginFail(): void
    {
        $client = static::createClient();

        $csrfResponse = $client->request(
            'GET',
            '/api/csrf-token'
        );

        $this->assertResponseIsSuccessful();

        $csrfData = $csrfResponse->toArray();
        $csrfToken = $csrfData['token'];

        $client->request(
            'POST',
            '/api/login',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'email' => 'admin@test.com',
                    'password' => 'mauvais',
                ],
            ]
        );

        $this->assertResponseStatusCodeSame(401);

        $data = json_decode(
            $client->getResponse()->getContent(false),
            true
        );

        $this->assertSame(
            'Identifiants invalides.',
            $data['message']
        );
    }

    public function testRegisterSuccess(): void
    {
        $client = static::createClient();

        $csrfResponse = $client->request(
            'GET',
            '/api/csrf-token'
        );

        $this->assertResponseIsSuccessful();

        $csrfData = $csrfResponse->toArray();
        $csrfToken = $csrfData['token'];

        $client->request(
            'POST',
            '/api/register',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'email' => uniqid() . '@test.com',
                    'password' => 'Password123!',
                    'nom' => 'Doe',
                    'prenom' => 'John',
                ],
            ]
        );

        $this->assertResponseStatusCodeSame(201);

        $data = json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertArrayHasKey('message', $data);
        $this->assertSame(
            'Inscription réussie.',
            $data['message']
        );
    }

    public function testRegisterFail(): void
    {
        $client = static::createClient();

        $csrfResponse = $client->request(
            'GET',
            '/api/csrf-token'
        );

        $this->assertResponseIsSuccessful();

        $csrfData = $csrfResponse->toArray();
        $csrfToken = $csrfData['token'];

        $email = uniqid() . '@test.com';

        $payload = [
            'email' => $email,
            'password' => 'Password123!',
            'nom' => 'Doe',
            'prenom' => 'John',
        ];

        $client->request(
            'POST',
            '/api/register',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => $payload,
            ]
        );

        $this->assertResponseStatusCodeSame(201);

        $client->request(
            'POST',
            '/api/register',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => $payload,
            ]
        );

        $this->assertResponseStatusCodeSame(422);
    }

    public function testLogout(): void
    {
        $client = static::createClient();

        $csrfResponse = $client->request(
            'GET',
            '/api/csrf-token'
        );

        $this->assertResponseIsSuccessful();

        $csrfData = $csrfResponse->toArray();
        $csrfToken = $csrfData['token'];

        $client->request(
            'POST',
            '/api/login',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'email' => 'admin@test.com',
                    'password' => 'mdp',
                ],
            ]
        );

        $this->assertResponseIsSuccessful();

        $this->assertNotNull(
            $client->getCookieJar()->get('JWT')
        );

        $client->request(
            'POST',
            '/api/logout',
            [
                'headers' => [
                    'csrf-token' => $csrfToken,
                ],
            ]
        );

        $this->assertResponseIsSuccessful();

        $data = json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertSame(
            'Déconnexion réussie.',
            $data['message']
        );

        $jwtCookie = $client
            ->getCookieJar()
            ->get('JWT');

        $this->assertNull($jwtCookie);
    }
}
