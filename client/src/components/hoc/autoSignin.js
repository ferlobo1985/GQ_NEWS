import React ,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { autoSignIn } from '../../store/actions';

const AutoSign = (props) => {
    const [ loading,setLoading ] = useState(true)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(autoSignIn()).then(()=>{
            setLoading(false);
        })
    },[dispatch])


    if(loading){
        return(
            <div className="main_loader">
                <div className="lds-heart"><div></div></div>
            </div>
        )
    } else{
        return(
            <>
                {props.children}
            </>
        )
    }
    

}

export default AutoSign;