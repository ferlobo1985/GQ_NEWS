import axios from 'axios'

axios.defaults.baseURL = '/graphql';
axios.defaults.method = 'POST';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('X-AUTH');
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const signupUser = async(userData)=>{
    try{
        const { data } = await axios({data:{
            query:`mutation{
                signUp(
                    fields:{
                        email:"${userData.email}"
                        password:"${userData.password}"
                    }
                ){
                    _id
                    email
                    token
                }
            }`
        }});

        return {
            auth: data.data ? data.data.signUp : null,
            errors: data.errors
        }
    } catch(error){
        console.log(error);
    }

}

export const loginUser = async(userData)=>{
    try{
        const { data } = await axios({data:{
            query:`mutation{
                authUser(fields:{ email:"${userData.email}", password:"${userData.password}" }){
                    _id, email, token
                }
            }`
        }});

        return {
            auth: data.data ? data.data.authUser : null,
            errors: data.errors
        }
    } catch(error){
        console.log(error);
    }

}


export const autoSignIn = async()=>{
    try{
        const { data } = await axios({
            data:{
                query:`query{ isAuth{ _id, email, token}}`
            }
        });
        if(data.errors) localStorage.removeItem('X-AUTH');
        return {
            auth: data.data ? data.data.isAuth : null
        }
    } catch(err){
        console.log(err)
    }
}
