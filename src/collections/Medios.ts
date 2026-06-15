import type { CollectionConfig } from 'payload'

export const Medios: CollectionConfig = {
  slug: 'media',
  upload: true,
  admin: {
    useAsTitle: 'filename',
    description: 'Imágenes y archivos multimedia del sitio',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
    },
    {
      name: 'credito',
      type: 'text',
      label: 'Crédito fotográfico',
    },
  ],
}
