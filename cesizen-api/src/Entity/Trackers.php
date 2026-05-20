<?php

namespace App\Entity;

use App\Repository\TrackersRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use App\State\TrackersMeProvider;
use App\State\AuthUserProcessor;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TrackersRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['tracker:read']],
    denormalizationContext: ['groups' => ['tracker:write']],
    security: "is_granted('ROLE_USER')",
    operations: [
        new GetCollection(
            uriTemplate: '/trackers/me',
            provider: TrackersMeProvider::class,
        ),
        new Get(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Post(
            security: "is_granted('IS_AUTHENTICATED_FULLY')",
            processor: AuthUserProcessor::class,
        ),
        new Delete(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Patch(security: "is_granted('IS_AUTHENTICATED_FULLY')",
            processor: AuthUserProcessor::class,)
    ])]
class Trackers
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['tracker:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['tracker:read', 'tracker:write'])]
    private ?\DateTime $dateDebut = null;

    #[ORM\Column]
    #[Groups(['tracker:read', 'tracker:write'])]
    private ?\DateTime $dateFin = null;

    #[ORM\Column(length: 50)]
    #[Groups(['tracker:read', 'tracker:write'])]
    private ?string $libelle = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['tracker:read', 'tracker:write'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'trackers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['tracker:read'])]
    private ?Utilisateurs $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDebut(): ?\DateTime
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTime $dateDebut): static
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTime
    {
        return $this->dateFin;
    }

    public function setDateFin(\DateTime $dateFin): static
    {
        $this->dateFin = $dateFin;

        return $this;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

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
