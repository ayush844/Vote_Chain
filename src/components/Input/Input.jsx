import React, {useContext} from 'react'

const Input = ({inputType, title, placeholder, handleClick }) => {
  return (
    <div className='flex flex-col gap-2'>
        <p className='font-bold text-lg'>{title}:</p>
        {inputType === 'text' && (
            <div className=' w-full'>
                <input type="text" placeholder={placeholder} onChange={handleClick} className='w-full px-4 py-2 border border-white rounded-lg bg-gray-200 text-black font-bold' />
            </div>
        )}
    </div>
  )
}

export default Input