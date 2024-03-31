const router = require("express").Router()
const authController = require("./src/controllers/authController.js")
const userController = require("./src/controllers/userController.js")
const postController = require("./src/controllers/postController.js")
const chatController = require("./src/controllers/chatController.js")
const notificationController = require("./src/controllers/notificationController.js")

router.use("/auth",authController)
router.use("/user",userController)
router.use("/post",postController)
router.use("/chat",chatController)
router.use("/notifications",notificationController)

module.exports = router;