<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AuthControllerTest extends WebTestCase
{
    public function testLoginSuccess(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            '/api/login',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'admin@test.com',
                'password' => 'mdp'
            ])
        );

        $this->assertResponseIsSuccessful();

        $data = json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertArrayHasKey('token', $data);
    }

    public function testLoginFail(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            '/api/login',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'email' => 'admin@test.com',
                'password' => 'mauvais'
            ])
        );

        $this->assertResponseStatusCodeSame(401);
    }

    public function testRegisterSuccess(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => uniqid() . '@test.com',
            'password' => 'password123',
            'nom' => 'Doe',
            'prenom' => 'John'
        ]));

        $this->assertResponseIsSuccessful();

        $data = json_decode($client->getResponse()->getContent(), true);

        $this->assertArrayHasKey('message', $data);
        $this->assertEquals('Inscription réussie', $data['message']);
    }

    public function testRegisterFail(): void
    {
        $client = static::createClient();

        $client->request('POST', '/api/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => 'duplicate@test.com',
            'password' => 'password123',
            'nom' => 'Doe',
            'prenom' => 'John'
        ]));

        $client->request('POST', '/api/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => 'duplicate@test.com',
            'password' => 'password123',
            'nom' => 'Doe',
            'prenom' => 'John'
        ]));

        $this->assertResponseStatusCodeSame(400);
    }
}
