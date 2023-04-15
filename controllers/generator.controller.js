const User = require('../models/user.model')
const History = require('../models/history.model')
const axios = require('axios')
const dotenv = require('dotenv').config();
const potrace = require('potrace');
const  https = require('https');
const fs = require('fs');
const { randomBytes } = require('crypto');
const {reduceUserTokens} = require('./user.controller')

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
            "samples": "3",
            "num_inference_steps": "20",
            "seed": null,
            "guidance_scale": 7.5,
           "safety_checker":"no",
            "webhook": "http://localhost:8080/api/generateVector",
            "track_id": null
        }, headers)

        

        console.log(generateVector.data.output);

        let imgs = [];
        if(generateVector.data.output.length > 0){
                let hst
            const promises = generateVector.data.output.map((e, index) => {
                const client =  e.startsWith('https') ? https : http;
                return new Promise((resolve, reject) => {
                    client.get(e, async (response) => {
                        const stream = await fs.createWriteStream(`img${index}.png`);
                        await response.pipe(stream);
                        await stream.on('finish',   () => {
                            console.log(`Saved image.png to local disk`);
                            potrace.trace(`img${index}.png`, function(err, svg) {
                                if (err){
                                    reject(err);
                                }else{

                                    console.log('yoooooooooow', svg);
                                    const history = new History({prompt: req.body.prompt, images: svg, user: req.body.user})
                                    const hstr =  history.save();
                                    hst = hstr
                                    fs.unlink(`img${index}.png`, (err, res)=>{
                                        if(err) reject(err);
                                        console.log('image delete', res);
                                    });
                                    imgs.push(svg);
                                    resolve();
                                }
                            });
                        });
                    });
                });
            });

            Promise.all(promises)
                .then(async () => {
                    const userUpdate = await reduceUserTokens(req.body.user)
                    res.status(200).json({
                        history: hst,
                        images: imgs,
                        user: userUpdate
                    });
                    
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send(err);
                });
        } else {
            res.send(generateVector.data);
        }
    } catch (error) {
        res.send(error);
    }
}
