export default function(state={},action){
    switch(action.type){
        case 'AUTH_USER':
            return {...state, ...action.payload }
        default:
            return state;
    }
}