import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "fcdd4ea3aaaa4825850a829b1ac079cb";
const redirectUri = "http://localhost:5173";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
//token is needed for api calls 


const apiClient=axios.create({
    baseURL:"https://api.spotify.com/v1",
})


const setClientToken=(token)=>{
    apiClient.interceptors.request.use(async (config)=>{
        config.headers.Authorization=`Bearer ${token}`;
        return config;

    })
}

export {setClientToken,apiClient};