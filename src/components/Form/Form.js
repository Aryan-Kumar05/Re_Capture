import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import { TextField, Typography, Button, Paper } from "@material-ui/core"
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts"

function Form({currentId, setCurrentId}) {

    const [postData, setPostData] = useState({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });

  const post = useSelector( (state) => currentId ? state.posts.find( (p) => p._id === currentId ) : null );
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")); //gets the user

  //using it to populate the fields of the form.. so that user does not have to type everything again in the name of updation
  useEffect(()=>{
    if(post)
       setPostData(post);
  }, [post]); //second parameter is called a dependency array, tells when the callback function should run
                            //2nd para value changes from null to the value of udated post

 const handleSubmit = (e) => {
   e.preventDefault();

   if(currentId){ //if the currentId is not null we will update
     dispatch( updatePost(currentId, {...postData, name: user?.result?.name})); //in the () the action that is to be taken is defined
   }                                             //after this define function in api/index.js and actions/posts.js
   else{
     dispatch( createPost({...postData, name: user?.result?.name}) );
   }
   clear();
   //window.location.reload();
 }

 const clear = () => {
   setCurrentId(null);
   setPostData({
     title: '',
     message: '',
     tags: '',
     selectedFile: ''
   });
 }

 if(!user?.result?.name){
   return (
     <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
           Please Sign in to create your own memories and like other's memories
        </Typography>
     </Paper>
   )
 }

  return(
    <>
       <Paper className={classes.paper}>
          <form autocomplete="off" noValidate className={`${classes.root} ${classes.form}`} >
             <Typography variant='h6'>{ currentId ? "Editing" : "Creating" } a Memory</Typography>
             <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value}) } />
             <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value}) } />
             <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')}) } />
             <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
             <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" onClick={handleSubmit} fullWidth>Submit</Button>
             <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
          </form>
       </Paper>
    </>
  )
}

export default Form;
