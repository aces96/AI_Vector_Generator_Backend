const PromoCode = require('../models/promoCode.model')




exports.addPromoCode = async(req,res)=>{

    try {
        const promocode = new PromoCode({code: req.body.code})
        const save = await promocode.save()

        if(save){
            const allPromoCode = await PromoCode.find({})

                res.status(200).json({
                    done: true,
                    promocode: allPromoCode
                })
                
        }else{
            res.status(400).json({
                done: false
            })
        }
    } catch (error) {
        res.send(error)
    }
}


exports.getAllPromoCode = async(req,res)=>{

    try {
        const allPromoCode = await PromoCode.find({})

            if(allPromoCode){
                res.status(200).json({
                    done: true,
                    promocode: allPromoCode
                })
            }else{
                res.status(400).json({
                    done: false
                })
            }
    } catch (error) {
        res.send(error)
    }
}


exports.deletePromoCode = async(req,res)=>{

    try {
        const removePromo = await PromoCode.findOneAndRemove({code: req.body.code})
        const allPromo = await PromoCode.find({})

            if(removePromo){
                res.status(200).json({
                    done: true,
                    promocode: allPromo
                })
            }else{
                res.status(400).json({
                    done: false
                })
            }

            
    } catch (error) {
        res.send(error)
    }
}