const express = require("express");
const app = express();
const Post = require("./api/models/post");
const postsData = new Post();

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/uploads', express.static('uploads'));

app.get("/api/posts/", (req, res) => {
    res.status(200).send(postsData.get())
});

app.get("/api/posts/:postId", (req, res)=>{
    const postId = req.params.postId;
    const posts = postsData.get();
    const foundPost = posts.find((post) => post.id == postId);
    if(foundPost){
        res.status(200).send(foundPost);
    } else {
        res.status(404).send("Not Found")
    }
})

app.listen(3000, () => console.log("Listening on http://localhost:3000"));