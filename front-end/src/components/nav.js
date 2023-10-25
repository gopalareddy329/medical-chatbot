import React from 'react'

const Nav = () => {
  return (
    <div className='my-font fixed top-0 z-20 bg-white w-full text-[#006494] text-[16px] flex justify-between items-center p-8'>
        <div>
            <h3><a href='/'>Ai Chat Bot</a></h3>
        </div>
        <div className='flex gap-5'>
            <a href='/'>Home</a>

            <a href='/contact'>Contact</a>
        </div>
    </div>
  )
}

export default Nav