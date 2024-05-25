import { db } from "../fierbase";
import { collection, getDocs, limit, query, getDoc, doc, where, or, addDoc, deleteDoc } from "firebase/firestore";


const comicRef = collection(db, 'Comics')


export const getComicById = async (id) => {
    const documentRef = doc(comicRef, id);
    return await getDoc(documentRef);
}

export async function getComics(count, queryFilter) {
    if(queryFilter){
        return await getDocs(query(
            comicRef,
            limit(count),
            or(
                where('title', '==', queryFilter),
                where('author', '==', queryFilter),
            )
           
          ));
    }
    return await getDocs(query(comicRef,limit(count)));
}

export async function addToFavourites(userId,comicId){
    try{
        const favRef = collection(db,"Favourites");
    
        await addDoc(favRef, {
            userId: userId,
            comicId: comicId
          });

    }catch(error){
        console.log(error)
    }
    

}
export async function removeFromFavourites(userId,comicId){
    const favsRef = collection(db, 'Favourites');
    const q = query(favsRef, where('userId', '==', userId), where('comicId', '==', comicId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
}
export async function getFavourites(userId){
    const favsRef = collection(db, 'Favourites');
    const q = query(favsRef, where('userId', '==', userId));
    return await getDocs(q);
}

