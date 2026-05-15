<?php

namespace App\Entity;

use App\Repository\RapportsRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;

#[ORM\Entity(repositoryClass: RapportsRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Get(security: "is_granted('IS_AUTHENTICATED_FULLY')"),
        new Post(security: "is_granted('IS_AUTHENTICATED_FULLY')")
    ])]
class Rapports
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $reponses = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $commentaire = null;

    #[ORM\Column]
    private ?\DateTime $date_rapport = null;

    #[ORM\ManyToOne(inversedBy: 'rapports')]
    #[ORM\JoinColumn(nullable: false)]
    private ?EmotionGenerales $emotionGenerale = null;

    #[ORM\ManyToOne(inversedBy: 'rapports')]
    #[ORM\JoinColumn(nullable: false)]
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

    public function getDateRapport(): ?\DateTime
    {
        return $this->date_rapport;
    }

    public function setDateRapport(\DateTime $date_rapport): static
    {
        $this->date_rapport = $date_rapport;

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
