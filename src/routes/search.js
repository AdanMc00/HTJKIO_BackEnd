const express = require('express')
passport = require('passport')
const idea = require('../usesCases/ideas')
const router = express.Router()

router.get('/:title', async (req, res) => {
  const word = req.params
  console.log(word)
  try {
    const ideas = await idea.search(word)
    res.json({
      success: true,
      message: 'search ideas',
      data: {
        ideas
      }
    })
  } catch (error) {
    res.status(400),
      res.json({
        success: false,
        message: error.message
      })
  }
})
module.exports = router