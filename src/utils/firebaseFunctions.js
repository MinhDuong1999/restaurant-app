
import { doc, setDoc ,getDocs, query, collection, orderBy } from "firebase/firestore";
import { firestore } from "../firebase.config";

// Save new Item
export const saveItems = async (data) =>{
    await setDoc(doc(firestore,'foodItems', `${Date.now()}`),data,{merge: true})
}

// Get all food Items

export const getAllFoodItems = async()=>{
    const items = await getDocs(
        query(collection(firestore ,'foodItems'),orderBy('id', 'desc'))
    )
    return items.docs.map( doc =>doc.data())
}