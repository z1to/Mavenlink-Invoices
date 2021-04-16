import { Invoice } from "../models/invoice"
import { InvoiceLine } from "../models/invoiceLine"

//Create invoice
export async function createInvoice(invoiceData) {
    const invoice = new Invoice({
        invoiceDate: invoiceData.invoiceDate,
        projectId: invoiceData.projectId
    });
    await invoice.save().then((result) => {
        invoiceData.invoiceLineData.map(line => line.invoiceId = result._id);
        invoiceData.invoiceLineData.map(line => createInvoiceLine(line));
    }).catch(err => console.log(err));
}

//Create invoice line
export async function createInvoiceLine(invoiceLineData) {
    const invoiceLine = new InvoiceLine(invoiceLineData);
    await invoiceLine.save().then((result) => console.log(result)).catch(err => console.log(err));
}

//Get invoices
export async function getInvoices() {
    const invoices = await Invoice.find();
    return invoices;
}

//Get invoice lines
export async function getInvoiceLines() {
    const invoiceLines = await InvoiceLine.find();
    return invoiceLines;
}

//Get invoice by id
export async function getInvoiceById(id) {
    const invoice = await Invoice.findById(id);
    return invoice;
}

//Get invoice with params
export async function getInvoice(cond) {
    const invoice = await Invoice.findOne(cond);
    return invoice;
}



