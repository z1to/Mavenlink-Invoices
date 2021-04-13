import express from 'express'
import * as api from "./api"

export const register = (app: express.Application) => {
    app.get("/", async (req, res) => {
        
    });
    api.register(app);
}
