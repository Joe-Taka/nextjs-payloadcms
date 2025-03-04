import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { RoleObj } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      admin: {
        description: 'Nome para o usuário a ser criado',
      },
    },
    {
      name: 'privilegio',
      label: 'Privilégio',
      type: 'select',
      admin: {
        isClearable: true,
        isSortable: true,
      },
      hasMany: true,
      options: [
        { label: 'Admin', value: RoleObj.Admin },
        { label: 'Editor', value: RoleObj.Editor },
        { label: 'Usuário', value: RoleObj.User },
      ],
      required: true,
      defaultValue: RoleObj.User,
    },
  ],
  timestamps: true,
}
