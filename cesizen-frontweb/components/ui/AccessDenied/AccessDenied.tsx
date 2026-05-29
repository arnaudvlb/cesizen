import styles from "@/components/ui/AccessDenied/AccessDenied.module.css";

export default function AccessDenied() {
  return (
    <div className={styles.accessDenied}>
      <h1 className={styles.accessDeniedTitle}>Accès refusé</h1>
      <p className={styles.accessDeniedText}>
        Vous ne disposez pas des autorisations nécessaires pour accéder à cette
        page.
      </p>
    </div>
  );
}
