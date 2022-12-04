import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ethers } from "ethers"

function Campaigns ({ weFunderContract, account, campaigns, setCampaigns }) {
    const [loading, setLoading] = useState(true)
    console.log(account)
    async function getAllCampaigns() {
        console.log("we are here")
        try {
          if (!weFunderContract) {
            alert("Please Connect Your Wallet at The Top of The Page")
            return 
          }
          const campaigns = await weFunderContract.GetAllFundRaisers()
          console.log(campaigns)
          setCampaigns(campaigns)
          setLoading(false)
        } catch (error) {
          //Verify How to Handle the Errors
          console.log(error)
        }
      }
    useEffect(() => {
        if (!weFunderContract) {
            return
        }
        getAllCampaigns()
    }, [account])
    if (!account) {
        return (
            <div className="m-16 font-bold text-xl">
                You Need To Have an Account to View Available Campaigns, Connect Your Wallet Above
            </div>
        )
    }
    if (loading) {
        return (
            <div className="m-16 font-bold text-xl">
                Loading...
            </div>
        )
    }
    return (
        <div className="m-16">
            {
            campaigns.length < 1 ?
            <div className="font-bold text-xl">
                No Active Campaigns, The World is Perfect Right Now
            </div>
            :
            <div className="grid gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {
                campaigns.map((campaign) => {
                    console.log(campaign)
                    return (
                        <div className="mb-6 p-4 hover:cursor-pointer rounded-md border-sky-400 border-2 w-full hover:bg-blue-100" key={campaign.id.toNumber()}>
                            <Link to={`/campaigns/${campaign.id.toNumber()}`}>
                                <div className="mb-4 rounded-xl overflow-hidden h-72">
                                    <img className="w-full h-full" src={campaign.images} alt={campaign.title} />
                                </div>
                                <h4 className="font-bold text-xl">{campaign.title}</h4>
                                <p className="font-bold">{ethers.utils.formatEther(campaign.target)} Matic</p>
                            </Link>
                        </div>
                    )
                })
                }
            </div>
            }
        </div>
    )
}

export default Campaigns;

