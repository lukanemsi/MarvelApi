'use client'
import { UserAuth } from "@/app/context/AuthContext";
import { getFavourites } from "@/app/services/MarvelService";
import React, { useEffect, useState } from "react";
import Comic from "@/app/components/model/Comic";
import { getComicById } from "@/app/services/MarvelService";


const FavoritesPage = () => {
  const {user} = UserAuth();
  const [favourites, setFavourites] = useState([])
  const [favouriteComics, setFavouriteComics] = useState([])
   

  

  useEffect(() => {
    const fetchFavourites = async () => {
      const queryResult =  await getFavourites(user.uid);
      const fav = []
      queryResult.forEach((doc) => {          
        fav.push(doc.data())
      });
      setFavourites(fav)
    }

    if(user){
      fetchFavourites();
    }
  }, [])

  useEffect(() => {
    const fetchFavouriteComics = async () => {
      const favComicsPromises = favourites.map(async fav => {
        const doc = await getComicById(fav.comicId);
        return { id: doc.id, data: doc.data() };
      });
  
      const favComics = await Promise.all(favComicsPromises);  
      setFavouriteComics(favComics)
    }
  fetchFavouriteComics(); 
  }, [favourites]) 


  if(favouriteComics.length == 0)
  {
    return (
      <div className="h-screen ">
        <h1 className="text-center text-4xl font-bold text-black-600">No Favourites</h1>
      </div>
    )
  }
  return (
    <div className="container mx-auto flex justify-around p-20 flex-wrap ">
        {
          favouriteComics.map((c,key) => 
            <div className="w-1/5 mb-4" key={key}>
               <Comic  comic={c.data} id={c.id} />
            </div>
          )
        }
      </div>
  );
};

export default FavoritesPage;
