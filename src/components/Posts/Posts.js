import React from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles.js";
import { useSelector } from "react-redux";

//need to fetch the data from global redux store

function Posts({setCurrentId}) {
  //state is the global store
  const posts = useSelector( (state) => state.posts );
  const classes = useStyles();
  {/*if no. of posts are 0 -> circularProgress otherwise display it in grid format*/}
  console.log(posts);
  return(
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {
            posts.map( (post) => (
              <Grid key={post._id} item xs={12} sm={6}>
                  <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ) )
          }
      </Grid>
    )
  );
};

export default Posts;
