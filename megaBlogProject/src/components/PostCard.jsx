import React from "react";
import service from "../appwrite/configuration";
import {Link} from "react-router-dom";

const PostCard = ({$id, title, featuredImage}) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full rounded-xl p-4 bg-gray-100">
                <div className="w-full justify-center mb-4">
                    <img 
                        src={service.filePreview(featuredImage)} 
                        alt={title} 
                        className="rounded-xl" />

                </div>
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
            </div>
        </Link>
    );
}

export default PostCard;