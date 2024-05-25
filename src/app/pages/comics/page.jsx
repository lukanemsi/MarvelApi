"use client"
import React,{useState, useEffect} from "react";
import Comic from "@/app/components/model/Comic";
import SearchBar from "@/app/components/layout/SearchBar";
import { useSearchParams } from 'next/navigation'
import { getComics } from "@/app/services/MarvelService";


const ComicsPage = () => {
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState(5)
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const comicsData = [];
        const queryResult = await getComics(count,query);
    
        queryResult.forEach((doc) => {
          comicsData.push({id: doc.id,data: doc.data()});
        });
        setComics(comicsData);
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    fetchComics();
  }, [count, query]);


  return (
    <div>
      <SearchBar />
      <div className="container mx-auto flex justify-around p-20 flex-wrap ">
        {
          
          comics.map((c,key) => 
            <div className="w-1/5 mb-4" key={key}>
               <Comic  comic={c.data} id={c.id}/>
            </div>
          )
        }
      </div>
      <div onClick={() => {setCount(count + 5)}} className="bg-gray-200 p-4 flex justify-center items-center rounded-lg shadow-lg cursor-pointer">
        <div className="text-gray-800 font-semibold">
          Load More
        </div>
      </div>
    </div>
  );
};

export default ComicsPage;
