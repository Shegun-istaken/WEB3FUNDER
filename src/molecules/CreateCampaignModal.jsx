import { useState } from "react"
import { ethers } from "ethers"

function CreateCampaignModal({ weFunderContract, setIsActiveModal }) {
    const [imageFiles, setImageFiles] = useState(null)
    const [campaign, setCampaign] = useState({
        target: "", 
        title: "", 
        tag: "", 
        description: "", 
        image: ""
    })
    const handleCampaignChange = (e, inputName) => {
        setCampaign({...campaign, [inputName]: e.target.value})
    }

    async function createFundRaiser(target, title, tag, description, image) {
        try {
          if (!weFunderContract) {
            alert("Please Connect Your Wallet at The Top of The Page")
            return 
          }
          const result = await weFunderContract.CreateFundRaiser(target, title, tag, description, image)
          console.log(result)
        } catch (error) {
          //Verify How to Handle the Errors
          console.log(error)
        }
      }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        let link = ""
        try {
            const formData = new FormData()
            if (imageFiles != null) {
                for (let i = 0; i < imageFiles.length; i++) {
                    let imageFile = imageFiles[i]
                    formData.append("file", imageFile)
                    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_KEY)
                    formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
    
                    const data = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                        method: "post",
                        body: formData,
                    })
                    const resp = await data.json()
                    console.log(resp)
                    link = resp.url
                }
            }
            if (link.length <= 0) {
                throw new Error("Your Image File(s) Could not Be Uploaded")
            }
            console.log(campaign)
            console.log(link)
            await createFundRaiser(
                ethers.utils.parseEther(campaign.target),
                campaign.title,
                campaign.tag,
                campaign.description,
                link
            )
            setIsActiveModal(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className="absolute right-0 top-0 p-4">
                <button onClick={() => setIsActiveModal(false)} className="text-xl p-2 rounded font-bold hover:bg-white">X</button>
            </div>
            <form onSubmit={e => handleFormSubmit(e)} method="post" encType="multipart/form-data" className="grid gap-6 my-4">
                <input className="p-2 text-black font-bold placeholder:text-blue-900" value={campaign.title} onChange={e => handleCampaignChange(e, "title")} placeholder="Title" required={true} />
                <input className="p-2 text-black font-bold placeholder:text-blue-900" value={campaign.description} onChange={e => handleCampaignChange(e, "description")} placeholder="Description || e.g Save The Animals"/>
                <input className="p-2 text-black font-bold placeholder:text-blue-900" value={campaign.target} onChange={e => handleCampaignChange(e, "target")} placeholder="Donation Target" type="number" required={true} />
                <input className="p-2 text-black font-bold placeholder:text-blue-900" value={campaign.tag} onChange={e => handleCampaignChange(e, "tag")} placeholder="Tag || e.g Luxury"/>
                <div className="grid gap-2">
                    <label htmlFor="files[]">Upload Images</label>
                    <input onChange={e => setImageFiles(e.target.files)} type="file" name="files[]" multiple={false} required={true} />
                </div>
                <button className="p-2 bg-blue-800 text-white font-extrabold text-lg rounded-md">Create Campaign</button>
            </form>
        </div>
    )
}

export default CreateCampaignModal