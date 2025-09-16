import { Client, Databases, ID, Permission, Role , Query} from 'node-appwrite'

// Appwrite configuration for server-side
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
  .setKey(process.env.APPWRITE_API_KEY || '')

// Initialize services
export const databases = new Databases(client)

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "birthday-invite"
export const GUESTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_GUESTS_COLLECTION_ID || "guests"

// Export ID for creating documents
export { ID,  Permission, Role , Query}

export default client
