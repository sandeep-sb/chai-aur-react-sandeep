import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Github(){
    const githubData = useLoaderData();
    console.log(githubData);
    
    // const [githubData, setGithubData] = useState({});
    // useEffect(()=>{
    //     fetch("https://api.github.com/users/sandeep-sb")
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         setGithubData(data);
    //     })

    //     console.log(githubData.followers)
    // }, [])

    return(
        <div className="bg-gray-600 text-white
        text-3xl p-4 text-center">
            <h1>{githubData.login}</h1>
            Github followers: {githubData.followers}
            <img src={githubData.avatar_url} alt="Github profile" width={300}/>
        </div>
    );
}


export const githubInfoLoader = async ()=>{
    const response = await fetch("https://api.github.com/users/sandeep-sb");
    return response.json();
}