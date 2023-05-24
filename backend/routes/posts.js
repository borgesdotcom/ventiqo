const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

const app = express();

//CREATE A POST
app.post('/posts', (req, res) => {
    const post = new Post({
        content: req.body.content,
        name: req.body.name,
        hashtags: req.body.hashtags,
    });

    post.save((err, post) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(post);
    });
});

//GET ALL POSTS
app.get('/posts', (req, res) => {
    Post.find((err, posts) => {
        if (err) return res.status(500).send(err);
        res.send(posts);
    });
});

//LIKE A POST
router.put('/:id/like', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1, points: 5 } }, { new: true }, (err, post) => {
        if (err) return res.status(500).send(err);
        res.send(post);
    });
});

//COMMENT ON A POST
router.post('/:id/comments', (req, res) => {
    const comment = { body: req.body.body, date: Date.now() };
    Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment }, $inc: { points: 15 } }, { new: true }, (err, post) => {
        if (err) return res.status(500).send(err);
        res.send(post);
    });
});

//GENERATE TIMELINE
router.get('/timeline', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        // Fetch the top posts
        const topPosts = await Post.find().sort({ points: -1 }).skip(skip).limit(pageSize / 2).exec();

        // Fetch the recent posts
        const recentPosts = await Post.find().sort({ date: -1 }).skip(skip).limit(pageSize / 2).exec();

        // Merge and shuffle the posts
        const timelinePosts = shuffleArray([...topPosts, ...recentPosts]);

        res.send(timelinePosts);
    } catch (err) {
        res.status(500).send(err);
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = router;