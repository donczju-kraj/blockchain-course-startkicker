'use client';
import { useState, useEffect } from 'react';
import Web3 from 'web3';

export default function useWeb3() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts"});
      
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
  }, []);
  return web3;
}