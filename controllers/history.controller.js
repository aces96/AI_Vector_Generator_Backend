const History = require('../models/history.model')



exports.getHistoryByUser = async (req, res)=>{

    try {
        const history = await History.find({user: req.body.user})

        if(history){
            res.status(200).json({
                message: true,
                data: history
            })
        }else{
            res.status(400).json({
                message: false
            })
        }
    } catch (error) {
        res.status(400).send(400)
    }

}