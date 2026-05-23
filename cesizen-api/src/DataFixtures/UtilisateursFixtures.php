<?php

namespace App\DataFixtures;

use App\Entity\Utilisateurs;
use App\Entity\RolesUtilisateurs;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Faker\Factory;

class UtilisateursFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $hasher
    ) {}

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        $roleRepo = $manager->getRepository(RolesUtilisateurs::class);

        $adminRole = $roleRepo->findOneBy(['code' => 'ROLE_ADMIN']);
        $userRole  = $roleRepo->findOneBy(['code' => 'ROLE_USER']);

        $admin = new Utilisateurs();
        $admin->setNom('Admin');
        $admin->setPrenom('Systeme');
        $admin->setEmail('admin@test.com');
        $admin->setDateCreation(new \DateTime());

        $admin->setPassword(
            $this->hasher->hashPassword($admin, 'mdp')
        );

        $admin->setRole($adminRole);

        $manager->persist($admin);

        for ($i = 0; $i < 10; $i++) {
            $user = new Utilisateurs();

            $user->setNom($faker->lastName());
            $user->setPrenom($faker->firstName());
            $user->setEmail($faker->unique()->safeEmail());
            $user->setDateCreation(new \DateTime());

            $user->setPassword(
                $this->hasher->hashPassword($user, 'mdp')
            );

            $user->setRole($userRole);

            $manager->persist($user);
        }

        $manager->flush();
    }
}