import express from 'express'
import dotenv from 'dotenv'
import axios, { AxiosInstance, AxiosResponse }from 'axios'

export const register = (app: express.Application) => {

    //Get a list of tasks from Mavenlink
    app.get("/tasks", async (req, res) => {
        const options = {
            headers:{
                Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
            }
        };
        axios.get(process.env.MAVENLINK_TASK_URL, options)
        .then(response => {
            console.log(response.data.stories);
        })
        .catch(error => console.log(error));
    });

    //Create a task in Mavenlink
    app.get("/create", async (req, res) => {
        const options = {
            headers:{
                Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
            }
        };
        var data = {workspace_id: "35576705",
        title: "Test",
        story_type: "task"
        };
        axios.post(process.env.MAVENLINK_TASK_URL, data, options)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    });

    //Update task in Mavenlink
    app.get("/update", async (req, res) => {
        const options = {
            headers:{
                Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
            }
        };
        axios.put(process.env.MAVENLINK_TASK_URL+"/741780125", {percentage_complete: 50}, options)
        .then(response => console.log(response))
        .catch(error => console.log(error)); 
    });


    //Delete a task in Mavenlink
    app.get("/delete", async (req, res) => {
        const options = {
            headers:{
                Authorization: "Bearer " + process.env.MAVENLINK_TOKEN
            }
        };
        axios.delete(process.env.MAVENLINK_TASK_URL+"/741778695", options)
        .then(response => console.log(response))
        .catch(error => console.log(error)); 
    });

}
