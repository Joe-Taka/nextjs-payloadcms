import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { RoleObj } from '../../access/authenticated'
import { roleAccess, hasRole } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Restinge o acesso ao Admin Panel apenas para 'admin'
    /* admin: ({ req: { user } }) => {
      return roleAccess(user, ['admin'])
    }, */
    create: hasRole('admin'),
    delete: hasRole('admin'),
    read: hasRole('admin'),
    update: hasRole('admin'),
  },
  admin: {
    defaultColumns: ['id', 'name', 'email', 'privilegio', 'updatedAt', 'createdAt'],
  },
  auth: true,
  fields: [
    // insert the default name field
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'privilegio',
      label: 'Privilégio',
      type: 'select',
      required: true,
      admin: {
        isSortable: true,
        // Conditionally show the 'privilegio' field only if the current logged user has admin status
        /* condition: (data, siblingData, { user }) => {
          console.log('user', user)
          const hasAdminRole = roleAccess(user, [RoleObj.Admin])
          console.log('hasAdminRole', hasAdminRole)
          return hasAdminRole
        }, */
      },
      hasMany: true,
      options: [
        { label: 'Admin', value: RoleObj.Admin },
        { label: 'Editor', value: RoleObj.Editor },
        { label: 'Usuário', value: RoleObj.User },
      ],
      //defaultValue: RoleObj.User, // Tirando porque é bugado
    },
  ],
  timestamps: true,
}
