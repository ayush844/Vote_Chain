"use client";

import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { VotingAddress, VotingABI } from "./constants";

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
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(VotingAddress, VotingABI, signerOrProvider);


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


  return (
    <VotingContext.Provider value={{ VotingTitle, fetchContract, checkIfWalletIsConnected, connectWallet, uploadToIPFS }}>
      {children}
    </VotingContext.Provider>
  );
};
