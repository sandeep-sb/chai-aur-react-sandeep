import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call login method to login directly
                return this.login(email, password)
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            const emailSession = await this.account.createEmailSession(email, password);
            return emailSession;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            console.log("hi")
            const currentUser = await this.account.get();
            if(currentUser){
                return currentUser;
            }
            // if user doesn't exist
            return null;
        } catch (error) {
            console.log("Appwrite service :: Current User :: error :: ", error)
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: Logout User :: error :: ", error)
        }
    }
}
const authService = new AuthService();

export default authService;