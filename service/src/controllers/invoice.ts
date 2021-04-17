import { Invoice } from "../models/invoice"
import { InvoiceLine } from "../models/invoiceLine"
import { validateBearerToken } from "../models/user";

//Get invoices
//param {Objec} filter: key (from schema) value pair array used to filter the results
export async function getInvoices(filter) {
    try {
        const invoices = await Invoice.find(filter);
        return invoices;
    }
    catch (e) {
        throw e;
    }
}

//Get invoice lines
//param {Objec} filter: key (from schema) value pair array used to filter the results
export async function getInvoiceLines(filter) {
    return await InvoiceLine.find(filter)
        .then(result => { return result; })
        .catch(err => { throw err });
}

//Get invoice by id
export async function getInvoiceById(id) {
    return await Invoice.findById(id)
        .then(result => { return result; })
        .catch(err => { throw err });
}

//Get invoice line by id
export async function getInvoiceLineById(id) {
    return await InvoiceLine.findById(id)
        .then(result => { return result; })
        .catch(err => { throw err });
}

//Create invoice
//Doesn't create partial invoices
export async function createInvoice(invoiceData) {
    const invoice = new Invoice({
        invoiceDate: invoiceData.invoiceDate,
        projectId: invoiceData.projectId
    });
    var invoiceId = -1;
    var createdInvoiceLines = [];
    return await invoice.save().then((result) => {
        invoiceId = result.id;
        invoiceData.invoiceLineData.map(line => {
            line.invoiceId = result._id;
        });
        invoiceData.invoiceLineData.map(line => createInvoiceLine(line)
            .then(invoiceLine => createdInvoiceLines.push(invoiceLine._id))
            .catch(err => {
                //delete the created invoice and invoice lines 
                deleteInvoice({ _id: invoiceId });
                createdInvoiceLines.map(id => deleteInvoiceLine({ _id: id }));
                throw err;
            }));
        return result;
    }).catch(err => { throw err; });
}

//Create invoice line
export async function createInvoiceLine(invoiceLineData) {
    const invoiceLine = new InvoiceLine(invoiceLineData);
    return await invoiceLine.save()
        .then((result) => { return result; })
        .catch(err => { throw err; });
}

//Update invoice
//param {Object} filter: used to find the document to update
//param {Object} newValues: the new document values
export async function updateInvoice(filter, newValues) {
    await Invoice.updateOne(filter, newValues)
        .then(result => { return result; })
        .catch(err => { throw err });
}

//Update invoice line
//param {Object} filter: used to find the document to update
//param {Object} newValues: the new document values
export async function updateInvoiceLine(filter, newValues) {
    await InvoiceLine.updateOne(filter, newValues)
        .then(result => { return result; })
        .catch(err => { throw err });
}

//Delete invoice
//param {Objec} cond: key (from schema) value pair array used to find the document to delete
export async function deleteInvoice(cond) {
    await Invoice.deleteOne(cond)
        .then(result => { return result; })
        .catch(err => { throw err });
}

//Delete invoice line
//param {Objec} cond: key (from schema) value pair array used to find the document to delete
export async function deleteInvoiceLine(cond) {
    await InvoiceLine.deleteOne(cond)
        .then(result => { return result; })
        .catch(err => { throw err });
}




