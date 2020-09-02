const { Post } = require('../../models/post');
const { Category } = require('../../models/category');
const { sortArgsHelper } = require('../../utils/tools');

module.exports = {
    User:{
        posts: async(parent,{sort},context,info)=>{ 
            try{
                let sortArgs = sortArgsHelper(sort);

                const userId = parent._id;
                const posts = await Post
                .find({ author: userId })
                .sort([[sortArgs.sortBy,sortArgs.order]])
                .skip(sortArgs.skip)
                .limit(sortArgs.limit);

                return posts;
            } catch(err){
                throw err
            }
        },
        categories: async(parent,args,context,info)=>{
            try{
                const userId = parent._id;
                const categories = await Category.find({ author: userId });

                return categories;
            } catch(err){
                throw err
            }
        }
    }
}