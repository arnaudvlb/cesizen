<?php

namespace App\Tests\Api;

use App\Tests\Api\ApiTestCaseBase;

class EmotionsTest extends ApiTestCaseBase
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

    public function testGetEmotionsByEmotionGenerale(): void
    {
        $client = static::createClient();
        $response = $client->request(
            'GET',
            '/api/emotions?emotionGenerale.id=1'
        );

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();

        $this->assertArrayHasKey('member', $data);
        $this->assertIsArray($data['member']);

        if (!empty($data['member'])) {
            foreach ($data['member'] as $emotion) {

                $this->assertArrayHasKey(
                    'emotionGenerale',
                    $emotion
                );

                $this->assertEquals(
                    '/api/emotion_generales/1',
                    $emotion['emotionGenerale']
                );
            }
        }
    }
}
