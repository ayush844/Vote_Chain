"use client";

import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/navigation"; // ✅ for App Router (instead of next/router)
import axios from "axios";
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

  // ✅ Initialize IPFS only on the client side
  useEffect(() => {
    const initIpfs = async () => {
      if (typeof window !== "undefined") {
        const { create } = await import("ipfs-http-client");
        const client = create({
          url: "https://ipfs.infura.io:5001/api/v0",
        });
        setIpfsClient(client);
      }
    };
    initIpfs();
  }, []);

  // ✅ Prepare contract fetcher (kept the same)
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(VotingAddress, VotingABI, signerOrProvider);


  // upload to ipfs

   const uploadToIPFS = async (file) => {
    try {
      const added = await ipfsClient.add({ content: file });

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error uploading file to IPFS: ");
    }
   }


  return (
    <VotingContext.Provider value={{ VotingTitle, ipfsClient, fetchContract, checkIfWalletIsConnected, connectWallet, uploadToIPFS }}>
      {children}
    </VotingContext.Provider>
  );
};
