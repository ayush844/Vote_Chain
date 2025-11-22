"use client";

import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers, BrowserProvider, Contract } from "ethers";
import { useRouter } from "next/navigation";
import { VotingAddress, VotingABI } from "./constants";
import axios from "axios";

export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const [ipfsClient, setIpfsClient] = useState(null);
  const VotingTitle = "Election 2024";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);


  const [error, setError] = useState("");
  const highestVotes = [];


  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState("");
  const [voterAddress, setVoterAddress] = useState([]);

  //connecting meta mask wallet

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
    } else {
      setError("Please Install MetaMask, connect and refresh the page.");
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setCurrentAccount(accounts[0]);
  }

  // ✅ Prepare contract fetcher (kept the same)
  const fetchContract = (signerOrProvider) => new Contract(VotingAddress, VotingABI, signerOrProvider);


  // upload to pinata
const uploadToIPFS = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (data.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    } else {
      setError("Failed to upload to Pinata");
    }
  } catch (err) {
    setError("Failed to upload to Pinata: " + err.message);
  }
};


// upload JSON metadata to Pinata
const uploadJSONToPinata = async (jsonData) => {
  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: JSON.stringify(jsonData),
    });

    const data = await res.json();

    if (data.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    } else {
      throw new Error("Pinata JSON upload failed");
    }

  } catch (err) {
    console.error("Pinata JSON Upload Error:", err);
    throw err;
  }
};



// create voter
const createVoter = async (formInput, fileUrl) => {
  try {
    console.log("🔥 createVoter CLICKED");

    const { name, address, position } = formInput;

    if (!name || !address || !position || !fileUrl) {
      setError("Please fill all the fields");
      console.log("Missing fields:", { name, address, position, fileUrl });
      return;
    }

    // console.log("Form Input:", name, address, position, fileUrl);

    // connect wallet
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new BrowserProvider(connection);
    const signer = await provider.getSigner();
    // console.log(await signer.getAddress());
    const contract = fetchContract(signer);

    // console.log("Contract:", contract);
    // console.log(contract);
    // console.log(contract.interface.fragments.filter(f => f.type === "function"));

    const data = {
      name,
      address,
      position,
      image: fileUrl
    };

    const jsonUrl = await uploadJSONToPinata(data);

    // console.log("Metadata URL:", jsonUrl);
    const voter = await contract.voterRight(address, name, fileUrl, 0, jsonUrl);
    voter.wait();
    // console.log("Voter created successfully:", voter);

    router.push("/voterlist");

    // const tx = await contract.addVoter(name, address, position, fileUrl);
    // await tx.wait();
    
  } catch (err) {
    console.log("Create voter error:", err);
    setError("Error creating voter");
  }
};

// get all voter data
const getAllVotersData = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    const voterAddresses = await contract.getVoterList();
    setVoterAddress(voterAddresses);

    // Fetch full voter data for each address
    const voterDetails = await Promise.all(
      voterAddresses.map(async (address) => {
        const singleVoterData = await contract.getVoterData(address);
        return singleVoterData;
      })
    );

    console.log("📌 Processed voter data:", voterDetails);

    setVoterArray(voterDetails); // 👉 UI updates properly now!

    const length = await contract.getVotersLength();
    setVoterLength(Number(length));

  } catch (err) {
    console.log("getAllVotersData error", err);
    setError("Error fetching voter data");
  }
};


// useEffect(()=>{
//   getAllVotersData();
// }, [])

  const giveVote = async (id)=>{
    try {
      
    } catch (error) {
      setError("Error giving vote");
      console.log("Error giving vote:", error);
    }
  }

  //---------------------------------- CANDIDATE SECTION ----------------------------------//

const setCandidate = async (candidateForm, fileUrl) => {
  try {
    console.log("🔥 set candidate called");

    const { name, address, age } = candidateForm;

    if (!name || !address || !age || !fileUrl) {
      setError("Please fill all the fields");
      console.log("Missing fields:", { name, address, age, fileUrl });
      return;
    }

    console.log("Form Input for candidate:", name, address, age, fileUrl);

    // connect wallet
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new BrowserProvider(connection);
    const signer = await provider.getSigner();
    // console.log(await signer.getAddress());
    const contract = fetchContract(signer);

    // console.log("Contract:", contract);
    // console.log(contract);
    // console.log(contract.interface.fragments.filter(f => f.type === "function"));

    const data = {
      name,
      address,
      image: fileUrl,
      age
    };

    const jsonUrl = await uploadJSONToPinata(data);

    // console.log("Metadata URL:", jsonUrl);
    const voter = await contract.setCandidate(address, age, name, fileUrl, jsonUrl);
    voter.wait();
    // console.log("Voter created successfully:", voter);

    router.push("/");

    // const tx = await contract.addVoter(name, address, position, fileUrl);
    // await tx.wait();
    
  } catch (err) {
    console.log("Create candidate error:", err);
    setError("Error creating candidate");
  }
};

const getNewCandidate = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    const allCandidateData = await contract.getCandidate();
    console.log("All candidate data:", allCandidateData);

    const candidates = await Promise.all(
      allCandidateData.map(async (el) => {
        const singleCandidateData = await contract.getCandidateDetails(el);
        return singleCandidateData;
      })
    );

    console.log("Processed candidates:", candidates);
    setCandidateArray(candidates); // 👈 THIS UPDATES UI!

    const allCandidateLength = await contract.getCandidateLength();
    setCandidateLength(Number(allCandidateLength));

  } catch (error) {
    console.log("Error fetching candidate data:", error);
    setError("Error fetching candidate data");
  }
};



useEffect(()=>{
  getNewCandidate();
}, [])

  return (
    <VotingContext.Provider value={{ VotingTitle, fetchContract, checkIfWalletIsConnected, connectWallet, uploadToIPFS, createVoter, getAllVotersData, giveVote, setCandidate, getNewCandidate, voterArray, voterLength, voterAddress, currentAccount, candidateLength, candidateArray }}>
      {children}
    </VotingContext.Provider>
  );
};
