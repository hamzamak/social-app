# social-app
full stack MERN social media app 


## Demo
Click the following link to view a demo : [live demo](memories-hamzamak.vercel.app)

## Installation

you will need to install the packages for react
```bash
  cd client
  npm install --legacy-peer-deps
  npm start 
```
and for Node.js
```bash
  cd server
  npm install 
  npm start 
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
- in server directory

`PORT` 
`MONGODB_URL`
`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_CLOUD_API_KEY`
`CLOUDINARY_CLOUD_API_SECRET`

But first sign in with [cloudinary](https://cloudinary.com/) to get your key api , cloud name and api secret

- in client directory

`REACT_APP_GOOGLE_AUTH_CLIENT_ID` 

you need to get your client ID from Google console . visit the [site](https://console.cloud.google.com/)
