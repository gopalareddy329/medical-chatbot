import React, { useEffect } from 'react'
import Nav from '../components/nav'
import { useState,useRef } from 'react';
import {IoSend} from 'react-icons/io5'

const Chat = () => {
    const [message, setMessage] = useState('');
    const [inputHeight, setInputHeight] = useState('50px'); // Initial height
    const [userMessages,setUserMessages]=useState([])
    const [BotMessages,setBotMessages]=useState([])
    const [loading,updateLoding]=useState(false)
    const scrollContainerRef = useRef(null);
    const handleInputChange = (event) => {
            
            const { value } = event.target;
            setMessage(value);
            
            if (!value) {
                setInputHeight('50px');
            }
            else{
            setInputHeight(`${event.target.scrollHeight}px`);
            
    }
  };
  const scrollToBottom = () => {
    console.log("yes")
    if (scrollContainerRef.current) {
      const scrollHeight = scrollContainerRef.current.scrollHeight;
      const height = scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTop = scrollHeight - height;
    }
  };

  useEffect(() => {
    scrollToBottom();
    
  }, [BotMessages,userMessages,loading]);


  const handelSubmit= (event)=>{
    event.preventDefault()
    
    setUserMessages([...userMessages,event.target.elements.userquerry.value])
    setInputHeight('50px');
    setMessage("");
    const fetchResponse = async () =>{
        updateLoding(true)
        
        await fetch(`https://dummyjson.com/products/${userMessages.length}`).then(res => res.json()).then(item=>setBotMessages([...BotMessages,item]));

       
        updateLoding(false)
          
    }
    fetchResponse()
    
  }

  
  return (
    <div className='overflow-hidden h-screen'>
        <Nav/>
        <div className='md:grid md:grid-cols-1fr-3fr '>
            <div className='bg-[#003554] min-h-screen  max-md:hidden relative'>
                <div className='flex h-[90%] justify-center '>
                    <h1 className='text-[40px] text-white font-bold max-md:text-[20px] text-center absolute top-[20%]'>AI Powered Medical Chat Bot</h1>
                </div>
            </div>
            <div  className='bg-[#3c4d55] overflow-hidden max-md:min-h-screen  flex  h-[100%] relative justify-center '>


                <div ref={scrollContainerRef} className=' overflow-scroll h-[500px]  w-full  max-w-[850px]'>
                    <div className='mb-5 '>
                    {userMessages.map((e,key)=>
                    <div key={key} className=' w-full '>
                        <div  className='user-input-bg ' >
                                <div className='user-input-warrper'>  
                                            <h1 className='m-3 break-all'>{e}</h1><br/>   

                                </div> 
                        </div>
                        {<div className='bot-input-bg bg-transparent '>
                            <div className='bot-input-warrper'>
                            
                            {BotMessages[key]!=null && <p className=' break-all'>{BotMessages[key].images}{key}</p>}
                            </div>
                        </div>}
                    
                    </div>
                   
                    )}
                    {loading && <div className='bot-input-bg'><div className='bot-input-warrper'>Waiting...</div></div>}
                   </div>
                    
                </div>

                <div className=" fixed bottom-5 w-full">
                    <div className="flex justify-center ">
                        <form onSubmit={handelSubmit} method='post' className='relative'>
                            <textarea  name='userquerry' id="userquerry" className="min-w-[450px] max-w-[500px] w-[45vw]  bg-[#1e2f36] text-white flex p-3 outline-none border-none justify-center max-h-[350px] pr-[10%] break-all"  style={{ height: inputHeight ,resize: "none"}} placeholder="Type your message..." value={message} onChange={handleInputChange} resize="none"/>
                            
                            <button type='submit' className='absolute bottom-[1%] bg-[#477590] p-1 rounded-lg m-2 right-0 text-white ' ><IoSend size={30}/></button>
                        </form>        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat