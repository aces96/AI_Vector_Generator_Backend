const User = require('../models/user.model')
const History = require('../models/history.model')
const axios = require('axios')
const dotenv = require('dotenv').config();




exports.generateVectors = async (req,res)=>{
    const basePrompt=`${req.body.prompt},(((lineart))),((low detail)),(simple),high contrast,sharp,2 bit, ((technical vector graphic))`
    const baseNegativePrompt="(((text))),((color)),(shading),background,noise,dithering,gradient,detailed,out of frame,ugly,error,Illustration, watermark"
    const headers = {
        'Content-Type': 'application/json',
    }

    try {
        const generateVector = await axios.post("https://stablediffusionapi.com/api/v3/text2img", {
            "key": process.env.STABLE_DIFFUSION_KEY,
            "prompt": basePrompt,
            "negative_prompt": baseNegativePrompt,
            "width": "512",
            "height": "512",
            "samples": "3",
            "num_inference_steps": "20",
            "seed": null,
            "guidance_scale": 7.5,
           "safety_checker":"yes",
            "webhook": null,
            "track_id": null
        }, headers)

        console.log(generateVector.data.ouput);


        res.send(generateVector.data.output)

        
    } catch (error) {
        res.send(error)
    }
}