const Idea = require('../models/ideas')

function create ({
  title,
  author,
  dateCreate,
  imageUrl,
  description,
  userId
}) {
  const newIdea = new Idea({
    title,
    author,
    dateCreate,
    imageUrl,
    description,
    userId
  })
  return newIdea.save()
}

function getAll () {
  return Idea.find()

}function search (word) {
  return Idea.find(word)
}

function getById (id) {
  return Idea.find({ 'userId': id })

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
  updateById,
  search
}