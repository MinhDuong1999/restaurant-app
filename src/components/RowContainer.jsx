import React , {useRef,useEffect,useState} from 'react'
import {MdShoppingBasket} from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../components/img/NotFound.svg'
import { useStateValue } from '../Context/StateProvider'
import { actionType } from '../Context/reducer'

const RowContainer = ({flag, data ,scrollValue }) => {

    const [{cartItems} , dispatch] = useStateValue ()
    const [items , setItems] = useState([])

    const addToCart = () =>{
       
        dispatch ({
            type :actionType.SET_CART_ITEMS ,
            cartItems: items
        })
        localStorage.setItem('cartItems' , JSON.stringify(items))
    }
     
    const rowContainerRef = useRef()

    useEffect(() => {
        
          rowContainerRef.current.scrollLeft += scrollValue
        
    }, [scrollValue]) 

    useEffect (()=>{
        addToCart()
    },[items])
  return (
    <div 
        ref={rowContainerRef}
        className= {`w-full scroll-smooth ${flag ? "overflow-x-scroll scrollbar-none":"overflow-x-hidden justify-center  flex-wrap"} 
                     my-12 flex items-center gap-4`}  
    >

       { data && data.length > 0 ?  data.map((item) => (
            <div key={item?.id}  className=' w-300  min-w-[300px] md:min-w-[340px] p-2 h-[250px] my-12 bg-cardOverlay backdrop-blur-lg hover:drop-shadow-lg'>
                 <div className='w-full flex items-center justify-between '>
                         <motion.img 
                             whileHover={{scale:1.2}}
                             src ={item.imageURL}
                             alt=''
                             className='w-40 h-[140px] drop-shadow-xl mt-4 object-contain'

                         />

                         < motion.div 
                            onClick={ () => setItems ([...cartItems ,item])}
                             whileTap={{scale:0.75}}
                             className='w-8 h-8 mr-1 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-lg'>
                                 <MdShoppingBasket className='text-white'/>
                         </motion.div>   
                 </div>
                 <div className='w-full flex flex-col items-end justify-end pr-1'>
                             <p className='text-textColor font-semibold text-base md:text-lg'>
                                 {item?.title}
                             </p>
                             <p className='mt-1 text-sm text-gray-400'>
                                 {item?.calories} Calories
                             </p>
                             <div className='flex items-center '>
                                 <p className='text-lg text-headingColor font-semibold'>
                                         <span className='text-sm text-red-500'> $</span>
                                            {item?.price}
                                 </p>
                             </div>
                 </div>
            </div>
        )):(
             <div className='w-full flex flex-col items-center justify-center'>
                <img src ={NotFound} alt="not found "  className='h-340'/>
                <p className='text-xl text-headingColor font-semibold'> Image Not Valiable </p>
            </div>
        )}
        
        
         
    </div>
  )
}

export default RowContainer