export default function(state={},action){
    switch(action.type){
        case 'AUTH_USER':
            return {...state, ...action.payload }
        case 'USER_STATS':
            return {...state, ...action.payload }
        case 'LOGOUT_USER':
            return { auth: action.payload }
        default:
            return state;
    }
}