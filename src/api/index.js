import axios from "axios";

const API = axios.create({ baseURL:"https://memories-mern-arshia.herokuapp.com/", headers: { 'Content-Type': 'application/json' } })

//http://localhost:5000/posts

//function which is going to happen on each one of our request
API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile'))
      {req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;}

  return req; //this is needed to make any request mentioned below
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/users/signin", formData); //fetches existingUser and token from server
export const signUp = (formData) => API.post('/users/signup', formData);
