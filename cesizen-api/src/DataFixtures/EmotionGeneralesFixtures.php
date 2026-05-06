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
            ['Joie', 'Émotions positives'],
            ['Tristesse', 'Émotions liées à une perte'],
            ['Colère', 'Émotions liées à la frustration'],
            ['Peur', 'Émotions liées au danger'],
            ['Surprise', 'Réaction à l’inattendu'],
        ];

        foreach ($data as [$libelle, $description]) {
            $emotion = new EmotionGenerales();
            $emotion->setLibelle($libelle);
            $emotion->setDescription($description);

            $manager->persist($emotion);
        }

        $manager->flush();
    }
}
