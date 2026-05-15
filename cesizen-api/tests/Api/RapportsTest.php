<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class RapportsTest extends ApiTestCase
{
    public function testGetRapports(): void
    {
        $client = static::createClient();
        $response = $client->request('GET', '/api/rapports');

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertArrayHasKey('@context', $data);
        $this->assertArrayHasKey('member', $data);

        $this->assertIsArray($data['member']);

        if (!empty($data['member'])) {
            $this->assertArrayHasKey('reponses', $data['member'][0]);
            $this->assertArrayHasKey('date_rapport', $data['member'][0]);
            $this->assertArrayHasKey('emotionGenerale', $data['member'][0]);
            $this->assertArrayHasKey('utilisateur', $data['member'][0]);
        }
    }
}
