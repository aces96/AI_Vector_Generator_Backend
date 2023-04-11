const User = require('../models/user.model')
const History = require('../models/history.model')
const axios = require('axios')
const dotenv = require('dotenv').config();
const potrace = require('potrace');
const  https = require('https');
const fs = require('fs');






exports.generateVectors = async (req,res)=>{
    const basePrompt=`${req.body.prompt},(((lineart))),((low detail)),(simple),high contrast,sharp,2 bit, black or white, white background`
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
            "samples": "1",
            "num_inference_steps": "20",
            "seed": null,
            "guidance_scale": 7.5,
           "safety_checker":"no",
            "webhook": null,
            "track_id": null
        }, headers)

        console.log(generateVector.data.output);

        if(generateVector.data.output.length > 0){
            const client = await generateVector.data.output[0].startsWith('https') ? https : http;
            await client.get(generateVector.data.output[0], (response) => {
                const stream = fs.createWriteStream('image.png');
                response.pipe(stream);
                stream.on('finish', () => {
                  console.log(`Saved image.png to local disk`);
                });
              });

            await potrace.trace('../image.png', function(err, svg) {
                if (err) throw err;
                fs.writeFileSync('./output.svg', svg);
              });
              res.send("svg")

        }else {
            res.send(generateVector.data)
        }



        
    } catch (error) {
        res.send(error)
    }
}