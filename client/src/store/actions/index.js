import * as api from '../../api';

export const signupUser = (userData) => ({
    type:'AUTH_USER',
    payload: api.signupUser(userData)
});


export const loginUser = (userData) => ({
    type:'AUTH_USER',
    payload: api.loginUser(userData)
});

export const autoSignIn = () => ({
    type:'AUTH_USER',
    payload: api.autoSignIn()
});

export const logoutUser = () => {
    localStorage.removeItem('X-AUTH');
    return {
        type:'LOGOUT_USER',
        payload: null
    }
}


export const updateUserEmailPass = (email,password,id) => ({
    type:'AUTH_USER',
    payload: api.updateUserEmailPass(email,password,id)
})


export const getUserStats = (id) => ({
    type:'USER_STATS',
    payload: api.getUserStats(id)
})

export const createPost = (args) => ({
    type:'CREATE_POST',
    payload: api.createPost(args)
});

export const clearCreatedPost = () => ({
    type:'CREATE_POST',
    payload: { createdPost:null }
})

export const getUserPosts = (sort,prevState, id) => ({
    type:'USER_POSTS',
    payload: api.getUserPosts(sort,prevState, id)
})

export const updatePostStatus = (status,postId,state) => ({
    type:'UPDATE_POST',
    payload: api.updatePostStatus(status,postId,state)
})