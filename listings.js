const mongoose = require('mongoose');
const Listing = require('./models/listModel');
const User = require('./models/userModel');

mongoose.connect('mongodb://localhost:27017/waterbnb')
    .then(()=> {
        console.log('connected');
    })
    .catch((err)=> {
        console.log('connection error');
        console.log(err);
    })

//let users = [
//    {
//        userName: 'jejerome'
//    }
//]

let listRentals = [
    {
        title: "karlo's motel",
        uploader: 'karlo',
        price: 2000,
        description: 'a hotel that overviews laguna lake',
        address: 'acacia trail, cabuyao city, laguna',
        category: 'hotel',
        picture: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        title: "mav's motel",
        uploader: 'mavs',
        price: 3500,
        description: 'a motel that overviews laguna lake',
        address: 'buko trail, cabuyao city, laguna',
        category: 'hotel',
        picture: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        title: "ace's motel",
        uploader: 'ace',
        price: 3500,
        description: 'an inn that overviews laguna lake',
        address: 'sampaloc trail, cabuyao city, laguna',
        category: 'hotel',
        picture: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
]

Listing.insertMany(listRentals)
    .then(res=> {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })

//User.insertMany(users)
//    .then(res=> {
//        console.log(res);
//    })
//    .catch(e => {
//        console.log(e);
//    })