import React, {useState, useEffect} from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import {Link, useHistory, useLocation} from "react-router-dom";
import useStyles from "./styles.js";
import decode from "jwt-decode";
import {useDispatch} from "react-redux";
import memories from "../../images/recapture.jpeg";

function Navbar() {

  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  console.log(user);

  const logout = () => {
    //we need to dispatch an action when logout button is clicked
    dispatch({ type:"LOGOUT" });
    history.push("/");
    setUser(null);
  }

  useEffect( () => {
    //check for token when signed in with google
    const token = user?.token; //checking if token exists -> send it to token variable
    //if the token does not exist logout the user
    if(token){
      const decodedToken = decode(token); //this tells us when the token will expire
      if(decodedToken.exp *1000 < new Date().getTime()) logout();
    }
    //check for JWT if signed in manually

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);  //when location changes trigger use effect

  return(
    <AppBar className={classes.appBar} position="static" color="inherit">
       <div className={classes.brandContainer}>
           <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">ReCapture</Typography>
           <img src={memories} className={classes.image} alt="memories-img" height="60" />
       </div>
       <Toolbar className={classes.toolbar}>
           {/*contains logic depending upon if the user is logged in or not*/
             user ? (
               //if user is logged in then do this
               <div className={classes.profile}>
                   <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgUrl}>{user.result.name.charAt(0)}</Avatar>
                   <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                   <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
               </div>
             ) : (
               //if the user isn't logged in show this
               <Button variant="contained" color="primary" component={Link} to="/auth">Sign-in</Button>
             )
           }
       </Toolbar>
    </AppBar>
  );
}

export default Navbar;
