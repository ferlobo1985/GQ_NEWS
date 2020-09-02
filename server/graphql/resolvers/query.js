const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../../models/user');
const { Category } = require('../../models/category');
const { Post } = require('../../models/post');
const authorize = require('../../utils/isAuth');
const { sortArgsHelper } = require('../../utils/tools');


module.exports = {
    Query:{
        user: async(parent,args,context,info)=>{
            try{
                const req = authorize(context.req);
                const user = await User.findOne({'_id':args.id});

                if(req._id.toString() !== user._id.toString()){
                    throw new AuthenticationError("You dont own this user")
                }
                return user;
            }catch(err){
                throw err;
            }
        },
        isAuth:async(parent,args,context,info)=>{ 
            try{
                const req = authorize(context.req,true);

                if(!req._id){
                    throw new AuthenticationError('Bad token');
                }
                return { _id:req._id,email:req.email,token:req.token }
            }catch(err){
                throw err;
            }
        },
        categories:async(parent,{catId},context,info)=>{
            try{
                let catQuery = {};
                if(catId){
                    catQuery['_id'] = catId
                }

                const categories = await Category.find(catQuery);
                return categories;
            }catch(err){
                throw err;
            }
        },
        post:async(parent,args,context,info)=>{
            try {
                const post = await Post.findOne({'_id':args.id})
                return post;
            } catch(err){
                throw err
            }
        },
        posts: async(parent,{ sort, queryBy},context,info)=>{
            try{
                let queryByArgs = {};
                let sortArgs = sortArgsHelper(sort)

                if(queryBy){
                    queryByArgs[queryBy.key] = queryBy.value
                }

               // console.log(sortArgs)

                const posts = await Post
                .find(queryByArgs)
                .sort([[sortArgs.sortBy,sortArgs.order]])
                .skip(sortArgs.skip)
                .limit(sortArgs.limit);

                return posts
            }catch(err){
                throw err;
            }
        }
    }
}