const Admin = require('../models/admin.model')




exports.getAdmin = async (req, res)=>{

    try {
        const getAdmin = await Admin.findOne({username: req.body.username})

                if(getAdmin.password == req.body.password){
                    res.status(200).json({
                        done: true,
                        user: getAdmin
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


exports.addAdmin = async (req,res)=>{
    try {
        const admin = new Admin({username: req.body.username, password: req.body.password})
        const save = await admin.save()

        res.json({
            user:save
        })
    } catch (error) {
        res.send(error)
    }
}