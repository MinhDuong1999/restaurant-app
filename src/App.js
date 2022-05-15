// Import  từ thư viện 
import { getAllByAltText } from '@testing-library/react'
import { AnimatePresence } from 'framer-motion'
import React,{useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
// Import từ server app
import { Header, CreateContainer , MainContainer } from './components'
import { actionType } from './Context/reducer'
import { useStateValue } from './Context/StateProvider'
import { getAllFoodItems } from './utils/firebaseFunctions'

const App = () => {
    const  [{foodItems}, dispatch] =useStateValue()

    const fetchData = async () => {
          await getAllFoodItems().then(data => {
              dispatch({
                  type: actionType.SET_FOOD_ITEMS ,
                  foodItems :data
              })
          })
    }

    useEffect(() => {
        fetchData()
    }, [] )
    
  return (
      <AnimatePresence exitBeforeEnter>
        <div className='w-creen h-auto flex flex-col bg-primary'>
              <Header/>
              <main className='mt-14 md:mt-20  px-4 md:px-16 py-8  w-full '>
                    <Routes>
                        <Route path='/*' element ={<MainContainer/>}/>
                        <Route path='/createcontainer' element = {<CreateContainer/>}/>
                    </Routes>
              </main>
        </div>
      </AnimatePresence>
  )
}

export default App