import { createClient } from 'next-sanity'

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID

if (!projectId) {
  throw new Error(
    'Missing Sanity project ID. Set NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID.'
  )
}

export const sanityClient = createClient({
  projectId,
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    process.env.SANITY_DATASET ??
    'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
