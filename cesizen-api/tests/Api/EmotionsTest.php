<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class EmotionsTest extends ApiTestCase
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
}
