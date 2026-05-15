<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\RapportsRepository;
use Symfony\Bundle\SecurityBundle\Security;

class RapportsMeProvider implements ProviderInterface
{
    public function __construct(
        private RapportsRepository $repository,
        private Security $security
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $user = $this->security->getUser();

        return $this->repository->findBy(['utilisateur' => $user]);
    }
}
