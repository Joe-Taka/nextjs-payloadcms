import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'eventos',
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'descricao',
      type: 'text',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Preview image',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'inicio',
      label: 'Início do evento',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'termino',
      label: 'Término do evento',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        condition: (data, siblingData) => {
          return !siblingData.aberto
        },
      },
    },
    {
      name: 'aberto',
      label: 'Deixar em aberto',
      type: 'checkbox',
      required: false,
    },
    {
      name: 'local',
      label: 'Local do evento',
      type: 'text',
      required: false,
    },
    {
      name: 'url',
      label: 'URL do evento',
      type: 'text',
      required: false,
    },
  ],
}
