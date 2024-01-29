import React, {useEffect, useState} from "react";
import {Container, PostForm} from "../components"
import service from "../appwrite/configuration";
import { useParams, useNavigate } from "react-router-dom";

function EditPost () {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((document) => {
                if(document){
                    setPost(document)
                }
            })
        }
        else{
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;