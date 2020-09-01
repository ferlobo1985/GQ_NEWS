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
        
        req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjRkOThhYjIxYjk3ZjYyMDIzYzg4MzYiLCJlbWFpbCI6ImZyYW5jaXNfanVuaW9uQGdtYWlsLmNvbSIsImlhdCI6MTU5ODkyNzMyNiwiZXhwIjoxNTk5NTMyMTI2fQ.c3O_oquoPQ6EJ0aFNeFXO3PRyiq5M9Au-lHRUIVN7kQ';

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


