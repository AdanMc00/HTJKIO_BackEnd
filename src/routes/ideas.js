const express = require('express')
passport = require ('passport')
const idea = require('../usesCases/ideas')
const jwt = require ('jsonwebtoken');
require ('../../pass-jwt')
const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const ideas = await idea.getAll()
    res.json({
      success: true,
      message: 'all ideas',
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
router.post('/', passport.authenticate('jwt', {session : false}), async (request, response) => {
  try {
    const newIdea = await idea.create(request.body)
    response.status(200),
      response.json({
        success: true,
        message: 'idea create',
        data: {
          idea: newIdea
        }
      })
  } catch (error) {
    response.status(400),
      response.json({
        success: false,
        message: error.message
      })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const ideaFound = await idea.getById(id)
    res.json({
      success: true,
      message: 'ideas by Id',
      data: {
        idea: ideaFound
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

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const ideaDel = await idea.deleteById(id)
    res.json({
      success: true,
      message: 'idea Delete',
      data: {
        idea: ideaDel
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

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const info = req.body
    const upDateIdeas = await idea.updateById(id, info)

    res.json({
      success: true,
      message: 'Changes Done',
      data: {
        idea: upDateIdeas
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