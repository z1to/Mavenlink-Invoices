import express from 'express'
import axios from 'axios'
import { validateBearerToken } from '../models/user'

const router = express.Router()

// Get a list of tasks from Mavenlink
router.get('', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }
  axios.get(process.env.MAVENLINK_TASK_URL, options)
    .then(response => {
      res.status(200).send(response.data.stories)
    })
    .catch(error => res.status(400).send(error))
})

// Create a task in Mavenlink
router.post('/create', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }
  const data = {
    workspace_id: '35576705',
    title: 'Test',
    story_type: 'task'
  }
  axios.post(process.env.MAVENLINK_TASK_URL, data, options)
    .then(response => res.status(200).send(response))
    .catch(error => res.status(400).send(error))
})

// Update task in Mavenlink
router.put('/update', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }
  axios.put(process.env.MAVENLINK_TASK_URL + '/741780125', { percentage_complete: 50 }, options)
    .then(response => res.status(200).send(response))
    .catch(error => res.status(400).send(error))
})

// Delete a task in Mavenlink
router.delete('/delete', async (req, res) => {
  if (!validateBearerToken(req.headers.authorization, res)) { return }

  const options = {
    headers: {
      Authorization: 'Bearer ' + process.env.MAVENLINK_TOKEN
    }
  }
  axios.delete(process.env.MAVENLINK_TASK_URL + '/741778695', options)
    .then(response => res.status(200).send(response))
    .catch(error => res.status(400).send(error))
})

export default router
