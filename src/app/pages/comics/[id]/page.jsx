"use client"
import { getComicById } from "@/app/services/MarvelService";
import React, {useState, useEffect} from "react";
import { usePathname } from 'next/navigation';

const ComicDetails = () =>{
  const [comic, setComic] = useState(null);
  const comicId = usePathname().split("/").pop();

  useEffect(() => {
    getComicById(comicId)
    .then((doc) => {
      if (doc.exists()) {  
         setComic(doc.data())
      } 
    })
    .catch((error) => {
        console.error("Error getting document:", error);
    });
  }, []);

  if(!comic)
    return <></>;

  const { author, characters, description,rating, releaseDate, src, title } = comic;
  return (
    <div className="p-10 mx-auto bg-white rounded-xl overflow-hidden shadow-md h-screen">
      <div className="md:flex items-center">
        <div className="md:flex-shrink-0 w-1/2 flex justify-center">
          <img className="h-80 w-full object-cover md:h-full md:w-80"  src={src} alt={title} />
        </div>
        <div className="p-8 w-1/2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
          <p className="mt-2 text-gray-500">By {author}</p>
          <p className="mt-2 text-gray-600">{description}</p>
          <p className="mt-2 text-gray-600">
            <span className="font-bold">
            Characters: </span>
            {characters.join(', ')}</p>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-semibold text-gray-600">Rating:</span>
            <span className="ml-2 text-sm font-bold text-gray-700">{rating}</span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-semibold text-gray-600">Release Date:</span>
            <span className="ml-2 text-sm font-bold text-gray-700">{releaseDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicDetails