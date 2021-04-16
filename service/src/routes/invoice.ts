import express from 'express'
import axios from 'axios'
import * as InvoiceController from "../controllers/invoice"
import { IInvoice } from '../models/invoice';

const router = express.Router();

// Get a list of invoices
router.get("", async (req, res) => {
    InvoiceController.getInvoices().then(result => res.send(result));
});

// Create an invoice
router.post("/create", async (req, res) => {
    InvoiceController.createInvoice(req.body.invoiceData);
    //console.log(req.body.invoiceData);
});

// Update an invoice
router.put("/update", async (req, res) => {

});

// Delete a task in Mavenlink
router.delete("/delete", async (req, res) => {

});

export default router;
