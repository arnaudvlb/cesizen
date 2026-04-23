<?php

namespace App\Entity;

use App\Repository\RolesUtilisateursRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RolesUtilisateursRepository::class)]
class RolesUtilisateurs
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "id_role", type: "integer")]
    private ?int $id_role = null;

    #[ORM\Column(length: 50)]
    private ?string $libelle = null;

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
}
