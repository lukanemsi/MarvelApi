'use Client'
import React, {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import { UserAuth } from "@/app/context/AuthContext";

import { HeartIcon } from '@heroicons/react/outline';
import { addToFavourites, getFavourites, removeFromFavourites } from "@/app/services/MarvelService";


const Comic = ({ comic, id }) => {
    const {user} = UserAuth();

    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false); 

    const toggleFavorite = async () => {
        if(!isFavorite)
        {
            await addToFavourites(user.uid, id)
        }
        else{
            await removeFromFavourites(user.uid, id)
        }
        setIsFavorite(!isFavorite);
       
    };


    useEffect(() => {
        const fetchFavourites = async () => {
            const queryResult =  await getFavourites(user.uid);
            queryResult.forEach((doc) => {
                if(doc.data().comicId === id){
                    setIsFavorite(true)
                }
            });
         
        }
        if(user){
            fetchFavourites();
        }
    },[user])

    return (
        <div className="h-full comic cursor-pointer flex flex-col items-center justify-center p-2 bg-gray-200 m-5 border-2 border-gray-300 rounded-lg shadow-md relative">
            <button className="absolute top-2 right-2 focus:outline-none" onClick={toggleFavorite}>
            {!user ? null :  isFavorite ?   <HeartIcon width={25} height={25} fill="red"/> :
                <HeartIcon width={25} height={25} fill="white"/>}
            </button>
            <div className="comic-img-wrapper" onClick={() => router.push(`/pages/comics/${id}`)}>
                <img src={comic.src} alt="comic" width={200} height={300} />
            </div>
            <div className="comic-info mt-4 ">
                <h2 className="text-xl font-bold">{comic.title}</h2>
                <p className="text-gray-600 mt-1">Author: {comic.author}</p>
                <p className="text-yellow-500 mt-1">Rating: {comic.rating}/5</p>
            </div>
        </div>
    );
}

export default Comic;
