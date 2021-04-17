import express from 'express'
import axios from 'axios'

const router = express.Router();

// Get a list of tasks from Mavenlink
router.get("/mavenlink", async (req, res) => {
    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };
    let params = req.query;
    let queryString = buildQueryString(params);
    //let queryString = "?per_page=200&workspace_id=35576775&with_assignees=16925965&starting_between=2019-12-15:2019-12-16&without_past_completed=true"
    axios.get(process.env.MAVENLINK_TASK_URL + queryString, options)
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
router.post("/create", async (req, res) => {
    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };
    var data = {
        workspace_id: "35576705",
        title: "Test",
        story_type: "task"
    };
    axios.post(process.env.MAVENLINK_TASK_URL, data, options)
        .then(response => console.log(response))
        .catch(error => console.log(error));
});

// Update task in Mavenlink
router.put("/update", async (req, res) => {
    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };
    axios.put(process.env.MAVENLINK_TASK_URL + "/741780125", { percentage_complete: 50 }, options)
        .then(response => console.log(response))
        .catch(error => console.log(error));
});

// Delete a task in Mavenlink
router.delete("/delete", async (req, res) => {
    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };
    axios.delete(process.env.MAVENLINK_TASK_URL + "/741778695", options)
        .then(response => console.log(response))
        .catch(error => console.log(error));
});

//Get time entries from Mavenlink
router.get("/time", async (req, res) => {
    const options = {
        headers: {
            Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
        }
    };
    let params = req.query;
    let queryString = buildQueryString(params);
    const url = process.env.MAVENLINK_TIME_URL + queryString;
    axios.get(url, options)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => console.log(error));
});

export default router;
