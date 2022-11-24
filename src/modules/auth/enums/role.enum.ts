export enum Role {
  ADMIN       = 'ADMIN',
  GERENTE     = 'GERENTE',
  COLABORADOR = 'COLABORADOR',
  DENTISTA    = 'DENTISTA',
  PACIENTE    = 'PACIENTE',
  ENTREGADOR  = 'ENTREGADOR',
  FORNECEDOR  = 'FORNECEDOR',
}

export function getRoleIndex(role: Role) {
  return Object.keys(Role).indexOf(role.toString());
}
