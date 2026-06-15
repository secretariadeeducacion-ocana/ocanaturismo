import type { CollectionConfig } from 'payload'

export const Usuarios: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre completo',
    },
    {
      name: 'rol',
      type: 'select',
      label: 'Rol',
      defaultValue: 'editor',
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
