import { redirect, useParams } from "react-router-dom"
import { ethers } from "ethers"
import { useState } from "react"

function Campaign({ campaigns, weFunderContract, setDonated, donated }) {
    const [donation, setDonation] = useState("")

    const params = useParams()
    let campaignId = 0
    if (params.campaignId !== undefined) {
        campaignId = parseInt(params.campaignId)
    }
    if (!campaigns) {
        return
    }
    let campaign = campaigns.find(campaign => campaign.id == campaignId)

    async function donateToFundRaiser(fundRaiserId, amount) {
        try {
            if (!weFunderContract) {
                alert("Please Connect Your Wallet at The Top of The Page")
                return 
            }
            const tx = await weFunderContract.DonateToFundraiser(fundRaiserId, {
                value: ethers.utils.parseEther(amount)
            })
            console.log(tx, "tx")
            alert("Your Donation is Being Processed. Kindly Check The Home Page For A Link To Your Donors NFT. NFT's Might Not Always Reflect Immediately")
            setDonated(!donated)
        } catch(error) {
            console.log(error)
            if (error.message = `"[ethjs-query] while formatting outputs from RPC '{…e":-32000,"message":"transaction underpriced"}}}'"`) {
                alert("Increase Your Gas Fee Bruv, Markets Choke Right Now")
                return
            }
            if (error.error.data.message == "execution reverted: Lol, You can't donate nothing bruv") {
                alert("You Can't Donate Nothing Bruv, Select an Amount to Donate")
                return
            }
            alert("Error Processing Request: Go To Home, Refresh And Try Again. Ensure Sufficient Funds")
        }
    }
    if (campaign == undefined) {
        return <div><h2>This Campaign Does Not Exist</h2></div>
    }
    return (
        <div className="m-16 grid relative md:mx-56 lg:mx-96"> 
            <div className="mb-4 rounded-xl overflow-hidden h-80">
                <img className="w-full h-full" src={campaign.images} alt={campaign.title} />
            </div>
            <div className="grid gap-2">
                <h3 className="font-bold text-lg">{campaign.title}</h3>
                <p>{campaign.description}</p>
                <h5 className="font-semibold">{campaign.tag}</h5>
                <h5 className="font-bold text-lg">Target: {ethers.utils.formatEther(campaign.target)} Matic</h5>
                <h5 className="font-bold text-lg">Total Donations: {ethers.utils.formatEther(campaign.totalDonations)} Matic</h5>
            </div>
            <div className="absolute bottom-52 text-center grid w-full bg-blue">
                <input className="p-2 text-black font-bold placeholder:text-blue-900" value={donation} onChange={(e) => setDonation(e.target.value)} type="number" placeholder="Enter Your Donation in Matic Here"/>
                <button className="p-2 bg-blue-800 text-white font-extrabold text-lg rounded-md hover:text-blue-800 hover:bg-blue-200" onClick={() => donateToFundRaiser(campaignId, donation)}>Donate Now</button>
            </div>
        </div>
    )
}

export default Campaign