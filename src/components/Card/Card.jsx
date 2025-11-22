import React from 'react'
import Image from 'next/image'
import { id } from 'ethers'

const Card = ({candidateArray, giveVote}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {
        candidateArray.map((el, i)=>(
          <div key={i+1} className='border border-cyan-400/20 rounded-lg p-4 mb-6 flex flex-col items-center gap-4 max-w-md'>
            <div className='w-32 h-32 rounded-full overflow-hidden'>
              <img src={el[3]} alt='profile' className='w-full h-full object-cover' />
            </div>
            <div>
              <h2 className='text-2xl font-bold'>{el[2]} #{Number(el[0])}</h2>
              <p className='text-lg'>Age: {el[1]}</p>
              <p className='text-lg'>Address: {el[5].slice(0, 30)}...</p>
              <p className='text-xl mt-1 text-cyan-400 text-center'>Total Vote</p>
            </div>

            <div>
              <p className='text-2xl font-bold'>{Number(el[4])}</p>
            </div>

            <div>
              <button className=' cursor-pointer bg-cyan-400 text-black px-4 py-2 rounded-md hover:bg-cyan-700 transition duration-300' onClick={()=>giveVote({id: Number(el[0]), address: el[5]})}>Give Vote</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Card