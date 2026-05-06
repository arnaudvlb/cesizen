<?php

namespace App\DataFixtures;

use App\Entity\RolesUtilisateurs;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class RolesFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $roles = [
            ['libelle' => 'Utilisateur', 'code' => 'ROLE_USER'],
            ['libelle' => 'Administrateur', 'code' => 'ROLE_ADMIN'],
        ];

        foreach ($roles as $data) {
            $role = new RolesUtilisateurs();
            $role->setLibelle($data['libelle']);
            $role->setCode($data['code']);

            $manager->persist($role);
        }

        $manager->flush();
    }
}