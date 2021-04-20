import express from 'express'
import axios from 'axios'
import { validateBearerToken } from '../models/user'

const router = express.Router()

// Get a list of tasks from Mavenlink
router.get("/mavenlink", async (req, res) => {
    // if (!validateBearerToken(req.headers.authorization, res))
    //     return;

    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };
    let params = req.query;
    let queryString = buildQueryString(params);
    await axios.get(process.env.MAVENLINK_TASK_URL + queryString, options)
        .then(response => {
            res.status(200).send({ results: response.data.results, stories: response.data.stories, assignments: response.data.assignments });
        })
        .catch(error => res.status(400).send(error));
});

//Builds query string
function buildQueryString(params) {
    var queryString = '?';
    for (var param in params) {
        queryString = queryString + param + '=' + params[param] + '&';
    }
    return queryString.slice(0, -1); //to remove the last character
}

// Create a task in Mavenlink
router.post("/mavenlink/create", async (req, res) => {
    if (!validateBearerToken(req.headers.authorization, res))
        return;

    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };

    await axios.post(process.env.MAVENLINK_TASK_URL, req.body, options)
        .then(response => res.status(200).send(response.status))
        .catch(error => res.status(400).send(error));
});

// Update task in Mavenlink
router.put("/mavenlink/update", async (req, res) => {
    if (!validateBearerToken(req.headers.authorization, res))
        return;

    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };

    await axios.put(process.env.MAVENLINK_TASK_URL + "/" + req.query.id, req.body, options)
        .then(response => res.status(200).send(response.status))
        .catch(error => res.status(400).send(error));
});

// Delete a task in Mavenlink
router.delete("/mavenlink/delete", async (req, res) => {
    if (!validateBearerToken(req.headers.authorization, res))
        return;

    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };
    await axios.delete(process.env.MAVENLINK_TASK_URL + "/" + req.query.id, options)
        .then(response => res.status(200).send(response.status))
        .catch(error => res.status(400).send(error));
});

//Get time entries from Mavenlink
router.get("/time", async (req, res) => {
    if (!validateBearerToken(req.headers.authorization, res))
        return;

    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };
    let params = req.query;
    let queryString = buildQueryString(params);
    const url = process.env.MAVENLINK_TIME_URL + queryString;
    await axios.get(url, options)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => res.status(400).send(error));
});

export default router
