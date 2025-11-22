"use client"

import React, {useState, useEffect, useCallback, useContext} from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import  Image from 'next/image'

import { VotingContext } from '@/context/Voter'
import myImage from '@/assets/creator.jpg'
import imagePlaceholder from '@/assets/imagePlaceholder.png'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'


const AllowedVoters = () => {

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: ""
  });

  const router = useRouter();
  const {uploadToIPFS, createVoter, voterArray, getAllVotersData} = useContext(VotingContext);

  // voter image Drop

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    console.log("image url is >>>> ", url);
    setFileUrl(url);
  });

  const {getRootProps, getInputProps, isDragActive} = useDropzone(
    {onDrop, accept: { 'image/*': []}, maxSize: 5000000
  }); 

  useEffect(()=>{
    getAllVotersData();
    console.log("voterArray in allowdvoters page >>>> ", voterArray);
  }, [])

  return (
    <div className='pt-36 pb-36 w-[90%] mx-auto my-0 grid  gap-12 justify-items-center     grid-cols-1 md:grid-cols-2 lg:grid-cols-[25%_50%_25%]'>

    <div  className="relative">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 blur-2xl h-fit w-fit p-16" />
      <div className="relative rounded-lg border border-cyan-400/30 bg-card p-8 max-w-96 min-w-80">
        {fileUrl && (
          <div className='flex flex-col items-center fixed top-48 left-12 w-60 h-fit bg-black rounded-lg p-6 border-2 border-cyan-400'>
            <img
              src={fileUrl}
              alt="voter image"
              className='w-36 h-36 rounded-full bg-white mb-10'
            />

            {/* Text container full width so text aligns to start */}
            <div className='w-full overflow-hidden wrap-break-word'>
              <p className='text-lg font-extrabold text-gray-400 mb-3'>
                Name: &nbsp; <span className='text-white'>{formInput.name}</span>
              </p>
              <p className='text-lg font-extrabold text-gray-400 mb-3'>
                Address: &nbsp; <span className='text-white'>{formInput.address.slice(0, 20)}...</span>
              </p>
              <p className='text-lg font-extrabold text-gray-400 mb-3'>
                Position: &nbsp; <span className='text-white'>{formInput.position}</span>
              </p>
            </div>
          </div>

        )}

        {!fileUrl && (
          <div>
            <div>
              <h4 className=' text-cyan-400 text-2xl font-bold mb-6.5'>Create candidate for voting</h4>
              <p className=' text-lg font-extrabold text-gray-400 mb-5.5'>Decentralized voting powered by Ethereum</p>
              <p className=' text-xl text-cyan-400 font-medium'>Contract Candidate</p>
            </div>
            <div className='mt-8 flex flex-wrap justify-center gap-6'>
              {voterArray.map((el, i)=> (
                <div  key={i+1} className='flex flex-col items-center gap-4 mb-6 bg-gray-950 border border-cyan-400/20 p-4 rounded-lg max-w-52'>
                  <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400'>
                    <img src={el[2]} alt="Profile Photo"  className='w-full h-full' />
                  </div>
                  <div  className='text-center'>
                    <p>{el[1]} #{Number(el[0])}</p>
                    <p>Address: {el[3].slice(0, 10)}..</p>
                    {/* <p>Details</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>


    <div  className="relative w-full">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 blur-2xl h-fit p-16 w-full" />
      <div className="relative rounded-lg border border-cyan-400/30 bg-card p-8 w-full">
        <div className='flex flex-col items-center gap-6 mb-8'>
          <h1 className=' text-cyan-400 text-4xl font-bold mb-4'>Create New Voter</h1>
          <div className='border border-cyan-200 p-10 rounded-lg w-full cursor-pointer'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              <div className=' flex flex-col items-center gap-8'>
                <p className=' text-xl font-normal text-gray-400'>Upload File: JPG, PNG, GIF, WEBM | max: 10mb</p>

                <div>
                   <Image src={imagePlaceholder} width={150} height={150} objectFit='contain' alt='file upload' />
                </div>

                <p className='text-lg text-gray-400 '>Drag & Drop file</p>
                <p className='text-xl text-gray-400 font-bold'>or Browse media on your device</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <Input inputType="text" title="Name" placeholder="Voter Name" handleClick={(e)=>setFormInput({...formInput, name: e.target.value})} />

          <Input inputType="text" title="Address" placeholder="Voter Address" handleClick={(e)=>setFormInput({...formInput, address: e.target.value})} />

          <Input inputType="text" title="Position" placeholder="Voter Position" handleClick={(e)=>setFormInput({...formInput, position: e.target.value})} />

          <div className='flex justify-end mt-8'>
            <Button btnName="Authorize Voter" handleClick={() => createVoter(formInput, fileUrl)} />
          </div>
        </div>
      </div>
    </div>


    <div  className="relative">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 blur-2xl h-fit w-fit p-16" />
      <div className="relative rounded-lg border border-cyan-400/30 bg-card p-8 max-w-96">
        <div className='flex flex-col items-center gap-10'>
          <Image src={myImage} width={150} height={150} objectFit='contain' alt='user upload' className='rounded-full' />
          <div>
            <p className=' text-cyan-400 text-2xl font-bold mb-4'>Notice for user</p>
            <p className=' text-xl font-normal text-gray-400 mb-3'>Organizer: <span className=' text-white'>0x939567....</span></p>
            <p className=' text-xl font-semibold text-gray-400'>Only organizer of the voting contract can create the voter for voting election</p>
          </div>
        </div>
      </div>
      </div>

    </div>
  )
}

export default AllowedVoters