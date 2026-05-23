<?php

namespace App\Entity;

use App\Repository\RolesUtilisateursRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RolesUtilisateursRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['utilisateur:read', 'role:read']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
    ]
)]
class RolesUtilisateurs
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "id_role", type: "integer")]
    #[Groups(['utilisateur:read', 'role:read'])]
    private ?int $id_role = null;

    #[ORM\Column(length: 50)]
    #[Groups(['utilisateur:read', 'role:read'])]
    private ?string $libelle = null;

    #[ORM\Column(length: 50, unique: true)]
    private string $code;

    public function getIdRole(): ?int
    {
        return $this->id_role;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): static
    {
        $this->libelle = $libelle;
        return $this;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;
        return $this;
    }
}
