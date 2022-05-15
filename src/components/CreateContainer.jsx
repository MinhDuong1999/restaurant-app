// Import file from library
import React ,{useState}from 'react'
import { motion } from 'framer-motion'
import {MdFastfood,MdCloudUpload,MdDelete, MdFoodBank, MdAttachMoney} from 'react-icons/md'
import{deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'

// Import file from server-app
import { categories } from '../utils/data'
import Loader from './Loader'
import { storage } from '../firebase.config'
import { saveItems } from '../utils/firebaseFunctions'
import { actionType } from '../Context/reducer'
import { useStateValue } from '../Context/StateProvider'
import { getAllFoodItems } from '../utils/firebaseFunctions'




const CreateContainer = () => {

  const [title, setTitle] = useState("")
  const [calories, setCalories] = useState("")
  const [price, setPrice] = useState("")
  const [cateogry, setCategory] = useState(null)
  const [field, setField] = useState(false)
  const [alertStatus, setAlerStatus] = useState("danger")
  const [isLoading, setIsLoading] = useState(false)
  const[msg , setMsg] = useState(null)
  const [ imageAsset , setImageAsset] = useState(null)
  const  [ dispatch] =useStateValue()

  const uploadImage = (e)=>{

        setIsLoading(true)
        const imageFile = e.target.files[0]
        
        const storageRef = ref(storage,`Image/${Date.now()} - ${imageFile.name}`)
        const uploadTask = uploadBytesResumable (storageRef , imageFile)

        uploadTask.on('state_changed',(snapshot)=>{
                const uploadProgress = (snapshot.bytesTransferred/ snapshot.totalBytes)*100
          }, (error) =>{
              console.log(error)
              setField(true)
              setMsg('Error while uploading .... : Try again')
              setAlerStatus('danger')
              setTimeout(()=>{
                  setField(false)
                  setIsLoading(false)
              },4000)
          } , ()=>{
                getDownloadURL(uploadTask.snapshot.ref)
                .then(downloadURL => {
                    setImageAsset(downloadURL)    
                    setField(true)
                    setIsLoading(false)
                    setMsg('Image Upload Successfully !')
                    setAlerStatus('Success')
                    setTimeout(()=>{
                      setField(false)
                    },4000)
                })

          } )
  }

  const deleteImage = ()=> {
      setIsLoading(true)
      const deleteRef = ref(storage , imageAsset)
      deleteObject(deleteRef).then(()=>{
          setImageAsset(null)
          setIsLoading(false)
          setField(true)
          setMsg('Image Delete Successfully !')
          setAlerStatus('Deleted success')
          setTimeout(()=>{
              setField(false)
          },4000)
      })

  }
  
  const saveDetail = ()=>{
      setIsLoading(true)
      try {
          if(!title || !calories || !imageAsset || !price || !categories){
            setField(true)
            setMsg("Required field can't be empty ")
            setAlerStatus('danger')
            setTimeout(()=>{
                setField(false)
               
                setIsLoading(false)
            },4000)
          } else{
              const data = {  
                  id: `${Date.now()}`,
                  title: title ,
                  imageURL : imageAsset ,
                  category: cateogry ,
                  calories : calories ,
                  qty: 1 ,
                  price: price

              }
              saveItems(data)    
               setField(true)
               setIsLoading(false)
               setMsg('Data Uploaded Successfully !')
               clearData ()
               setAlerStatus('Success')
               setTimeout(()=>{
                setField(false)
                
              },4000)

          }

        
        
      } catch (error) {
        console.log(error)
        setField(true)
        setMsg('Error while uploading .... : Try again')
        setAlerStatus('danger')
        setTimeout(()=>{
            setField(false)
            setIsLoading(false)
        },4000)
      }
      fetchData()
  }

  const clearData = ()=>{
          setTitle("")
          setImageAsset(null)
          setCalories("")
          setPrice("")
          setCategory('Selection Category')
  }

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
        dispatch({
            type: actionType.SET_FOOD_ITEMS ,
            foodItems :data
        })
    })
  }

  return (
    <div className='w-full min-h-screen flex  justify-center items-center'>
           <div className='w-[90%] md:w-[75%] border border-gray-300  rounded-lg p-4 felx flex-col items-center justify-center gap-4'>
                    {field && (
                        <motion.p 
                          initial ={{opacity : 0}}
                          animate ={{opacity :1}}
                          exit = {{opacity : 0  }}
                          
                          className= {`w-full  p-2  rounded-lg text-center text-lg font-semibold
                              ${alertStatus === 'danger'
                                  ? "bg-red-400 text-red-700"
                                  : " bg-emerald-400 text-emerald-700 "
                              }
                        `}>
                            {msg}
                        </motion.p>
                    )}
                    <div className='w-full py-2  border-b  boder-gray-300 flex  items-center gap-2'>
                            <MdFastfood className=' text-xl text-gray-700'/>
                            <input
                                type = 'text'
                                required
                                value={title}
                                onChange = {(e)=> setTitle(e.target.value)}
                                placeholder = 'Give me a title ..... '
                                className='w-full h-full text-lg bg-transparent  
                                  outline-none border-none placeholder:text-gray-400 text-textColor'                                
                            />
                    </div>

                    <div className='w-full'>
                        <select onChange={(e) => setCategory(e.target.value)}
                            className = 'outline-none my-4 w-full text-base boder-b-2 boder-gray-200 p-2 rounded-md cursor-pointer'
                        >
                              <option value = 'other' className=' bg-white'> Select Category</option>
                              {categories && categories.map(item => (
                                    <option key={item.id}
                                        className = 'text-base border-0  outline-none capitalize bg-white text-headingColor'
                                        value={item.urlParamName}
                                   >
                                        {item.name}

                                    </option>

                              ))}
                        </select>

                    </div>
                {/* Infomation Food Category  */}
                    <div className=' group flex  justify-center items-center flex-col border-2  
                          border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'> 
                            {isLoading 
                                ? <Loader /> 
                                : <>
                                      {!imageAsset 
                                        ? <>
                                                <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                                                      <div className='w-full h-full flex flex-col items-center justify-center'>
                                                            <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>
                                                            <p className=' text-gray-500 hover:text-gray-700'>Click here to upload </p>
                                                      </div>  
                                                      <input 
                                                        type= 'file' 
                                                        name = 'uploadimage'
                                                        accept='image/*'                                              
                                                        onChange ={uploadImage}
                                                        className = 'w-0 h-0'
                                                        />
                                                </label>
                                               
                                          </>
                                        :<>
                                              <div className='relative h-full'>
                                                    <img  src={imageAsset} 
                                                            alt ={"uploadIamge"}
                                                            className='w-full h-full object-cover'
                                                    />
                                                    <button type='button' 
                                                            className ='absolute bottom-3 right-3  
                                                              p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none
                                                              hover:shadow-md duration-500 transition-all ease-in-out
                                                            '
                                                            onClick={deleteImage} 
                                                            >
                                                         <MdDelete className='text-white'/>       
                                                    </button>
                                              </div>
 
                                        </>}
                            
                                  </>
                            }
                    </div>
                  {/* Create New Calories */}
                    <div className='w-ful flex flex-col md:flex-row  items-center gap-3 my-4'>
                            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                                  <MdFoodBank className='text-gray-700 text-2xl'/>
                                  <input 
                                      type="text" 
                                      required 
                                      value={calories}
                                      onChange = {(e)=> setCalories(e.target.value)}
                                      placeholder='Calories' 
                                      className='w-full h-full text-lg bg-transparent 
                                        outline-none border-none placeholder:text-gray-400 text-textColor'
                                  />
                            </div>
                    </div>
                  {/* Create Price of  New Item */}
                    <div className='w-ful flex flex-col md:flex-row  items-center gap-3 my-4'>
                            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                                  <MdAttachMoney className='text-gray-700 text-2xl'/>
                                  <input 
                                      type="text" 
                                      required 
                                      value={price}
                                      onChange = {e => setPrice(e.target.value)}
                                      placeholder='Price ' 
                                      className='w-full h-full text-lg bg-transparent 
                                        outline-none border-none placeholder:text-gray-400 text-textColor'
                                  />
                            </div>
                    </div>
                    
                    <div className='flex items-center w-full my-4'>
                            <button className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2
                                rounded-lg text-lg text-white font-semibold'
                                onClick={saveDetail}
                            > Save </button>
                    </div>
           </div>
    </div>
  )
}

export default CreateContainer
