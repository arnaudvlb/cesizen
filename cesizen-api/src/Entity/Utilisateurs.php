<?php

namespace App\Entity;

use App\Repository\UtilisateursRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use App\State\UserPasswordProcessor;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UtilisateursRepository::class)]
#[UniqueEntity(
    fields: ['email'],
    message: 'Cette adresse e-mail est déjà utilisée.'
)]
#[ApiResource(
    normalizationContext: ['groups' => ['utilisateur:read', 'rapport:read']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "object == user or is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
        new Patch(
            security: "object == user or is_granted('ROLE_ADMIN')",
            processor: UserPasswordProcessor::class
        )
    ]
)]
class Utilisateurs implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(['rapport:read', 'utilisateur:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['utilisateur:read'])]    
    #[Assert\NotBlank(message: 'Le nom est obligatoire.')]
    #[Assert\Length(
        max: 50,
        maxMessage: 'Le nom ne peut pas dépasser {{ limit }} caractères.'
    )]
    private string $nom;

    #[ORM\Column(length: 30)]
    #[Groups(['utilisateur:read'])]
    #[Assert\NotBlank(message: 'Le prénom est obligatoire.')]
    #[Assert\Length(
        max: 30,
        maxMessage: 'Le prénom ne peut pas dépasser {{ limit }} caractères.'
    )]
    private string $prenom;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['rapport:read', 'utilisateur:read'])]
    #[Assert\NotBlank(message: 'L’adresse e-mail est obligatoire.')]
    #[Assert\Email(message: 'L’adresse e-mail n’est pas valide.')]
    #[Assert\Length(
        max: 180,
        maxMessage: 'L’adresse e-mail ne peut pas dépasser {{ limit }} caractères.'
    )]
    private string $email;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(
        message: 'Le mot de passe est obligatoire.',
        groups: ['Default']
    )]
    #[Assert\Length(
        min: 8,
        max: 255,
        minMessage: 'Le mot de passe doit contenir au moins {{ limit }} caractères.',
        maxMessage: 'Le mot de passe ne peut pas dépasser {{ limit }} caractères.'
    )]
    #[Assert\Regex(
        pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/',
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        groups: ['Default']
    )]
    private string $motDePasse;

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $dateCreation;

    #[ORM\ManyToOne(targetEntity: RolesUtilisateurs::class)]
    #[ORM\JoinColumn(name: "role_id", referencedColumnName: "id_role", nullable: false)]
    #[Groups(['utilisateur:read'])]
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
     * @var Collection<int, Rapports>
     */
    #[ORM\OneToMany(mappedBy: 'utilisateur', targetEntity: Rapports::class)]
    private Collection $rapports;

    /**
     * @var Collection<int, Trackers>
     */
    #[ORM\OneToMany(mappedBy: 'utilisateur', targetEntity: Trackers::class)]
    private Collection $trackers;



    public function __construct()
    {
        $this->dateCreation = new \DateTime();

        $this->tokens = new ArrayCollection();
        $this->reinitialisationMdps = new ArrayCollection();
        $this->rapports = new ArrayCollection();
        $this->trackers = new ArrayCollection();
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

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->motDePasse;
    }

    public function getDateCreation(): \DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function getRole(): RolesUtilisateurs
    {
        return $this->role;
    }

    public function getRoles(): array
    {
        return [$this->role->getCode()];
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function eraseCredentials(): void {}

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

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function setPassword(string $motDePasse): self
    {
        $this->motDePasse = $motDePasse;
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

    public function getRapports(): Collection
    {
        return $this->rapports;
    }

    public function getTrackers(): Collection
    {
        return $this->trackers;
    }
}
