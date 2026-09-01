<?php

namespace App\Controller;

use App\Entity\Utilisateurs;
use App\Repository\UtilisateursRepository;
use App\Repository\RolesUtilisateursRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Cookie;

class AuthController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        UtilisateursRepository $repo,
        UserPasswordHasherInterface $hasher,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {

        $data = json_decode($request->getContent(), true);

        $user = $repo->findOneBy([
            'email' => $data['email'] ?? ''
        ]);

        if (!$user) {
            return $this->json([
                'error' => 'Utilisateur introuvable'
            ], 401);
        }

        if (!$hasher->isPasswordValid($user, $data['password'] ?? '')) {
            return $this->json([
                'error' => 'Mot de passe incorrect'
            ], 401);
        }

        $token = $jwtManager->create($user);

        $response = $this->json([
            'message' => 'Connexion réussie'
        ]);

        $response->headers->setCookie(
            Cookie::create(
                'JWT',
                $token,
                time() + 6000,
                '/',
                null,
                $request->isSecure(), 
                true,  
                false,
                'strict'
            )
        );

        return $response;
    }

    #[Route('/api/register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        UtilisateursRepository $repo,
        RolesUtilisateursRepository $roleRepo
    ): JsonResponse {

        $data = json_decode($request->getContent(), true);

        $user = new Utilisateurs();

        $emailExisting = $repo->findOneBy(['email' => $data['email']]);

        if ($emailExisting) {
            return $this->json([
                'error' => 'Email déjà utilisé'
            ], 400);
        }

        $user->setEmail($data['email']);
        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);

        $user->setPassword(
            $hasher->hashPassword($user, $data['password'])
        );

        $role = $roleRepo->findOneBy(['code' => 'ROLE_USER']);
        $user->setRole($role);

        $em->persist($user);
        $em->flush();

        return $this->json([
            'message' => 'Inscription réussie'
        ]);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        $response = new JsonResponse([
            'message' => 'Déconnexion réussie',
        ]);

        $response->headers->clearCookie(
            'JWT',
            '/',
        );

        return $response;
    }
}
