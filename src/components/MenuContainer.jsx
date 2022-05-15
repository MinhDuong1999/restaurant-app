import React, {useState} from 'react'
import{IoFastFood} from 'react-icons/io5'
import { categories } from '../utils/data'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from '../Context/StateProvider'

const MenuContainer = () => {
    const [filter, setFilter] = useState("chicken")
    const[{foodItems },dispatch] = useStateValue()

   

  return (
    <section className='w-full my-6' id='menu'>
          <div className='w-full flex flex-col items-center justify-center'>
                <p className=' mr-auto text-2xl font-semibold capitalize text-headingColor relative
                        before:absolute before:rounded-lg before:content before:w-32 before:h-1 
                        before:bottom-[-4px] before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-700
                        transition-all ease-in-out duration-100
                    '>
                      Our Hit Dishes
                </p>

                <div                  
                    className=' w-full  flex  items-center justify-start lg:justify-center
                        gap-8 py-6 overflow-x-scroll scrollbar-none'>
                       {categories && categories.map(categ => (
                                 <motion.div 
                                      whileTap={{scale:0.75}}
                                      key={categ.id} className={`group w-24 min-w-[94px]  h-28 cursor-pointer 
                                      ${filter ===categ.urlParamName ? " bg-cartNumBg" :"bg-card"}
                                      rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center  
                                       hover:bg-cartNumBg`}
                                      onClick ={()=>setFilter(categ.urlParamName)}
                                 >
                                      <div className= {`w-10 h-10 rounded-full
                                             ${filter === categ.urlParamName 
                                              ? "bg-white"
                                              :"bg-cartNumBg"} 
                                             group-hover:bg-white flex items-center justify-center`}
                                      >
                                              <IoFastFood className={`
                                                       ${filter ===categ.urlParamName 
                                                        ? "text-textColor"
                                                        :"text-white"} group-hover:text-textColor text-lg`}
                                              />                                             
                                      </div>
                                      <p className={`${filter === categ.urlParamName?"text-white":"text-textColor" }text-sm text-textColor group-hover:text-white`}>{categ.name}</p>
                              </motion.div>
                       ))}
                </div>
                <div className='w-full'> 
                      <RowContainer
                          flag={false}
                          data ={foodItems?.filter(n => n.category=== filter)}
                      />                                   
                </div>
          </div>
    </section>
  )
}

export default MenuContainer