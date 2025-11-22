"use client"

import React, { useContext, useEffect } from 'react'
import { VotingContext } from '@/context/Voter'
import Countdown from 'react-countdown';
import Card from '@/components/Card/Card';

const playground = () => {

    const {uploadToIPFS, giveVote, getNewCandidate, candidateArray, checkIfWalletIsConnected, candidateLength, currentAccount, voterLength} = useContext(VotingContext);

    console.log("current account is >>> ", currentAccount);

    useEffect(()=>{
        checkIfWalletIsConnected();
    }, [])

  return (
    <div className='pt-48 w-[90%] mx-auto my-0 flex flex-col gap-12 justify-items-center '>
        {currentAccount && (
            <div>

                <div className='mb-12 flex flex-col items-center gap-4'>
                    <small className='font-medium text-gray-400 text-5xl'>
                        <Countdown date={Date.now() + 1000000} />
                    </small>
                </div>

                <div>
                    <div>
                        <p className='font-bold text-lg'>Number of candidates: <span    className='font-bold text-2xl'>{candidateLength}</span></p>
                    </div>
                    <div>
                        <p className='font-bold text-lg'>Number of voters: <span className='font-bold text-2xl'>{voterLength}</span></p>
                    </div>
                </div>


            </div>
        )}

        <Card candidateArray={candidateArray} giveVote={giveVote} />
    </div>
  )
}

export default playground