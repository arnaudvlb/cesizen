<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;

class EmotionGeneralesTest extends ApiTestCaseBase
{
    public function testGetEmotionGenerales(): void
    {
        $client = static::createClient();
        $response = $client->request('GET', '/api/emotion_generales');

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertArrayHasKey('@context', $data);
        $this->assertArrayHasKey('member', $data);

        $this->assertIsArray($data['member']);

        if (!empty($data['member'])) {
            $this->assertArrayHasKey('libelle', $data['member'][0]);
            $this->assertArrayHasKey('description', $data['member'][0]);
        }
    }
}
