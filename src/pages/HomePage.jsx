import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateCampaignModal from "../molecules/CreateCampaignModal";
import { getFromLocalStorage } from "../utils/local-strorage";

function HomePage({ weFunderContract, donated }) {
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [myNfts, setMyNfts] = useState([""])

  useEffect(() => {
    const myNfts = getFromLocalStorage("myNfts")
    console.log(myNfts)
    if (!myNfts) {
      return
    }
    setMyNfts(myNfts)
  }, [])
  return (
    <div>
      <header>
        <div className="header-content">
          <div className="title">
            <h1>Your Home for Help</h1>
          </div>
          <button onClick={() => setIsActiveModal(true)}>Start a Crowdfunding Campaign</button>
          <Link to={"/campaigns"}><button>Contribute </button></Link>
        </div>
        <div className="absolute bottom-8 w-3/6 left-5 bg-[#6ccff6] p-2">
          <h2 className="text-lg font-bold">Your NFT's</h2>
          {
            myNfts.length > 0 ?
            <div>
              {
                myNfts.map((myNft) => {
                  return (
                    <p className="truncate ..."><a href={myNft}>{myNft}</a></p>
                  )
                })
              }
            </div>
            :
            <h3>You Have No Donor NFTs Yet</h3>
          }
        </div>
      </header>
      <main>
        <div className={`fixed transition-all ease-in duration-1000 ${isActiveModal ? "top-20" : "top-[-1000px]"} left-0 z-10 bg-blue-50/[75] w-full p-16`}>
          <CreateCampaignModal weFunderContract={weFunderContract} setIsActiveModal={setIsActiveModal}/>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
