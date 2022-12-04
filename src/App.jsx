import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./molecules/NavBar";
import WeFunderAbi from "./assets/WeFunder.json";
import Campaigns from "./pages/Campaigns";
import "./App.css";
import Campaign from "./pages/Campaign";
import { addToLocalStorage, getFromLocalStorage } from "./utils/local-strorage";

function App() {
  const [account, setAccount] = useState("");
  const [campaigns, setCampaigns] = useState();
  const [donated, setDonated] = useState(false);
  const [weFunderContract, setWeFunderContract] = useState(null);
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  async function loadEthereum() {
    if (window.ethereum) {
      return window.ethereum;
    }
    return null;
  }

  async function connectWallet() {
    const ethereum = await loadEthereum();
    if (!ethereum) {
      alert("Please Install the Metamask Extension");
      return null;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const accounts = await provider.send("eth_requestAccounts", []);
    const chainId = await signer.getChainId();
    if (accounts.length < 1) {
      alert("Please Install the Metamask Extension");
      throw new Error("Please Install the Metamask Extension");
    }
    if (chainId != 80001) {
      alert("Please Collect to the Polygon Mumbai Testnet in Metamask");
      throw new Error(
        "Please Collect to the Polygon Mumbai Testnet in Metamask"
      );
    }
    const activeAccount = accounts[0];
    setAccount(activeAccount);
    const contract = await new ethers.Contract(
      contractAddress,
      WeFunderAbi.abi,
      signer
    );
    setWeFunderContract(contract);
  }

  useEffect(() => {
    if (weFunderContract != null) {
      weFunderContract.on("DonationSuccessful", (owner, amount, target) => {
        console.log(owner, amount, target);
      });
      weFunderContract.on("Transfer", async (owner, target, tokenId) => {
        let myNfts = getFromLocalStorage("myNfts");
        console.log(myNfts, "weup");
        alert(
          `Thanks For the Donation \n Your Complementary NFT is at: \n https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenId}`
        );
        if (!myNfts) {
          await addToLocalStorage("myNfts", [
            `https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenId}`,
          ]);
          return;
        }
        await addToLocalStorage("myNfts", [
          ...myNfts,
          `https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenId}`,
        ]);
      });
      weFunderContract.on("FundRaiserCreated", (owner, _) => {
        alert(`Fund Raiser Campaign Created By ${owner}`);
      });
    }
  }, [donated]);

  return (
    <BrowserRouter>
      <Navbar connectWallet={connectWallet} account={account} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage weFunderContract={weFunderContract} donated={donated} />
          }
        />
        <Route
          path="/campaigns/:campaignId"
          element={
            <Campaign
              weFunderContract={weFunderContract}
              campaigns={campaigns}
              setDonated={setDonated}
              donated={donated}
            />
          }
        />
        <Route
          path="/campaigns"
          element={
            <Campaigns
              weFunderContract={weFunderContract}
              account={account}
              campaigns={campaigns}
              setCampaigns={setCampaigns}
            />
          }
        />
        <Route
          path="*"
          element={
            <div>
              <h1>This path does not exist</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
