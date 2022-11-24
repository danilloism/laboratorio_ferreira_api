export enum Role {
  ADMIN,
  GERENTE,
  COLABORADOR,
  DENTISTA,
  PACIENTE,
  ENTREGADOR,
  FORNECEDOR,
}

export function getRoleIndex(role: Role) {
  return Object.keys(Role).indexOf(role.toString());
}
