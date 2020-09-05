import React,{ useEffect,useReducer} from 'react';
import { Button } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/actions';


const Home = () =>{
    const [ sort, setSort] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {limit:4,order:"desc",sortBy:"_id",skip:0}
    );
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts(sort,[]))
    },[])


    return(
        <>
            

            <Button
            onClick={()=>{
              let skip = sort.skip + sort.limit;
              dispatch(
                getPosts({...sort,skip:skip},posts.homePosts)
              ).then(()=>{
                setSort({skip:skip});
              })
            }}
          >
            Load more
          </Button>

        </>
    )
}

export default Home;