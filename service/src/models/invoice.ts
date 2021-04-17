import express from 'express'
import { model, Schema, Model, Document } from 'mongoose';
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IInvoice extends Document {
    invoiceDate: Date,
    projectId: Number,
    number: Number
}

const invoiceSchema: Schema = new Schema({
    invoiceDate: {
        type: String,
        required: true
    },
    projectId: {
        type: Number,
        required: true
    },
    number: Number
});

invoiceSchema.plugin(AutoIncrement, { inc_field: 'number' });
export const Invoice: Model<IInvoice> = model('Invoice', invoiceSchema);