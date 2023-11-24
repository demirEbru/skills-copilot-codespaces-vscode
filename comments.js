//Create web server with router.get and router.post
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

//Create a new comment
router.post('/comments', (req, res, next) => {
    //Create a new comment with the data from the request
    const comment = new Comment(req.body);
    //Save the comment to the database
    comment.save().then((comment) => {
        res.send(comment);
    }).catch(next);
});

//Get all comments
router.get('/comments', (req, res, next) => {
    //Get all comments from the database
    Comment.find({}).then((comments) => {
        res.send(comments);
    });
});

//Get a specific comment
router.get('/comments/:id', (req, res, next) => {
    //Get the comment with the id from the database
    Comment.findOne({_id: req.params.id}).then((comment) => {
        res.send(comment);
    });
});

//Update a specific comment
router.put('/comments/:id', (req, res, next) => {
    //Update the comment with the id with the data from the request
    Comment.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        //Get the updated comment from the database
        Comment.findOne({_id: req.params.id}).then((comment) => {
            res.send(comment);
        });
    });
});

//Delete a specific comment
router.delete('/comments/:id', (req, res, next) => {
    //Delete the comment with the id from the database
    Comment.findByIdAndRemove({_id: req.params.id}).then((comment) => {
        res.send(comment);
    });
});

module.exports = router;
