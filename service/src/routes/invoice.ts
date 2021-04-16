import express from 'express'
import axios from 'axios'

const router = express.Router();

// Get a list of invoices
router.get("", async (req, res) => {
   
});

// Create an invoice
router.post("/create", async (req, res) => {
    console.log(req.body.invoiceData);
});

// Update an invoice
router.put("/update", async (req, res) => {
   
});

// Delete a task in Mavenlink
router.delete("/delete", async (req, res) => {

});

export default router;
