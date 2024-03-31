const router = require("express").Router()
const postServices = require("../services/post-services.js")

router.post("/create",async (req,res) => {
    const body = req.body;
    const post = await postServices.createNewPost(body);
    await post.populate("owner");
    res.json(post)
})

router.get("/:id",async (req,res) => {
    const id = req.params.id;
    const posts = await postServices.getAllUserPosts(id)
    res.json(posts)
})

router.delete("/:id",async (req,res) => {
    const id = req.params.id;
    await postServices.deletePost(id)
    res.json({deleted:true})
})

router.get("/",async (req,res) => {
    if(req.query.hasOwnProperty("exceptUserId")){
        res.json(await postServices.getAllPosts(req.query.exceptUserId))
    }
    else{
        res.json(await postServices.getAllPosts())
    }
})

router.post("/like/:id",async (req,res) => {
    await postServices.likePost(req.params.id,req.body.userId);
    res.json({liked:true});
})

router.post("/comment/:id",async (req,res) => {
    const id = req.params.id;
    const body = req.body;
    const data = await postServices.postComment(id,body.userId,body.comment)
    res.json(data);
})

router.get("/comment/:id",async (req,res) => {
    const data = await postServices.getAllPostComments(req.params.id);
    res.json(data)
})

router.post("/comment/like/:id",async (req,res) => {
    const postId = req.params.id
    await postServices.likeComment(postId,req.body.commentId,req.body.userId);
    res.json({liked:true});
})

router.get("/singlepost/:id",async (req,res) => {
    const id = req.params.id;
    const data = await postServices.getSinglePost(id);
    res.json(data);
})

module.exports = router