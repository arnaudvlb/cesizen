<?php

namespace App\DataFixtures;

use App\Entity\Emotions;
use App\Entity\EmotionGenerales;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class EmotionsFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $repo = $manager->getRepository(EmotionGenerales::class);

        $map = [
            'Joie' => ['Bonheur', 'Contentement'],
            'Tristesse' => ['Chagrin', 'Déprime'],
            'Colère' => ['Rage', 'Irritation'],
            'Peur' => ['Anxiété', 'Panique'],
            'Surprise' => ['Étonnement'],
        ];

        foreach ($map as $libelleGenerale => $emotions) {

            $emotionGenerale = $repo->findOneBy(['libelle' => $libelleGenerale]);

            foreach ($emotions as $libelle) {
                $emotion = new Emotions();
                $emotion->setLibelle($libelle);
                $emotion->setDescription(null);

                $emotion->setEmotionGenerale($emotionGenerale);

                $manager->persist($emotion);
            }
        }

        $manager->flush();
    }
}
