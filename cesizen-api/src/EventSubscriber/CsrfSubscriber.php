<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class CsrfSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly CsrfTokenManagerInterface $csrfTokenManager,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return;
        }

        $request = $event->getRequest();

        if (!str_starts_with($request->getPathInfo(), '/api/')) {
            return;
        }

        if ($request->isMethodSafe()) {
            return;
        }

        $token = $request->headers->get('csrf-token');

        if (!$token) {
            $event->setResponse(new JsonResponse([
                'message' => 'Token CSRF manquant',
            ], 403));

            return;
        }

        $csrfToken = new CsrfToken('submit', $token);

        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            $event->setResponse(new JsonResponse([
                'message' => 'Token CSRF invalide',
            ], 403));
        }
    }
}
