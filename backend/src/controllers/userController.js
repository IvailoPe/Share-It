const router = require("express").Router()
const userService = require("../services/user-services.js")

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const userData = await userService.getUserTotalData(id);
    res.json(userData)
})

router.post("/:id", async (req, res) => {
    const body = req.body;

    if (!body.hasOwnProperty("usernameOrPassword")) {
        const newData = await userService.updateUserData(body, req.params.id);
        res.json(newData)
    }
    else {
        if (body.usernameOrPassword) {
            if (await userService.validatePasswords(body.password, req.params.id)) {
                console.log(body.username);
                const newData = await userService.updateUserData({ "username": body.username }, req.params.id)
                res.json(newData)
            }
            else {
                res.json({
                    error: "password is incorrect"
                })
            }
        }
        else {
            if (await userService.validatePasswords(body.password, req.params.id)) {
                console.log(1);
                console.log(body);
                const newData = await userService.updatePassword(body.newPassword, req.params.id);
                res.json(newData)
            }
            else {
                res.json({
                    error: "old password is incorrect"
                })
            }
        }
    }
})

router.post("/friend/request", async (req, res) => {
    const body = req.body
    await userService.sendFriendRequest(body.receiverId, body.senderId);
})

router.get("/friend/:id", async (req, res) => {
    const userId = req.params.id;
    const friends = await userService.getAllUserFriends(userId)
    res.json(friends)
})

router.post("/request/react", async (req, res) => {
    const data = req.body;
    console.log(data);
    await userService.reactOnFriendRequest(data.receiverId, data.senderId, data.decision)
    res.json({ task: "done" })
})

router.post("/notification/react", async (req, res) => {
    const data = req.body;
    console.log(data);
    await userService.deleteNotification(data.userId, data.notificationId, data.type)
    res.json({ task: "done" })
})

router.post("/friend/remove/request",async (req,res) => {
    console.log(2323232323);
    const data = req.body;
    console.log(data);
    await userService.removeFriend(data.userId,data.friendId)
    res.json({ task: "done" })
})


module.exports = router