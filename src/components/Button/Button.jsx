import React from 'react'

const Button = ({btnName, handleClick}) => {
  return (
    <button type='button' onClick={handleClick} className='bg-cyan-400 text-black px-4 py-2 rounded-md hover:bg-cyan-700 transition duration-300 cursor-pointer'>
        {btnName}
    </button>
  )
}

export default Button