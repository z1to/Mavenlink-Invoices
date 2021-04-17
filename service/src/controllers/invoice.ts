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

//Get a single invoice
//param {Objec} cond: key (from schema) value pair array used to find the document
export async function getInvoice(cond) {
    return await Invoice.findOne(cond)
        .then(result => { return result; })
        .catch(err => { throw err });
}

//Delete invoice
export async function deleteInvoice(id) {
    return await Invoice.deleteOne({ _id: id })
        .then(result => {
            InvoiceLine.deleteMany({ "invoiceId": id }).catch(err => { throw err; });
            return result;
        })
        .catch(err => { throw err });
}

//Delete invoice line
export async function deleteInvoiceLine(id) {
    return await InvoiceLine.deleteOne({ _id: id })
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
    return await invoice.save().then((result) => {
        invoiceId = result.id;
        invoiceData.invoiceLineData.map(line => {
            line.invoiceId = result._id;
        });
        InvoiceLine.insertMany(invoiceData.invoiceLineData)
            .then(invoiceLines => { return invoiceLines; })
            .catch(err => { deleteInvoice(invoiceId); throw err; });
        return result;
    }).catch(err => { throw err; });
}

//Update invoice
//param {Number} id: used to find the document to update
//param {Object} newValues: the new document values
export async function updateInvoice(id, newValues) {
    return await Invoice.updateOne({ _id: id }, newValues)
        .then(result => { return result; })
        .catch(err => { throw err });
}

//Update invoice line
//param {Object} id: used to find the document to update
//param {Object} newValues: the new document values
export async function updateInvoiceLine(id, newValues) {
    return await InvoiceLine.updateOne({ _id: id }, newValues)
        .then(result => { return result; })
        .catch(err => { throw err });
}




