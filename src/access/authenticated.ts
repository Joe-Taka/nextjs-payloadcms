import type { Access, AccessArgs } from 'payload'
import type { User } from '@/payload-types'

//. Gives you both the type safety AND a runtime value to work with
export const RoleObj = {
  Admin: 'admin',
  Editor: 'editor',
  Leitor: 'leitor',
} as const

export type TRole = (typeof RoleObj)[keyof typeof RoleObj]

//. =========

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  console.info('user', user)
  return Boolean(user)
}

// Se o usuário possuir algum valor de privilégio que esteja contido no array de roles, ele terá acesso
export function roleAccess(user: User | null, roles: TRole[]): boolean {
  return roles.some((r) => user && 'privilegio' in user && user.privilegio.includes(r))
}

// Se o usuário possuir algum valor de privilégio que esteja contido no array de roles, ele terá acesso
export const hasRole =
  (...roles: TRole[]): Access<User> =>
  ({ req: { user } }) => {
    console.log('roles', roles);
    return roleAccess(user, roles)
  }
