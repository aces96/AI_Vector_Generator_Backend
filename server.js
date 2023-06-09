const mongoose = require('mongoose');
const express = require('express');
// const session = require("express-session");
const dotenv = require('dotenv').config();
const session = require('express-session')
const cors = require('cors');
const strategie = require("./auth/passport.linkedin")
const googleStategie = require('./auth/passport.google')
const facebookStategie = require('./auth/passport.facebook')
const GenerateVectorRouter = require('./router/generateRouter')
const HistoryRouter = require('./router/history.router')
const UserRouter = require('./router/user.router')
const stripeRouter = require('./router/stripe.router')
const promoCodeRouter = require('./router/promocode.router')
const adminRouter = require('./router/admin.router')

// const passport = require("passport");

const app = express();

app.use(session({secret: 'jhksdhkdjhfkjdhf'}))







app.use(cors());

app.options('*', cors());
//express session
// app.use(
//     session({
//       secret: "secret",
//       resave: false,
//       saveUninitialized: false,
//     })
//   );

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use(passport.initialize());
// require("./auth/google.auth")(passport);
app.use("/auth", require('./router/linkedin.auth'))
app.use("/auth", require('./router/google.auth'))
app.use("/auth", require('./router/facebook.auth'))



app.use('/api', GenerateVectorRouter)
app.use('/api', HistoryRouter)
app.use('/api', UserRouter)
app.use('/api', stripeRouter)
app.use('/api', promoCodeRouter)
app.use('/api', adminRouter)






// app.use('/api/room', roomRouter);


const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB).then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => `Server is running on port ${PORT}`);
    console.log('Connection Successed !!');
    console.log(`Server is running on port ${PORT}`);
}).catch(err => {
    console.log(err);
});