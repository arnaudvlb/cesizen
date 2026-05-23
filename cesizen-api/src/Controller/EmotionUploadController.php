<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class EmotionUploadController extends AbstractController
{
    #[Route('/api/emotions/{id}/upload', name: 'emotion_upload', methods: ['POST'])]
    public function upload(int $id, Request $request): JsonResponse
    {
        $file = $request->files->get('file');

        if (!$file) {
            return new JsonResponse(['error' => 'Aucun fichier fourni'], 400);
        }

        if ($file->getMimeType() !== 'image/png') {
            return new JsonResponse(['error' => 'Seuls les PNG sont autorisés'], 400);
        }

        if ($file->getSize() > 2 * 1024 * 1024) {
            return new JsonResponse(['error' => 'Fichier trop volumineux'], 400);
        }

        $targetDir = $this->getParameter('kernel.project_dir') . '/public/uploads/emotions';

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = $id . '.png';
        $targetPath = $targetDir . '/' . $fileName;

        if (file_exists($targetPath)) {
            unlink($targetPath);
        }

        $file->move($targetDir, $fileName);

        return new JsonResponse([
            'filename' => '/uploads/emotions/' . $fileName
        ]);
    }
}