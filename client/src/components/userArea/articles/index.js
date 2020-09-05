import React, { useReducer, useEffect } from 'react';
import UserAreaHOC from '../../hoc/userAreaHoc';
import { Table,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/actions';

const Articles = (props) =>{
    const [ sort, setSort] = useReducer(
      (state, newState) => ({...state, ...newState}),
      {limit:3,order:"desc",sortBy:"_id",skip:0}
    );
    const user  = useSelector( state => state.user );
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getUserPosts(sort,[],user.auth._id));
    },[])


    return(
        <UserAreaHOC>
          
          <Button
            onClick={()=>{
              let skip = sort.skip + sort.limit;
              dispatch(
                getUserPosts({...sort,skip:skip},user.posts,user.auth._id)
              ).then(()=>{
                setSort({skip:skip});
              })
            }}
          >
            Load more
          </Button>

        </UserAreaHOC>
    )
}

export default Articles;