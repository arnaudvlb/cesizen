<?php

namespace App\Entity;

use App\Repository\EmotionsRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EmotionsRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['emotion:read']],
    operations: [
        new GetCollection(),
        new Get(),
        new Post(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ]
)]
#[ApiFilter(SearchFilter::class, properties: [
    'emotionGenerale.id' => 'exact'
])]
class Emotions
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['emotion:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 25)]
    #[Groups(['emotion:read'])]
    #[Assert\NotBlank(
        message: 'Le libellé est obligatoire.'
    )]
    private ?string $libelle = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['emotion:read'])]
    #[Assert\Length(
        max: 255,
        maxMessage: 'La description ne peut pas dépasser {{ limit }} caractères.'
    )]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'emotions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['emotion:read'])]
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
