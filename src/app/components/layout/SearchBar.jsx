"use Client"
import React, {useState} from "react";
import { useRouter } from 'next/navigation';

const SearchBar = () =>{
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        router.push(`?query=${searchQuery}`);
    }
    const handleClear = () => {
        setSearchQuery("")
        router.push('/');
    }
    return (
        <div className="flex items-center border rounded-md shadow-sm p-5">
            <input 
                type="text"  
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                className="w-full px-4 py-2 border-r rounded-l-md focus:outline-none"
            />
            <button onClick={handleSearch}  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-r-md">Search</button>
            <button  onClick={handleClear} className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none">Clear</button>
        </div>
    );
}

export default SearchBar;