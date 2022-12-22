import express from 'express'
import passport from 'passport'
import passportFacebook from 'passport-facebook'
const FacebookStrategy = passportFacebook.Strategy
import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config


export const facebookRoute = express.Router();
facebookRoute.use(session({secret:"secret"}))
facebookRoute.use(passport.initialize())
facebookRoute.use(passport.session())
passport.serializeUser(function(user,cb){
	cb(null,user)
})

passport.deserializeUser(function(obj:string,cb){
	cb(null,obj)
})

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: process.env.SECRETS!,
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken:any, refreshToken:any, profile:any, done:any) {
 		console.log(profile, accessToken, refreshToken);
 		return done(null,profile) 

    }
));

facebookRoute.get('/',passport.authenticate('facebook'));

facebookRoute.get('/secrets',
  passport.authenticate('facebook', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/facebook/profile');
  });

  facebookRoute.get("/failed",(req,res)=>{
	res.send("YOUR FAILED LOGIN !!!")
})

facebookRoute.get("/profile",(req,res)=>{
	console.log(req.user)
	res.send("successs login " + JSON.stringify(req.user))
})
// // NOW FOR LOGOUT USER

// facebookRoute.get("/logout",(req,res)=>{
// 	req.session.destroy(function(err){
// 		res.clearCookie('connect.sid')
// 		res.send(" YOUR LOGOUT Now")
// 	})
// })
// // THANKS FOR WATCH
// app.listen(5173,()=>console.log("server at 5173"))
