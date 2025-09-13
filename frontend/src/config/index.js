import axios from "axios";
 const  clientServer=axios.create(
    {
        baseURL:"http://localhost:8080",
    }
);
export default clientServer;