const router = require("express").Router()
const notificationServices = require("../services/notification-services.js")

router.get("/:id",async (req,res) => {
    const idOfNoticitaion = req.params.id;
    res.json(await notificationServices.getAllNotifications(idOfNoticitaion))
})

module.exports = router