<?php

namespace App\Controller;

use App\Repository\UtilisateursRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

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

        // Vérifie mot de passe
        if (!$hasher->isPasswordValid($user, $data['password'] ?? '')) {
            return $this->json([
                'error' => 'Mot de passe incorrect'
            ], 401);
        }

        $token = $jwtManager->create($user);

        return $this->json([
            'token' => $token,
            'user' => [
                'id' => $user->getId(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }
}