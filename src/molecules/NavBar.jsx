import { Link } from "react-router-dom";
import web3funder from "../assets/images/web3funder.svg";
// import MobileMenu from "./MobileMenu";

function Navbar({ connectWallet, account }) {

  // async function getFundRaiserByAddress(address) {
  //   try {
  //     if (!weFunderContract) {
  //       alert("Please Connect Your Wallet at The Top of The Page")
  //       return 
  //     }
  //     const fundraisers = await weFunderContract.GetFundRaiserByAddress(address)
  //     console.log(fundraisers)
  //     setCampaigns(fundraisers)
  //   } catch (error) {
  //     //Verify How to Handle the Errors
  //     console.log(error)
  //   }
  // }

    return (
        <nav className="grid py-2 px-8 m:px-16 bg-white gap-2 h-16">

          <div className="grid grid-cols-4 gap-4 items-center justify-items-center">
            <div className="w-full cursor-pointer">
              <Link to="/">
                  <img className="w-full" src={web3funder} alt="web3funder logo" />
              </Link>
            </div>
            <button className="col-span-3 md:col-start-3 justify-self-end w-full md:w-auto" onClick={() => connectWallet()}>{account ? account : "Connect your wallet"}</button>
          </div>

          {/* <div className="grid grid-cols-6 justify-items-center">
              <input className="col-span-5 w-full" placeholder="Find a Campaign by ETH Address" />
              <button onClick={} className="grid justify-items-center justify-self-start items-center relative bg-[#6ccff6]">
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  width="40"
                  viewBox="0 0 100 100"
                >
                  <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" />
                </svg>
              </button>
            </div> */}
        {/* <MobileMenu /> */}
        {/* <img
          src={menu}
          alt="menu icon"
          onClick={() => {
            console.log("test");
          }}
          className="menu"
        /> */}
      </nav>
    )
}

export default Navbar