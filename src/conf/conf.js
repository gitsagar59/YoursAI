export const conf = {
    
    appwriteAPI: String(import.meta.env.VITE_GEMINI_KEY),
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProject: String(import.meta.env.VITE_APPWRITE_PROJECTID),
    appwriteDatabase: String(import.meta.env.VITE_APPWRITE_DATABASEID),
    appwriteCollection: String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
    appwriteBucket: String(import.meta.env.VITE_APPWRITE_BUCKETID)
}
