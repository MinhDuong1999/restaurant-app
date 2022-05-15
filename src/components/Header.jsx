// Import từ thư viện 
import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {MdShoppingBasket , MdAdd, MdLogout} from 'react-icons/md'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
// Import từ server-app 
import Logo from './img/logo.png'
import Avatar from './img/avatar.png'
import { app } from '../firebase.config'
import { useStateValue } from '../Context/StateProvider'
import { actionType } from '../Context/reducer'



const Header = () => {

    const firebaseAuth = getAuth(app)
    const provider  = new GoogleAuthProvider()
   const [isMenu, setIsMenu] = useState(false)

    const [{user , cartShow, cartItems} ,dispatch] = useStateValue()

    const login = async () => {
        if(!user){
            const {user: {refreshToken , providerData}}   = await signInWithPopup (firebaseAuth , provider)
            dispatch({
                type : actionType.SET_USER ,
                user: providerData[0]
            })
            localStorage.setItem('user', JSON.stringify(providerData[0]))

        } else setIsMenu(!isMenu)
       
    }

    const logout = ()=>{
        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type : actionType.SET_USER ,
            user: null
        })
    }

    const showCart = () =>{
        dispatch({
            type: actionType.SET_CART_SHOW ,
            cartShow: !cartShow
        })
    }

  return (
    <header className = "w-screen z-50 fixed   p-3 px-4 md:p-6 md:px-16 bg-primary"> 
            {/* Desktop and Tablet */}
                <div className='hidden md:flex w-full h-full '>
                        <Link to={'/'} className='flex items-center gap-2'>
                            <img src={Logo} className='w-8 object-cover' alt='logo' />
                            <p className='text-headingColor text-xl font-bold '> City </p>
                        </Link>

                        {/* Thanh công cụ của Heading  */}
                        <div className='flex items-center gap-8 ml-auto'>
                                <motion.ul
                                  initial ={{opacity:0 , x : 200}}
                                  animate ={{opacity:1 , x : 0}}
                                  exit  ={{opacity: 0 , x: 200}}
                                  className='flex item-center gap-8 '>
                                    <li className='
                                            text-base 
                                            text-textColor 
                                            hover:text-headingColor 
                                            duration-100 
                                            transition-all 
                                            ease-in-out 
                                            cursor-pointer'
                                           >
                                            Home    
                                    </li>
                                    
                                    <li className='
                                        text-base 
                                        text-textColor 
                                        hover:text-headingColor 
                                        duration-100 
                                        transition-all 
                                        ease-in-out 
                                        cursor-pointer '
                                        >

                                            Menu    
                                    </li>
                                    
                                    <li className='
                                        text-base 
                                        text-textColor 
                                        hover:text-headingColor 
                                        duration-100 
                                        transition-all 
                                        ease-in-out 
                                        cursor-pointer '
                                       >

                                            About it
                                    </li>
                                    
                                    <li className='
                                        text-base 
                                        text-textColor 
                                        hover:text-headingColor 
                                        duration-100 
                                        transition-all 
                                        ease-in-out 
                                        cursor-pointer '
                                        >

                                            Service 
                                    </li>
                                    
                                </motion.ul>

                                <div 
                                    className='relative flex items-center justify-center' 
                                    onClick={showCart}                        
                                >
                                    <MdShoppingBasket className='relative -top-1.5 text-textColor text-2xl  cursor-pointer'/>   
                                    {cartItems && cartItems.length > 0 && (
                                        <div className='absolute -top-4 -right-4 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                                            <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                                        </div> 
                                    )}
                                </div>

                                <div className='relative'>
                                      < motion.img  
                                            whileTap={{scale: 0.6}} 
                                            src= {user ? user.photoURL: Avatar} 
                                            alt ='user-profile'
                                            className ='
                                                w-10 
                                                h-10
                                                min-w-[40px]
                                                min-h-[40px]                                          
                                                drop-shadow-xl  
                                                cursor-pointer 
                                                rounded-full
                                                '                                          
                                                onClick={login}/>
                                        {isMenu && (
                                                <motion.div 
                                                  initial ={{opacity: 0 , scale : 0.6}}
                                                  animate ={{opacity:1 , scale: 1}}  
                                                  exit ={{ opacity : 0 , scale: 0.6}}
                                                 className ='
                                                    w-40
                                                    bg-gray-50 
                                                    shadow-xl 
                                                    rounded-lg 
                                                    flex 
                                                    flex-col 
                                                    absolute
                                                    top-12
                                                    right-0.5 
                                                    '>
                                                        {user && user.email === "minhduongskt@gmail.com" &&
                                                           <Link to={'/createcontainer'}>
                                                                    <p className='
                                                                        px-3 
                                                                        py-2 
                                                                        flex 
                                                                        items-center 
                                                                        gap-3 
                                                                        cursor-pointer 
                                                                        hover:bg-slate-200 
                                                                        transition-all 
                                                                        duration-100 
                                                                        ease-in-out 
                                                                        text-textColor 
                                                                        text-base'
                                                                        onClick={()=> setIsMenu(false)}>
                                                                        New Item <MdAdd/>
                                                                    </p> 
                                                           </Link>
                                                           
                                                        }
                                                  
                                                   
                                            
                                                    <p className='
                                                        px-4 
                                                        py-2 
                                                        flex 
                                                        items-center 
                                                        gap-3 
                                                        cursor-pointer 
                                                        hover:bg-slate-200 
                                                        transition-all 
                                                        duration-100 
                                                        ease-in-out 
                                                        text-textColor 
                                                        text-base'
                                                          onClick={logout}
                                                        >
                                                            Log out <MdLogout/>
                                                    </p> 
                                           </motion.div> 
                                        )}

                                </div>     
                            </div>
                </div>  

            {/* Mobile */}
                                                    
                <div className='flex item-center justify-between md:hidden w-full h-full'>
                    
                        <div 
                            className='relative flex items-center justify-center'
                            onClick={showCart}
                        
                        >
                            <MdShoppingBasket className='relative -top-1.5 text-textColor text-2xl  cursor-pointer'/>   
                            {cartItems && cartItems.length > 0 && (
                                        <div className='absolute -top-4 -right-4 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                                            <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                                        </div> 
                            )}
                        </div>


                        <Link to={'/'} className='flex items-center gap-2'>
                            <img src={Logo} className='w-8 object-cover' alt='logo' />
                            <p className='text-headingColor text-xl font-bold '> City </p>
                        </Link>                                  
                        <div className='relative'>
                                      < motion.img  
                                            whileTap={{scale: 0.6}} 
                                            src= {user ? user.photoURL: Avatar} 
                                            alt ='user-profile'
                                            className ='
                                                w-10 
                                                h-10
                                                min-w-[40px]
                                                min-h-[40px]                                          
                                                drop-shadow-xl  
                                                cursor-pointer 
                                                rounded-full
                                                '                                          
                                                onClick={login}/>
                                        {isMenu && (
                                                <motion.div 
                                                  initial ={{opacity: 0 , scale : 0.6}}
                                                  animate ={{opacity:1 , scale: 1}}  
                                                  exit ={{ opacity : 0 , scale: 0.6}}
                                                 className ='
                                                    w-40
                                                    bg-gray-50 
                                                    shadow-xl 
                                                    rounded-lg 
                                                    flex 
                                                    flex-col 
                                                    absolute
                                                    top-12
                                                    right-0.5 
                                                    '>
                                                        {user && user.email === "minhduongskt@gmail.com" && (
                                                           <Link to={'/createcontainer'}>
                                                                    <p className='
                                                                        px-3 
                                                                        py-2 
                                                                        flex 
                                                                        items-center 
                                                                        rounded-lg 
                                                                        cursor-pointer 
                                                                        hover:bg-slate-200 
                                                                        transition-all 
                                                                        duration-100 
                                                                        ease-in-out 
                                                                        text-textColor 
                                                                        text-base'
                                                                        onClick={()=>setIsMenu(false)}>
                                                                        New Item <MdAdd/>
                                                                    </p> 
                                                           </Link>                                                           
                                                        )}   
                                                                                                      
                                                            <ul className='flex 
                                                                        flex-col item-center  '>
                                                                <li className='
                                                                        px-3 
                                                                        py-2 
                                                                        text-base 
                                                                        text-textColor 
                                                                        hover:text-headingColor 
                                                                        duration-100 
                                                                        transition-all 
                                                                        ease-in-out 
                                                                        cursor-pointer
                                                                        rounded-lg 
                                                                        hover:bg-slate-200 '>
                                                                        Home    
                                                                </li>
                                    
                                                                <li className='
                                                                    px-3 
                                                                    py-2 
                                                                    text-base 
                                                                    text-textColor 
                                                                    hover:text-headingColor 
                                                                    duration-100 
                                                                    transition-all 
                                                                    ease-in-out 
                                                                    rounded-lg 
                                                                    cursor-pointer
                                                                    hover:bg-slate-200  '>

                                                                        Menu    
                                                                </li>
                                                                
                                                                <li className='
                                                                    px-3 
                                                                    py-2 
                                                                    text-base 
                                                                    text-textColor 
                                                                    hover:text-headingColor 
                                                                    duration-100 
                                                                    transition-all 
                                                                    ease-in-out 
                                                                    cursor-pointer 
                                                                    rounded-lg 
                                                                    hover:bg-slate-200 '>

                                                                        About it
                                                                </li>
                                                            
                                                                <li className='
                                                                    px-3 
                                                                    py-2 
                                                                    text-base 
                                                                    text-textColor 
                                                                    hover:text-headingColor 
                                                                    duration-100 
                                                                    transition-all 
                                                                    ease-in-out 
                                                                    rounded-lg 
                                                                    cursor-pointer
                                                                    hover:bg-slate-200  '>

                                                                        Service 
                                                                </li>
                                                            
                                                        </ul>
                                                                                                                                                                                    
                                                    <p className='
                                                         
                                                        py-2 
                                                        flex 
                                                        items-center 
                                                        justify-center 
                                                        bg-gray-200                                                                                                          
                                                        cursor-pointer
                                                        rounded-lg                                                        
                                                        hover:bg-slate-200
                                                        transition-all 
                                                        duration-100 
                                                        ease-in-out 
                                                        text-textColor 
                                                        text-base'
                                                            onClick={logout}
                                                        >
                                                         Log out  <MdLogout style={{ marginLeft:6}}/>
                                                    </p> 
                                           </motion.div> 
                                        )}

                        </div>          

                </div>

     </header>
  )
}

export default Header