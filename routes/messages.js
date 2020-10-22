const express = require("express");
const router = express.Router();
const Messages = require('../src/libs/Messages')

router.get('/list', (req, res) => {
    Messages.list('H9ZtdabbM', messages => {
        res.json(messages)
    })
});

module.exports = router;