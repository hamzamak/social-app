import axios from 'axios';
                                    // http://localhost:5000 for development 
const API = axios.create({baseURL: 'https://memory-3mau.onrender.com'})

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile'))  {
         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req ;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (SearchQuery) => API.get(`/posts/search?searchQuery=${SearchQuery.search || 'none'}&tags=${SearchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);


export const signIn = (formData) => API.post(`/users/signin`,formData);
export const signUp = (formData) => API.post(`/users/signup`,formData);