import {Client, Account, Databases, ID, Query} from 'appwrite'
import { conf } from '../conf/conf';

export class AuthService {
    client = new Client();
    account; 
    database;

    constructor() {
        this.client.setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6665d7140034b1f8d052')
        this.account = new Account(this.client)
        this.database = new Databases(this.client)
    }

    async createPost({prompts, userId}) {
        try {
            return await this.database.createDocument('66685d64001fd5689354', '666fceba0003cf846db5', ID.unique(), {prompts,userId})
        } catch(error) {
            throw error;
        }
    }

    async getPosts(userId) {
        try {
            return await this.database.listDocuments('66685d64001fd5689354', '666fceba0003cf846db5',
            [
              Query.equal('userId', userId) // Order by 'createdAt' in descending order
            ]    
          )
        } catch(error) {
            console.log("Appwrite error : getPosts error :", error)
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            await this.database.deleteDocument('66685d64001fd5689354', '666fceba0003cf846db5', postId)
            return true
        } catch(error) {
            console.log("Appwrite error : deletePost error :", error)
            return false;
        }
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch(error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch(error) {
            console.log("Appwrite error : login : error ", error)
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch(error) {
            console.log("Appwrite error : logout : error ", error) 
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch {
            console.log("Appwrite error : getCurrentUser : error ", error)
        }
    }

}

export const authService = new AuthService()
