import {getApp ,getApps,initializeApp}from 'firebase/app' 
import {getFirestore }from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = { 
    apiKey : "AIzaSyCOQjrOUS6Fy63tFtID-EAeuBqKVoupJjE" , 
    authDomain : "restaurantapp-ed5bc.firebaseapp.com" , 
    databaseURL : "https://restaurantapp-ed5bc-default-rtdb.firebaseio.com" , 
    projectId : "restaurantapp-ed5bc" , 
    storageBucket : "restaurantapp-ed5bc.appspot.com" , 
    messagingSenderId : "944752165456" , 
    appId : "1:944752165456:web:5377c6d423e32bc70fc755" , 
    measurementId : "G-01XWKN19QB" 
  }

  const app = getApps.length > 0 ? getApp() :  initializeApp(firebaseConfig)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export { firestore ,storage , app}