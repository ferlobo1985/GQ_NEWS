import axios from 'axios'

axios.defaults.baseURL = '/graphql';
axios.defaults.method = 'POST';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const signupUser = async(userData)=>{
    try{
        console.log(userData);

      //  const { } = await axios()
        

    } catch(error){
        console.log(error);
    }

}