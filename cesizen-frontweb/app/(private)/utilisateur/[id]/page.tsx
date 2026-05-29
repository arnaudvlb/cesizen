"use client";

import RolesSelect from "@/components/RolesSelect/RolesSelect";
import AccessDenied from "@/components/ui/AccessDenied/AccessDenied";
import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useRoles } from "@/hooks/roles/useRoles";
import { useAuth } from "@/hooks/useAuth";
import { usePatchUtilisateur } from "@/hooks/utilisateurs/usePatchUtilisateur";
import { useUtilisateur } from "@/hooks/utilisateurs/useUtilisateur";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function alterUtilisateur() {
  const [message, setMessage] = useState("");
  const params = useParams();
  const id = params.id as string;
  const { utilisateur } = useUtilisateur(id);
  const { patchUtilisateur, loading, error } = usePatchUtilisateur(id);
  const { roles } = useRoles();
  const [selectedRole, setSelectedRole] = useState(Number);
  const router = useRouter();
  const { isAdmin, isAuth, userId } = useAuth();

  useEffect(() => {
    if (utilisateur?.role?.id_role) {
      setSelectedRole(utilisateur.role.id_role);
    }
  }, [utilisateur]);

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await patchUtilisateur({
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      role: selectedRole
        ? `/api/roles_utilisateurs/${selectedRole}`
        : formData.role,
      password: formData.password == "" ? null : formData.password,
    });

    if (res) {
      setTimeout(() => {
        setMessage("Modification réussie !");
        router.push("/");
      }, 1500);
    }
  };

  if (!isAuth && id != String(userId) && !isAdmin) return <AccessDenied />;

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      {(message || error) && (
        <FormMessage message={message || error || ""} error={!!error} />
      )}
      {isAdmin && (
        <RolesSelect
          roles={roles}
          value={selectedRole}
          onChange={setSelectedRole}
        />
      )}
      <div className="page">
        <Form
          titreForm="Données utilisateur"
          champs={["Nom", "Prénom", "Adresse Email", "Nouveau mot de passe"]}
          names={["nom", "prenom", "email", "password"]}
          buttonText={loading ? "Mise à jour..." : "Mettre à jour les données"}
          placeHolders={["Nom", "Prénom", "nom.prenom@xyz.com", "••••••••"]}
          onSubmit={handleSubmit}
          defaultValues={{
            nom: utilisateur?.nom ?? "",
            prenom: utilisateur?.prenom ?? "",
            email: utilisateur?.email ?? "",
            password: "",
          }}
        />
      </div>
    </>
  );
}
