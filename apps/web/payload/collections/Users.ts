import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: true,
  fields: [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      unique: true,
    },
    // Email added by default
    // Add more fields as needed
  ],
}
