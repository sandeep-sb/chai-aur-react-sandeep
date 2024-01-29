import React, {useEffect, useCallback} from "react";
import {useForm} from "react-hook-form";
import {Button, Input, Select, RTE} from "../index";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux"; 
import service from "../../appwrite/configuration";

function Postform({post}){
    console.log("postform");
    /**
     * watch -  watches a field continuously
     * setValue - sets the value of a field
     * control - gives control of the form
     * getValues - gets all the values of the field
     */
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);

    const submit = async(data) => {
        console.log(data);
        // edit and update post
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            
            // delete previous file/image
            if(file){
                await service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                 featuredImage: file ? file.$id : undefined
            });

            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }
        // new content for post
        else{
            const file = await service.uploadFile(data.image[0]);

            if(file){
                const fileID = file.$id;
                data.featuredImage = fileID;
                
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                });
                
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string"){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(()=>{
        console.log("PostForm useEffect");
        const subscription = watch((value, {name, type})=>{
            console.log("titlevalue: " + getValues('title'));
            if(name === "title"){
                setValue("slug", slugTransform(value.title), {shouldValidate: true});
            }
        });

        return () => subscription.unsubscribe();

    }, [watch, slugTransform, setValue]);

    return(
            <form className="flex" onSubmit={handleSubmit(submit)}>
                <div className="w-2/3 px-2">
                    <Input
                        label="Title: "
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", {required: true})}
                    />
                    <Input
                        label="Slug: "
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", {required: true})}
                        // onInput={(e) => {
                        //     setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        // }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image: "
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", {required: !post})}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={service.filePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
    );
}

export default Postform;