<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260515161207 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE emotion_generales (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(25) NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE emotions (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(25) NOT NULL, description VARCHAR(255) DEFAULT NULL, emotion_generale_id INT NOT NULL, INDEX IDX_D56FF528424F1C13 (emotion_generale_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE rapports (id INT AUTO_INCREMENT NOT NULL, reponses VARCHAR(50) NOT NULL, commentaire VARCHAR(255) DEFAULT NULL, date_rapport DATETIME NOT NULL, emotion_generale_id INT DEFAULT NULL, utilisateur_id INT DEFAULT NULL, INDEX IDX_E20924C4424F1C13 (emotion_generale_id), INDEX IDX_E20924C4FB88E14F (utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE reinitialisation_mdp (id INT AUTO_INCREMENT NOT NULL, token_reset VARCHAR(255) NOT NULL, date_demande DATETIME NOT NULL, date_expiration DATETIME NOT NULL, date_utilisation DATETIME NOT NULL, utilisateur_id INT NOT NULL, INDEX IDX_D0E4C911FB88E14F (utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE roles_utilisateurs (id_role INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(50) NOT NULL, code VARCHAR(50) NOT NULL, UNIQUE INDEX UNIQ_7B40729177153098 (code), PRIMARY KEY (id_role)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE tokens (id INT AUTO_INCREMENT NOT NULL, token VARCHAR(255) NOT NULL, date_expiration DATETIME NOT NULL, date_creation DATETIME NOT NULL, est_revoque TINYINT NOT NULL, utilisateur_id INT NOT NULL, INDEX IDX_AA5A118EFB88E14F (utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE trackers (id INT AUTO_INCREMENT NOT NULL, date_debut DATETIME NOT NULL, date_fin DATETIME NOT NULL, libelle VARCHAR(50) NOT NULL, description VARCHAR(255) DEFAULT NULL, utilisateur_id INT NOT NULL, INDEX IDX_5DCB1258FB88E14F (utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE utilisateurs (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(50) NOT NULL, prenom VARCHAR(30) NOT NULL, photo_profil VARCHAR(255) DEFAULT NULL, email VARCHAR(180) NOT NULL, mot_de_passe VARCHAR(255) NOT NULL, actif TINYINT NOT NULL, date_creation DATETIME NOT NULL, role_id INT NOT NULL, UNIQUE INDEX UNIQ_497B315EE7927C74 (email), INDEX IDX_497B315ED60322AC (role_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE emotions ADD CONSTRAINT FK_D56FF528424F1C13 FOREIGN KEY (emotion_generale_id) REFERENCES emotion_generales (id)');
        $this->addSql('ALTER TABLE rapports ADD CONSTRAINT FK_E20924C4424F1C13 FOREIGN KEY (emotion_generale_id) REFERENCES emotion_generales (id)');
        $this->addSql('ALTER TABLE rapports ADD CONSTRAINT FK_E20924C4FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id)');
        $this->addSql('ALTER TABLE reinitialisation_mdp ADD CONSTRAINT FK_D0E4C911FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id)');
        $this->addSql('ALTER TABLE tokens ADD CONSTRAINT FK_AA5A118EFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id)');
        $this->addSql('ALTER TABLE trackers ADD CONSTRAINT FK_5DCB1258FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id)');
        $this->addSql('ALTER TABLE utilisateurs ADD CONSTRAINT FK_497B315ED60322AC FOREIGN KEY (role_id) REFERENCES roles_utilisateurs (id_role)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE emotions DROP FOREIGN KEY FK_D56FF528424F1C13');
        $this->addSql('ALTER TABLE rapports DROP FOREIGN KEY FK_E20924C4424F1C13');
        $this->addSql('ALTER TABLE rapports DROP FOREIGN KEY FK_E20924C4FB88E14F');
        $this->addSql('ALTER TABLE reinitialisation_mdp DROP FOREIGN KEY FK_D0E4C911FB88E14F');
        $this->addSql('ALTER TABLE tokens DROP FOREIGN KEY FK_AA5A118EFB88E14F');
        $this->addSql('ALTER TABLE trackers DROP FOREIGN KEY FK_5DCB1258FB88E14F');
        $this->addSql('ALTER TABLE utilisateurs DROP FOREIGN KEY FK_497B315ED60322AC');
        $this->addSql('DROP TABLE emotion_generales');
        $this->addSql('DROP TABLE emotions');
        $this->addSql('DROP TABLE rapports');
        $this->addSql('DROP TABLE reinitialisation_mdp');
        $this->addSql('DROP TABLE roles_utilisateurs');
        $this->addSql('DROP TABLE tokens');
        $this->addSql('DROP TABLE trackers');
        $this->addSql('DROP TABLE utilisateurs');
    }
}
