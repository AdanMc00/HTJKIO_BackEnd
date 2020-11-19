const Idea = require('../models/ideas')

function create ({
  title,
  author,
  dateCreate,
  imageUrl,
  description,
}) {
  const newIdea = new Idea({
    title,
    author,
    dateCreate,
    imageUrl,
    description
  })
  return newIdea.save()
}

function getAll () {
  return Idea.find()
}

function getById (id) {
  return Idea.findById(id)

}

function deleteById (id) {
  return Idea.findByIdAndDelete(id)
}

function updateById (id, ideaInfoToUpdate) {
  return Idea.findByIdAndUpdate(id, ideaInfoToUpdate)
}

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById
}