import React, {useState, useEffect} from "react";
import service from "../appwrite/configuration";
import { Container, PostCard } from "../components";


function AllPosts(){
    const [allPosts, setAllPosts] = useState([]);
    useEffect(()=>{
        service.getAllPosts().then(posts => {
            if(posts){
                setAllPosts(posts.documents);
            }
        })
        .catch(error => console.log(error));
    }, []);

    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {allPosts.map(post => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;