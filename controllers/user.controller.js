const User = require("../models/user.model")




exports.updateUserTokens = async (req, res)=>{

    try {
        const user = await User.findById(req.body.id)

        if (user) {
            const updateUser = await User.findOneAndUpdate({_id: req.body.id}, {tokens: user.tokens+req.body.tokens, bundle: req.body.bundle})
            const user = await User.findById(req.body.id)
                if (updateUser) {
                    res.status(200).json({
                        message: true,
                        user: user
                    })
                    
                }else {
                    res.status(400).json({
                        message: false,
                        data: updateUser,
                        user: user
                    })
                }
        }else {
            res.status(400).json({
                message: false,
            })
        }
    } catch (error) {
        res.status(400).send(error)
    }
}


exports.reduceUserTokens = async  (id)=>{
    try {
        const user = await User.findById(id)

        if (user) {
            const updateUser = await User.findOneAndUpdate({_id: id}, {tokens: user.tokens-1})
                if (updateUser) {
                    return updateUser
                    
                }else {
                    return updateUser
                }
        }else {
            return user
        }
    } catch (error) {
        return error
    }
}