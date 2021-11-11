import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import { Button, Avatar, Paper, Grid, Container, Typography } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import dotenv from "dotenv";
import useStyles from "./styles.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import {useDispatch} from "react-redux";
import {signin, signup} from "../../actions/auth";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword:""};

function Auth() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData,setFormData] = useState(initialState); //keeping track of any info that changes in the form

  const handleShowPassword = () => {
    setShowPassword( (prevShowPassword) => !prevShowPassword); //(prevShowPassword) => !prevShowPassword
  }

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try{
      dispatch({ type:"AUTH", data:{result, token} });
      history.push("/");
    }
    catch(error){
      console.log(error);
    }
  }

  const googleFailure = (error) => {
    console.log(error);
  }

  const handleSubmit = (e) => { //is triggered when sign-in/sign-up button is clicked
    e.preventDefault();
    if(isSignUp){
      //if the user clicks on the button that reads SIGN UP
      console.log("in auth comp");
      dispatch(signup(formData, history));
    }else{
      //if the user clicks on the button that reads SIGN IN
      dispatch(signin(formData, history));
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  return(
    <div>
      <Container component="main" maxWidth="xs">
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {
                    isSignUp && (
                      <>
                         <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                         <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                      </>
                    )
                  }
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                  {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
               </Grid>
               <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                  {isSignUp ? "Sign Up" : "Sign In"}
               </Button>
               <GoogleLogin
                  clientId={process.env.REACT_APP_CLIENT_ID}
                  render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" variant="contained" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>
                       Google Sign In
                    </Button>
                  )}
                  onSuccess={googleSuccess} //success handler
                  onFailure={googleFailure} //failure handler
                  cookiePolicy="single_host_origin"
               />
               <Grid container>
                  <Grid item justify="center" >
                     <Button onClick={switchMode}>
                        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up!"}
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
      </Container>
    </div>
  );
}

export default Auth;
