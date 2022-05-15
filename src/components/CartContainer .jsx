import React , {useEffect , useState}  from 'react'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import { RiRefreshFill} from 'react-icons/ri'
import  {motion }from 'framer-motion'
import { useStateValue } from '../Context/StateProvider'
import { actionType } from '../Context/reducer'
import CartItem from './CartItem'




const CartContainer  = () => {
       
        const [{cartShow, cartItems}, dispatch] = useStateValue ()
        const [tot, setTot] = useState(null)
        const [flag , setFlag] = useState(0)
       
        
        const showCart = () =>{
          dispatch({
              type: actionType.SET_CART_SHOW ,
              cartShow: !cartShow 
          })
      }

      useEffect(() => {
      
            let  totalPrice = cartItems.reduce(function(acc , item){
                  return  acc + item.qty * item.price
            }, 0 )

            setTot(totalPrice)
            console.log(tot);
      }, [tot, flag ])

      const clearCart = () =>{
        dispatch( {
            type: actionType.SET_CART_ITEMS ,
              cartItems :[]
        })
        localStorage.setItem('cartItems', JSON.stringify([]))
      }

        


  return (
    <motion.div 
        initial ={{opacity:0 , x:200}}
        animate = {{opacity :1 , x : 0}}
        exit = {{opacity :0  , x :200}}
        className='w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col fixed top-0 right-0 z-[101]'
    >
          <div className='w-full  flex items-center justify-between p-4 cursor-pointer'>
               <motion.div
                  whileTap={{scale:0.75}}
                  onClick ={showCart}
               > 
                    <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>                
               </motion.div> 
                    <p className='text-textColor text-lg font-semibold'> Cart </p>
                    <motion.p 
                        onClick ={clearCart}
                        whileTap={{scale:0.75}}
                        className='flex  items-center gap-2 p-1 px-2  my-2  bg-gray-100  
                        rounded-md hover:shadow-md duration-100 ease-in-out
                        transition-all cursor-pointer text-textColor text-base
                    '> 
                        Clear  <RiRefreshFill/> {" "}
                    </motion.p>
          </div>

          {/* bottom section */}
              <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex-col flex'>
                  {/* Cart Items Section  */}
                      <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3  overflow-y-scroll scrollbar-none'> 
                            {/* Cart Items   */}
                                {cartItems && cartItems.map(item =>(
                                        <CartItem 
                                            key={item.id} 
                                            item ={item}
                                            setFlag= {setFlag}
                                            flag = {flag}
                                         />
                                ))}
                      </div>

                      {/* Cart Total section */}

                        <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
                                  <div className='w-full flex items-center justify-between'>
                                        <p className='text-gray-400 text-lg'>Sub Total</p>
                                        <p className='text-gray-400 text-lg'>$ {tot}</p>
                                  </div>

                                  <div className='w-full flex items-center justify-between'>
                                        <p className='text-gray-400 text-lg'> Delivery</p>
                                        <p className='text-gray-400 text-lg'>$ 2 </p>
                                  </div>
                                    
                                  <div className='w-full border-b border-gray-600 my-2'> </div>

                                  <div className='w-full flex items-center justify-between'>
                                        <p className='text-gray-200 text-xl font-semibold'> Total</p>
                                        <p className='text-gray-200 text-xl font-semibold'>${tot + 2} </p>
                                  </div>

                                  <motion.button
                                        whileTap={{scale:0.8}}
                                        type = 'button'
                                        className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600
                                          text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'
                                  >
                                            Check Out
                                  </motion.button>
                        </div>
              </div>


      </motion.div>
  )
}

export default CartContainer 