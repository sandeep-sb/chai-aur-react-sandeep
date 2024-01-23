import conf from "../conf/conf";
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  /* here slug is taken as document ID */
                {
                    title, content, featuredImage, status, userId
                }
            )
        } catch (error) {
            console.log("Appwrite :: error :: Create Post :: ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status
                }
            );
        } catch (error) {
            console.log("Appwrite :: error :: Update Post :: ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite :: error :: Delete Post :: ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite :: error :: Get Post :: ", error);
        }
    }

    async getAllPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status', ['active'])
                ]
            );
        } catch (error) {
            console.log("Appwrite :: error :: Get All Posts :: ", error);
            return false;
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite :: error :: Upload file :: ", error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileID
            );
            return true;
        } catch (error) {
            console.log("Appwrite :: error :: Upload file :: ", error);
            return false;
        }
    }

    filePreview(fileID){
        
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileID,
        );

    }

}

const service = new Service();

export default service