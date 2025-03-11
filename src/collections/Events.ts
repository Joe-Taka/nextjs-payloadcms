import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

//. JOE: Coleção 'Events' criada por mim
export const Events: CollectionConfig = {
  slug: 'eventos',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'descricao',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Preview image',
      required: false,
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
          //console.log('data', data)
          //console.log('siblingData', siblingData)
          return !data.aberto
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
      name: 'campus',
      label: 'Campus',
      type: 'relationship',
      relationTo: 'subcategories',
      admin: {
        position: 'sidebar',
        description:
          'Selecione o campus na qual o evento está associado. Se não for atrelado a nenhum campus, deixe sem preencher',
      },
      filterOptions: () => {
        return {
          'relatedCategory.title': {
            equals: 'Campus',
          },
        }
      },
    },
    {
      name: 'modalidade',
      label: 'Modalidade do evento',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Online',
          value: 'online',
        },
        {
          label: 'Presencial',
          value: 'presencial',
        },
        {
          label: 'Híbrido',
          value: 'hibrido',
        },
      ],
    },
    {
      name: 'local',
      label: 'Local do evento',
      type: 'text',
      required: true,
      admin: {
        condition: (data, siblingData) => {
          return data.modalidade === 'presencial' || data.modalidade === 'hibrido'
        },
        description: 'Informe o local (ex: sala, bloco) onde o evento será realizado',
      },
    },
    {
      name: 'url',
      label: 'URL da transmissão',
      type: 'text',
      required: true,
      admin: {
        condition: (data, siblingData) => {
          return data.modalidade === 'online' || data.modalidade === 'hibrido'
        },
      },
    },
  ],
}
