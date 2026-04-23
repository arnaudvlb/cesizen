<?php

namespace App\Entity;

use App\Repository\ReinitialisationMdpRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReinitialisationMdpRepository::class)]
class ReinitialisationMdp
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $tokenReset = null;

    #[ORM\Column]
    private ?\DateTime $dateDemande = null;

    #[ORM\Column]
    private ?\DateTime $dateExpiration = null;

    #[ORM\Column]
    private ?\DateTime $dateUtilisation = null;

    #[ORM\ManyToOne(inversedBy: 'reinitialisationMdps')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateurs $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTokenReset(): ?string
    {
        return $this->tokenReset;
    }

    public function setTokenReset(string $tokenReset): static
    {
        $this->tokenReset = $tokenReset;

        return $this;
    }

    public function getDateDemande(): ?\DateTime
    {
        return $this->dateDemande;
    }

    public function setDateDemande(\DateTime $dateDemande): static
    {
        $this->dateDemande = $dateDemande;

        return $this;
    }

    public function getDateExpiration(): ?\DateTime
    {
        return $this->dateExpiration;
    }

    public function setDateExpiration(\DateTime $dateExpiration): static
    {
        $this->dateExpiration = $dateExpiration;

        return $this;
    }

    public function getDateUtilisation(): ?\DateTime
    {
        return $this->dateUtilisation;
    }

    public function setDateUtilisation(\DateTime $dateUtilisation): static
    {
        $this->dateUtilisation = $dateUtilisation;

        return $this;
    }

    public function getUtilisateur(): ?Utilisateurs
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateurs $utilisateur): static
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }
}
