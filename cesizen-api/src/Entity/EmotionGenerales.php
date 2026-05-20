<?php

namespace App\Entity;

use App\Repository\EmotionGeneralesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: EmotionGeneralesRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['rapport:read']]
)]
class EmotionGenerales
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['rapport:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 25)]
    #[Groups(['rapport:read'])]
    private ?string $libelle = null;

    #[ORM\Column(length: 255)]
    #[Groups(['rapport:read'])]
    private ?string $description = null;

    #[ORM\Column(length: 7)]
    #[Groups(['rapport:read'])]
    private ?string $couleur = null;

    /**
     * @var Collection<int, Emotions>
     */
    #[ORM\OneToMany(targetEntity: Emotions::class, mappedBy: 'emotionGenerale')]
    private Collection $emotions;

    /**
     * @var Collection<int, Rapports>
     */
    #[ORM\OneToMany(targetEntity: Rapports::class, mappedBy: 'emotionGenerale')]
    private Collection $rapports;

    public function __construct()
    {
        $this->emotions = new ArrayCollection();
        $this->rapports = new ArrayCollection();
    }

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

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(string $couleur): static
    {
        $this->couleur = $couleur;

        return $this;
    }

    #[Groups(['rapport:read'])]
    public function getImageUrl(): string
    {
        $path = '/uploads/emotions/' . $this->id . '.png';

        $fullPath = __DIR__ . '/../../public' . $path;

        return file_exists($fullPath)
            ? $path
            : '/uploads/emotions/0.png';
    }

    /**
     * @return Collection<int, Emotions>
     */
    public function getEmotions(): Collection
    {
        return $this->emotions;
    }

    public function addEmotion(Emotions $emotion): static
    {
        if (!$this->emotions->contains($emotion)) {
            $this->emotions->add($emotion);
            $emotion->setEmotionGenerale($this);
        }

        return $this;
    }

    public function removeEmotion(Emotions $emotion): static
    {
        if ($this->emotions->removeElement($emotion)) {
            // set the owning side to null (unless already changed)
            if ($emotion->getEmotionGenerale() === $this) {
                $emotion->setEmotionGenerale(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Rapports>
     */
    public function getRapports(): Collection
    {
        return $this->rapports;
    }

    public function addRapport(Rapports $rapport): static
    {
        if (!$this->rapports->contains($rapport)) {
            $this->rapports->add($rapport);
            $rapport->setEmotionGenerale($this);
        }

        return $this;
    }

    public function removeRapport(Rapports $rapport): static
    {
        if ($this->rapports->removeElement($rapport)) {
            // set the owning side to null (unless already changed)
            if ($rapport->getEmotionGenerale() === $this) {
                $rapport->setEmotionGenerale(null);
            }
        }

        return $this;
    }
}
