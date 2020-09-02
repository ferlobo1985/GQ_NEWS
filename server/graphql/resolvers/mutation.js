const { User } = require('../../models/user');
const { Post } = require('../../models/post');
const { Category } = require('../../models/category');

const { UserInputError, AuthenticationError, ApolloError } = require('apollo-server-express')
const authorize = require('../../utils/isAuth');
const { userOwnership } = require('../../utils/tools');


module.exports = {
    Mutation:{
        authUser: async(parent,args,context,info)=>{
            try{
                /// CHECK THE MAIL
                const user = await User.findOne({
                    'email': args.fields.email
                });
                if(!user) {throw new AuthenticationError('Bad email'); }
                /// CHECK PASSWORD
                const checkpass = await user.comparePassword(args.fields.password);
                if(!checkpass) {throw new AuthenticationError('Wrong password'); }
       
                /// USER MUST BE RIGHT, LOG IN
                const getToken = await user.generateToken();
                if(!getToken) { 
                    throw new AuthenticationError('Something went wrong, try again');
                }

                /// RETURN 
                return {
                    _id:user._id,
                    email:user.email,
                    token: getToken.token
                };
            } catch(err){
                throw err
            }
        },
        signUp: async(parent,args,context,info)=>{
            try{
                const user = new User({
                    email: args.fields.email,
                    password: args.fields.password
                });

                const getToken = await user.generateToken();
                if(!getToken) { 
                    throw new AuthenticationError('Something went wrong, try again');
                }

                return { ...getToken._doc}
            } catch(err){
                if(err.code === 11000){
                    throw new AuthenticationError('Sorry, duplicated email. try a new on, dummy');
                }
                throw err
            }
        },
        updateUserProfile:async(parent,args,context,info)=>{
            try{
                const req = authorize(context.req);

                if(!userOwnership(req,args._id))
                throw new AuthenticationError("You dont own this user");

                //// validate fields, please

                const user = await User.findOneAndUpdate(
                    {_id:args._id},
                    {
                        "$set":{
                            name:args.name,
                            lastname:args.lastname
                        }
                    },
                    { new: true }
                );
                return {...user._doc}
            } catch(err){
                throw err;
            }
        },
        updateUserEmailPass: async(parent,args,context,info)=> {
            try {
                const req = authorize(context.req);

                if(!userOwnership(req,args._id))
                throw new AuthenticationError("You dont own this user");

                const user =await User.findOne({_id:req._id});
                if(!user) throw new AuthenticationError("Sorry, try again");

                //// validate fields, please
                if(args.email){ user.email = args.email }
                if(args.password){ user.password = args.password }

                /// USER IS RIGHT, GENERATE TOKEN
                const getToken = await user.generateToken();
                if(!getToken) { 
                    throw new AuthenticationError('Something went wrong, try again');
                }

                return { ...getToken._doc, token:getToken.token}
            } catch(err){
                throw new ApolloError('Something went wrong, try again',err);
            }
        },
        createPost: async(parent,{ fields },context,info)=> {
            try {
                const req = authorize(context.req);
                /// validate...
                const post = new Post({
                    title: fields.title,
                    excerpt:fields.excerpt,
                    content:fields.content,
                    author: req._id,
                    status: fields.status,
                    category: fields.category
                });
                const result = await post.save();
                return { ...result._doc };
            } catch(err){
                throw err                
            }
        },
        createCategory:  async(parent,args,context,info)=> {
            try {
                const req = authorize(context.req);
                /// validate
                const category = new Category({
                    author: req._id,
                    name: args.name
                });
                const result = await category.save();
                return { ...result._doc}
            } catch(err){
                throw err                
            }
        }
    }
}