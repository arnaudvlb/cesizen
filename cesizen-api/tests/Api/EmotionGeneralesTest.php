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

    public function testAlterEmotionGenerale(): void
    {
        $client = static::createClient();
        $container = static::getContainer();

        $userRepository = $container->get(\App\Repository\UtilisateursRepository::class);
        $jwtManager = $container->get(\Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface::class);

        $admin = $userRepository->findOneBy([
            'email' => 'admin@test.com'
        ]);

        $this->assertNotNull(
            $admin,
            'TEST INIT ECHOUE: l\'admin admin@test.com n\'a pas été trouvé en base'
        );

        $this->assertContains(
            'ROLE_ADMIN',
            $admin->getRoles(),
            'TEST INIT ECHOUE: l\'utilisateur récupéré n\'est pas admin'
        );

        $token = $jwtManager->create($admin);

        $response = $client->request('POST', '/api/emotion_generales', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/ld+json',
                'Content-Type' => 'application/ld+json',
            ],
            'json' => [
                'libelle' => 'Test Emotion',
                'description' => 'Description test',
                'couleur' => '#FFFFFF',
            ],
        ]);

        $this->assertResponseIsSuccessful(
            'CREATE ECHOUE: impossible de créer une emotion générale'
        );

        $data = $response->toArray();

        $iri = $data['@id'] ?? null;

        $this->assertNotNull(
            $iri,
            'CREATE ECHOUE: @id absent dans la réponse'
        );

        $id = (int) basename($iri);

        $this->assertGreaterThan(
            0,
            $id,
            'CREATE ECHOUE: ID invalide'
        );

        $client->request('PATCH', '/api/emotion_generales/' . $id, [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/ld+json',
                'Content-Type' => 'application/merge-patch+json',
            ],
            'json' => [
                'libelle' => 'Emotion Modifiée',
                'description' => 'Description modifiée',
                'couleur' => '#000000',
            ],
        ]);

        $this->assertResponseIsSuccessful();

        $client->request('DELETE', '/api/emotion_generales/' . $id, [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/ld+json',
            ],
        ]);

        $this->assertResponseIsSuccessful();


        $em = $container->get('doctrine')->getManager();

        $deletedEmotion = $em
            ->getRepository(\App\Entity\EmotionGenerales::class)
            ->find($id);

        $this->assertNull(
            $deletedEmotion,
            'DELETE ECHOUE: l\'emotion générale existe encore en base'
        );
    }
}
