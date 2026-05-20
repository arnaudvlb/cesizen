<?php

namespace App\Entity;

use App\Repository\RapportsRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use App\State\RapportsMeProvider;
use App\State\AuthUserProcessor;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RapportsRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['rapport:read']],
    denormalizationContext: ['groups' => ['rapport:write']],
    security: "is_granted('ROLE_USER')",
    operations: [
        new GetCollection(
            uriTemplate: '/rapports/me',
            provider: RapportsMeProvider::class,
        ),
        new Get(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Post(
            security: "is_granted('IS_AUTHENTICATED_FULLY')",
            processor: AuthUserProcessor::class,
        ),
        new Delete(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Patch(security: "is_granted('IS_AUTHENTICATED_FULLY')",
            processor: AuthUserProcessor::class,)
    ]
)]
class Rapports
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(['rapport:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['rapport:read', 'rapport:write'])]
    private ?string $reponses = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['rapport:read', 'rapport:write'])]
    private ?string $commentaire = null;

    #[ORM\Column(type: "datetime")]
    #[Groups(['rapport:read', 'rapport:write'])]
    private ?\DateTimeInterface $dateRapport = null;

    #[ORM\ManyToOne(inversedBy: 'rapports')]
    #[Groups(['rapport:read', 'rapport:write'])]
    private ?EmotionGenerales $emotionGenerale = null;

    #[ORM\ManyToOne(inversedBy: 'rapports')]
    #[Groups(['rapport:read'])]
    private ?Utilisateurs $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReponses(): ?string
    {
        return $this->reponses;
    }

    public function setReponses(string $reponses): static
    {
        $this->reponses = $reponses;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(?string $commentaire): static
    {
        $this->commentaire = $commentaire;

        return $this;
    }

    public function getDateRapport(): ?\DateTimeInterface
    {
        return $this->dateRapport;
    }

    public function setDateRapport(\DateTimeInterface $dateRapport): static
    {
        $this->dateRapport = $dateRapport;
        return $this;
    }

    public function getEmotionGenerale(): ?EmotionGenerales
    {
        return $this->emotionGenerale;
    }

    public function setEmotionGenerale(?EmotionGenerales $emotionGenerale): static
    {
        $this->emotionGenerale = $emotionGenerale;

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
