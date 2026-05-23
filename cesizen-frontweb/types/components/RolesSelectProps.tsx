import { Role } from "../database/roles";

export type RolesSelectProps = {
  roles: Role[];
  value: number;
  onChange: (value: number) => void;
};