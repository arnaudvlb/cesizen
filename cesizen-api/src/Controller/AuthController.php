<?php

namespace App\Controller;

use App\Entity\Utilisateurs;
use App\Repository\UtilisateursRepository;
use App\Repository\RolesUtilisateursRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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

        if (!is_array($data)) {
            return $this->json([
                'message' => 'Le corps de la requête est invalide.'
            ], 400);
        }

        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if ($email === '' || $password === '') {
            return $this->json([
                'message' => 'L’adresse e-mail et le mot de passe sont obligatoires.'
            ], 422);
        }

        $user = $repo->findOneBy([
            'email' => $email
        ]);

        if (
            !$user ||
            !$hasher->isPasswordValid($user, $password)
        ) {
            return $this->json([
                'message' => 'Identifiants invalides.'
            ], 401);
        }

        $token = $jwtManager->create($user);

        $response = $this->json([
            'message' => 'Connexion réussie.'
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

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        RolesUtilisateursRepository $roleRepo,
        ValidatorInterface $validator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json([
                'message' => 'Le corps de la requête est invalide.'
            ], 400);
        }

        $user = new Utilisateurs();

        $user->setEmail(trim($data['email'] ?? ''));
        $user->setNom(trim($data['nom'] ?? ''));
        $user->setPrenom(trim($data['prenom'] ?? ''));

        $password = $data['password'] ?? '';

        $user->setPassword($password);

        $role = $roleRepo->findOneBy([
            'code' => 'ROLE_USER'
        ]);

        if (!$role) {
            return $this->json([
                'message' => 'Une erreur interne est survenue.'
            ], 500);
        }

        $user->setRole($role);

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            $violations = [];

            foreach ($errors as $error) {
                $violations[] = [
                    'propertyPath' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }

            return $this->json([
                'message' => 'Les données saisies sont invalides.',
                'violations' => $violations,
            ], 422);
        }

        $user->setPassword(
            $hasher->hashPassword(
                $user,
                $password
            )
        );

        $em->persist($user);
        $em->flush();

        return $this->json([
            'message' => 'Inscription réussie.'
        ], 201);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        $response = new JsonResponse([
            'message' => 'Déconnexion réussie.'
        ]);

        $response->headers->clearCookie(
            'JWT',
            '/'
        );

        return $response;
    }
}
