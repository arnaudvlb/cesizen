<?php

namespace App\DataFixtures;

use App\Entity\EmotionGenerales;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class EmotionGeneralesFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $data = [
            ['Joie', 'Émotions positives', '#FFD93D'],
            ['Tristesse', 'Émotions liées à une perte', '#4D96FF'],
            ['Colère', 'Émotions liées à la frustration', '#FF4D4D'],
            ['Peur', 'Émotions liées au danger', '#6C5CE7'],
            ['Surprise', 'Réaction à l’inattendu', '#00C2A8'],
        ];

        foreach ($data as [$libelle, $description, $couleur]) {
            $emotion = new EmotionGenerales();
            $emotion->setLibelle($libelle);
            $emotion->setDescription($description);
            $emotion->setCouleur($couleur);

            $manager->persist($emotion);
        }

        $manager->flush();
    }
}
