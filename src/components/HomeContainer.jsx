import React from 'react'
import Delivery from './img/delivery.png'
import HeroBg from './img/heroBg.png'
import { heroData } from '../utils/data'

const HomeContainer = () => {

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-[calc(100%-88px)]' id='home' >
            <div  className='py-2 flex flex-col justify-center items-start flex-1 gap-6'>
                    <div className='flex items-center gap-2 justify-center bg-orange-100 rounded-full px-4 py-1 '>
                        <p className='text-base text-orange-400 font-semibold  '> Bike Delivery </p>
                        <div className='w-6 h-6 rounded-full overflow-hidden bg-white drop-shadow-xl ' > 
                                <img 
                                    src={Delivery}
                                    className ='w-full h-full object-contain'
                                    alt =' delivery'
                                />
                        </div>
                    </div>   
                    <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide '>
                        The Fastest Delivery in <span className='text-orange-600 text-[3rem] lg:text-[5rem]'>Your City</span>
                    </p>
                    <p className='text-base text-textColor text-center lg:text-left lg:w-[80%]'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit eaque fugit distinctio est nam voluptatum architecto, porro iusto 
                        deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere  suscicpit!
                    </p> 
                    <button type='button' 
                            className='
                                bg-gradient-to-br 
                                from-orange-400 
                                to-orange-500 
                                w-full
                                md:w-auto
                                px-4 
                                py-2 
                                rounded-lg
                                hover:shadow-lg transition-all ease-in-out duration-100
                                
                                '
                        >
                        Order Now  
                    </button>         
          </div>
          <div className='py-2 flex-1 flex  relative'>
                <img 
                    src={HeroBg}
                    alt ='Hero'
                    className='lg:h-650 h-420 w-full lg:w-auto ml-auto'
                />
                <div className=' w-full h-full absolute top-0  left-0 lg:left-[0.855rem] py-2 flex items-center justify-center gap-4 flex-wrap '>
                        {heroData && heroData.map(n =>(
                                <div key={n.id} className=' lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-center flex-col '>
                                    <img src={n.imageSrc}
                                        alt ={n.name}
                                        className='w-20 lg:w-40 -mt-10  lg:-mt-20 ' 
                                    
                                    />
                                    <p className='lg:text-xl  text-base  font-semibold text-textColor lg:mt-4 mt-2' >{n.name}</p>
                                    <p className='lg:text-sm text-[12px] text-lightTextGray lg:my-3 my-1'>{n.decp} </p>
        
                                    <p className='text-sm font-semibold text-headingColor'>
                                        <span className='text-xs text-red-600'>$</span>{n.price}
                                    </p>
                                </div>
                        ))}
                 </div>
          </div>

    </section>
  )
}

export default HomeContainer