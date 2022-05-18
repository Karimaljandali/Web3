// import Head from 'next/head'
import Header from "/components/Header";
import Banner from "/components/Banner";
import Footer from "/components/Footer";
import Switch from "/components/alerts/SwitchNetwork";
import Confirmation from "/components/alerts/Confirmation";

import { ethers } from "ethers";
import { contractAddress } from "../config";
import { useEffect, useState } from "react";

import kLoot from "/abi/kLoot.json";

export default function Home() {

  // Contains reference to the Contract Object
  const [tokenContract, setContract] = useState("");

  // Contains the amount of NFT's minted
  const [totalMinted, setMinted] = useState("");

  // Contains the status of the NFT transaction while pending. ( Used for disabling the button while NFT is processing )
  const [loading, setLoading] = useState(false);

  // Contains the amount of NFT's the user wants to mint.
  const [mintAmount, setMintAmount] = useState(1);

  // Contains the status of the completion of the NFT mint. (Used for the Banner confirmation popup)
  const [mintCompleted, setMintCompleted] = useState(false);

  // Contains the link to the Etherscan transaction.
  const [etherscan, setEtherscan] = useState('')

  // Flag to see if we are on the correct network
  const [network, setNetwork] = useState(false)

  // Utility functions to call states from components.
  const dismiss = () => { setMintCompleted(false) }
  const incrementMint = () => { if(mintAmount < 5) { setMintAmount(mintAmount + 1) } }
  const decrementMint = () => { if(mintAmount > 1){ setMintAmount(mintAmount - 1) } }

  /**
   * This function mints a user's NFT
   */
  const mintNft = async () => {
    // Attempt to switch network to ETH mainnet if necessary
    switchNetwork();

    try {
      setLoading(true)

      // Mint NFTs and return etherscan transaction hash.
      const tx = await tokenContract.claim( mintAmount );
      await tx.wait();
      const etherscanLink = "https://rinkeby.etherscan.io/tx/" + tx.hash;
      

      setEtherscan(etherscanLink)
      setMintCompleted(true)
      setLoading(false)
      checkMinted()

    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  };

  /**
   * This function checks the amount of NFT's minted from the contract's totalsupply and sets the state variable.
   */
  const checkMinted = async () => {
    try {
      const rawSupply = await tokenContract.totalSupply();
      const supply = rawSupply.toString();
      setMinted(supply);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * This function checks the user's current network set in Metamask and attempts to switch them to mainnet.
   */
  const switchNetwork = async () => {
    const { ethereum } = window;

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
      setNetwork(true)
    } catch (error) {
      console.log(error);
    }
    // handle other "switch" errors
  };

  /**
   * On the first load of the DOM, the metamask and ethers configurations are setup as well as the instantiation of the contract Object.
   */
  useEffect(() => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const localContract = new ethers.Contract(
      contractAddress,
      kLoot.abi,
      signer
    );
    setContract(localContract);
    // Wait a second before checking minted

    setTimeout(() => {}, 1000);
  }, []);

  /**
   * Whenever the tokenContract state variable is updated, checkMinted is called to re-render the amount of NFT's minted.
   */
  useEffect(() => {
    checkMinted();
  }, [tokenContract]);

  return (
    <div className="site-wrapper">
      <Header switchNetwork={switchNetwork}/>
      <Banner mintnft={mintNft} totalminted={totalMinted} loading={loading} incrementMint={incrementMint} decrementMint={decrementMint} mintAmount={mintAmount} />
      { mintCompleted === true ? (
        <Confirmation etherscanLink={etherscan} dismiss={dismiss} />
      ) : '' }
      <Footer />
    </div>
  );
}
