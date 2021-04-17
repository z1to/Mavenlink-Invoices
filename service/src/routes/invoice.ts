import express from 'express'
import axios from 'axios'
import * as InvoiceController from "../controllers/invoice"
import { IInvoice } from '../models/invoice';

const router = express.Router();

// Get a list of invoices
router.get("", async (req, res) => {
    InvoiceController.getInvoices(req.query)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

// Get a list of invoices lines
router.get("/invoiceLines", async (req, res) => {
    InvoiceController.getInvoiceLines(req.query)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

// Get an invoice by id
router.get("/:invoiceId", async (req, res) => {
    InvoiceController.getInvoiceById(req.params.invoiceId)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

// Get an invoice line by id
router.get("/invoiceLines/:invoiceLineId", async (req, res) => {
    InvoiceController.getInvoiceLineById(req.params.invoiceLineId).
        then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

// Delete an invoice
router.delete("/delete/:invoiceId", async (req, res) => {
    InvoiceController.deleteInvoice(req.params.invoiceId)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

// Delete an invoice line
router.delete("/invoiceLines/delete/:invoiceLineId", async (req, res) => {
    InvoiceController.deleteInvoiceLine(req.params.invoiceLineId)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

// Create an invoice
router.post("/create", async (req, res) => {
    InvoiceController.createInvoice(req.body.invoiceData)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});
// Update an invoice
router.put("/update", async (req, res) => {
    InvoiceController.updateInvoice(req.body.id, req.body.newValues)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

// Update invoice line
router.put("/invoiceLines/update", async (req, res) => {
    InvoiceController.updateInvoiceLine(req.body.id, req.body.newValues)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});


export default router;
