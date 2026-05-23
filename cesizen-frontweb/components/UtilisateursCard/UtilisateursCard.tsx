"use client";

import styles from "@/components/UtilisateursCard/UtilisateursCard.module.css";
import EditButton from "../ui/EditButton/EditButton";
import DeleteButton from "../ui/DeleteButton/DeleteButton";
import { useDeleteUtilisateur } from "@/hooks/utilisateurs/useDeleteUtilisateur";
import { UtilisateursCardProps } from "@/types/components/UtilisateursCardProps";

export default function UtilisateursCard({ users }: UtilisateursCardProps) {
  const { deleteUtilisateur } = useDeleteUtilisateur(0);

  return (
    <div className={styles.userGrid}>
      {users.map((user) => (
        <article key={user.id} className={styles.userCard}>
          <div className={styles.userLink}>
            <div className={styles.avatar}>
              {user.prenom?.[0]}
              {user.nom?.[0]}
            </div>

            <div className={styles.userInfo}>
              <span className={styles.fullname}>
                {user.prenom} {user.nom}
              </span>

              <span className={styles.role}>{user.role.libelle}</span>

              <span className={styles.email}>{user.email}</span>
            </div>
          </div>
          <div className={styles.userActions}>
            <EditButton url={`/utilisateur/${user.id}`} />
            <DeleteButton
              onConfirm={async () => {
                await deleteUtilisateur(user.id);
              }}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
