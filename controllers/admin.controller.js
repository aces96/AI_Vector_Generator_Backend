const Admin = require('../models/admin.model')




exports.getAdmin = async (req, res)=>{

    try {
        const getAdmin = await Admin.findOne({username: req.body.username})

            if(getAdmin){
                if(getAdmin.password == req.body.password){
                    res.status(200).json({
                        done: true,
                    })
                }else{
                    res.status(400).json({
                        done: false
                    })
                }
            }
    } catch (error) {
        res.send(error)
    }
}