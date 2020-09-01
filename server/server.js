const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

/// graphql 
const typeDefs = require('./graphql/schema');
const { Query } = require('./graphql/resolvers/query');
const { Mutation } = require('./graphql/resolvers/mutation');

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation
    },
    context:({ req })=>{
        
        req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjRkOThhYjIxYjk3ZjYyMDIzYzg4MzYiLCJlbWFpbCI6ImZyYW5jaXNAZ21haWwuY29tIiwiaWF0IjoxNTk4OTIwODc1LCJleHAiOjE1OTk1MjU2NzV9.3U-sq83wVHM_AJyWid7TsVT58aNwVxr0dtdFnhzz7XE';

        return {req}
    }
})

server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;
mongoose.connect(`mongodb+srv://graphqluser:testing123@cluster0.5eeik.mongodb.net/<dbname>?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    })
}).catch( err => {
    console.log(err)
})


