<?php

namespace App\Entity;

use App\Repository\EmotionsRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: EmotionsRepository::class)]
#[ApiResource]
class Emotions
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 25)]
    private ?string $libelle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'emotions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?EmotionGenerales $emotionGenerale = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getEmotionGenerale(): ?EmotionGenerales
    {
        return $this->emotionGenerale;
    }

    public function setEmotionGenerale(?EmotionGenerales $emotionGenerale): static
    {
        $this->emotionGenerale = $emotionGenerale;

        return $this;
    }
}
