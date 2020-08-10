const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

// Midleware to check the ID
function validateRepoId(request, response, next){
  // Receive the parameter
  const {id} = request.params;

  // Check if the information is a valid kind of ID
  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid repository ID.' })
  }

  return next()
}


app.use(express.json());
app.use(cors());
app.use('/repositories/:id', validateRepoId);

const repositories = [];


app.get("/repositories", (request, response) => {
  // Get information from query (url)
  const {title} = request.query

  // Check if title is passed to order else will show erverithing
  const results = title ? repositories.filter(repository => repository.title.includes(title)) : repositories

  // Return data
  return response.json(results)
  
});

app.post("/repositories", (request, response) => {
  // Get data from request.body (Json)
  const {title, url, techs} = request.body

  // Organize the data in a variable
  const repository = {id: uuid(), title, url, techs, likes:0}

  // Store data to repositories variable
  repositories.push(repository)

  // Return the json data of the insert
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // Receive the id of the registry from params (url)
  const {id} = request.params;

  // Get all modified data (or not)
  const {title, url, techs, likes} = request.body

  // Indentify the registry searching by id
  const repoIndex = repositories.findIndex(repository => repository.id === id)

  // Check if id don't exists
  if (repoIndex < 0){
    // Return error if the data don't exists
    return response.status(400).json({error: 'Repository not found'})
  }

  // Create the new information
  const repository = {
    id,
    title,
    url,
    techs
  }

  // Replace the new data
  repositories[repoIndex] = repository

  // Show the result
  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  // Receive the id of the registry from params (url)
  const {id} = request.params;

  // Indentify the registry searching by id
  const repoIndex = repositories.findIndex(repository => repository.id === id)

  // Check if id don't exists
  if (repoIndex < 0){
    // Return error if the data don't exists
    return response.status(400).json({error: 'Repository not found'})
  }

  // Delete registry
  repositories.splice(repoIndex, 1)

  // Response status
  return response.status(204).send().json({})
});

app.post("/repositories/:id/like", (request, response) => {
  

});

module.exports = app;
