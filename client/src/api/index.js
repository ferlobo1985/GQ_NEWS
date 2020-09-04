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


export const updateUserEmailPass  = async(email,password,id)=>{ 
    try{
        const { data } = await axios({data:{
            query:`mutation{
                updateUserEmailPass(
                    email:"${email}"
                    password:"${password}"
                    _id:"${id}"
                ){
                    _id
                    token
                    email
                }
            }`
        }});

        if(data.errors){
            return { errors:data.errors}
        } else {
            localStorage.setItem('X-AUTH', data.data.updateUserEmailPass.token);
        }
        return  {
            auth: data.data ? data.data.updateUserEmailPass : null
        }
    } catch(err){
        console.log(err)
    }

}



export const getUserStats  = async(id)=>{ 
    try{
        const body = {
            query:`
                query User($id:ID!,$sort:SortInput){
                    user(id:$id){
                        name
                        lastname
                        posts(sort:$sort) { _id, title}
                        categories { name }
                    }
                }
            `,
            variables:{
                id:id,
                sort: { sortBy: "_id", order: "desc",limit: 3 }
            }
        };

        const { data } = await axios({
            data:JSON.stringify(body)
        })
        return {
            stats:data.data ? data.data.user :null
        }
    } catch(err){
        console.log(err)
    }
}
