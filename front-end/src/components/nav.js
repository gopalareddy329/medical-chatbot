import React from 'react'

const Nav = () => {
  return (
    <div className='my-font text-[#006494] text-[16px] flex justify-between items-center p-8'>
        <div>
            <h3><a href='/'>Ai Chat Bot</a></h3>
        </div>
        <div className='flex gap-5'>
            <a href='/'>Home</a>

            <a href='/'>Contact</a>
        </div>
    </div>
  )
}

export default Nav