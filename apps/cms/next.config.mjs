import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: false,
      },
    ]
  },
}

export default withPayload(nextConfig)
