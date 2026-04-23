<?php

namespace App\Entity;

use App\Repository\UtilisateursRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UtilisateursRepository::class)]
class Utilisateurs
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private string $nom;

    #[ORM\Column(length: 30)]
    private string $prenom;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $photoProfil = null;

    #[ORM\Column(length: 180, unique: true)]
    private string $email;

    #[ORM\Column(length: 255)]
    private string $motDePasse;

    #[ORM\Column]
    private bool $actif;

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $dateCreation;

    #[ORM\ManyToOne(targetEntity: RolesUtilisateurs::class)]
    #[ORM\JoinColumn(name: "role_id", referencedColumnName: "id_role", nullable: false)]
    private RolesUtilisateurs $role;

    /**
     * @var Collection<int, Tokens>
     */
    #[ORM\OneToMany(mappedBy: 'utilisateur', targetEntity: Tokens::class)]
    private Collection $tokens;

    /**
     * @var Collection<int, ReinitialisationMdp>
     */
    #[ORM\OneToMany(mappedBy: 'utilisateur', targetEntity: ReinitialisationMdp::class)]
    private Collection $reinitialisationMdps;

    /**
     * @var Collection<int, Trackers>
     */
    #[ORM\OneToMany(mappedBy: 'utilisateur', targetEntity: Trackers::class)]
    private Collection $trackers;

    /**
     * @var Collection<int, Rapports>
     */
    #[ORM\OneToMany(mappedBy: 'utilisateur', targetEntity: Rapports::class)]
    private Collection $rapports;

    public function __construct()
    {
        $this->dateCreation = new \DateTime();
        $this->actif = true;

        $this->tokens = new ArrayCollection();
        $this->reinitialisationMdps = new ArrayCollection();
        $this->trackers = new ArrayCollection();
        $this->rapports = new ArrayCollection();
    }

    // ======================
    // GETTERS
    // ======================

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): string
    {
        return $this->nom;
    }

    public function getPrenom(): string
    {
        return $this->prenom;
    }

    public function getPhotoProfil(): ?string
    {
        return $this->photoProfil;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getMotDePasse(): string
    {
        return $this->motDePasse;
    }

    public function isActif(): bool
    {
        return $this->actif;
    }

    public function getDateCreation(): \DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function getRole(): RolesUtilisateurs
    {
        return $this->role;
    }

    // ======================
    // SETTERS
    // ======================

    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;
        return $this;
    }

    public function setPhotoProfil(?string $photoProfil): self
    {
        $this->photoProfil = $photoProfil;
        return $this;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function setMotDePasse(string $motDePasse): self
    {
        $this->motDePasse = $motDePasse;
        return $this;
    }

    public function setActif(bool $actif): self
    {
        $this->actif = $actif;
        return $this;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;
        return $this;
    }

    public function setRole(RolesUtilisateurs $role): self
    {
        $this->role = $role;
        return $this;
    }

    // ======================
    // COLLECTIONS (READ ONLY)
    // ======================

    public function getTokens(): Collection
    {
        return $this->tokens;
    }

    public function getReinitialisationMdps(): Collection
    {
        return $this->reinitialisationMdps;
    }

    public function getTrackers(): Collection
    {
        return $this->trackers;
    }

    public function getRapports(): Collection
    {
        return $this->rapports;
    }
}