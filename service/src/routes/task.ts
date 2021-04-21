import express from 'express'
import axios from 'axios'

import { create, update } from '../api/tasks'

import { ITask } from '../models/task'
import { validateBearerToken } from '../models/user'

const router = express.Router()

// Get a list of tasks from Mavenlink
router.get('/mavenlink', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }
  const params = req.query
  const queryString = buildQueryString(params)
  await axios.get(process.env.MAVENLINK_TASK_URL + queryString, options)
    .then(response => {
      res.status(200).send({ results: response.data.results, stories: response.data.stories, assignments: response.data.assignments })
    })
    .catch(error => res.status(400).send(error))
})

// Create a task in Mavenlink
router.post('/mavenlink/create', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }

  await axios.post(process.env.MAVENLINK_TASK_URL, req.body, options)
    .then(async response => {
      const mavenlinkId = response.data.results[0].id

      try {
        // Create new task object
        const task = <ITask>({
          mavenlinkId: mavenlinkId,
          rate: req.body.rate
        })

        // Create task in db
        await create(task)
      } catch (error) {
        const options = {
          headers: {
            Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
          }
        }

        // Delete task created in Mavenlink if task in db could not be created
        await axios.delete(process.env.MAVENLINK_TASK_URL + '/' + mavenlinkId, options)
        return res.status(400).send({ error: error.message })
      }

      // Send response
      return res.sendStatus(200)
    })
    .catch(error => res.status(400).send(error))
})

// Update task in Mavenlink
router.put('/mavenlink/update', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }

  await axios.put(process.env.MAVENLINK_TASK_URL + '/' + req.query.id, req.body, options)
    .then(async () => {
      try {
        // Create new task object
        const task = <ITask>({
          mavenlinkId: req.query.id,
          rate: req.body.rate
        })

        // Update task in db
        await update(task)
      } catch (error) {
        return res.status(400).send({ error: error.message })
      }

      return res.sendStatus(200)
    })
    .catch(error => res.status(400).send(error))
})

// Delete a task in Mavenlink
router.delete('/mavenlink/delete', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }
  await axios.delete(process.env.MAVENLINK_TASK_URL + '/' + req.query.id, options)
    .then(response => res.status(200).send(response.status))
    .catch(error => res.status(400).send(error))
})

// Get time entries from Mavenlink
router.get('/time', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }
  const params = req.query
  const queryString = buildQueryString(params)
  const url = process.env.MAVENLINK_TIME_URL + queryString
  await axios.get(url, options)
    .then(response => {
      res.status(200).send(response.data)
    })
    .catch(error => res.status(400).send(error))
})

// Builds query string
function buildQueryString (params) {
  let queryString = '?'
  for (const param in params) {
    queryString = queryString + param + '=' + params[param] + '&'
  }
  return queryString.slice(0, -1) // to remove the last character
}

export default router
