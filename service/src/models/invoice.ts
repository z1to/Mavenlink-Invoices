import express from 'express'
import { model, Schema, Model, Document } from 'mongoose';

export interface IInvoice extends Document {
    invoiceDate: Date,
    projectId: Number
}

const invoiceSchema: Schema = new Schema({
    invoiceDate: {
        type: String,
        required: true
    },
    projectId: {
        type: Number,
        required: true
    }
});

export const Invoice: Model<IInvoice> = model('Invoice', invoiceSchema);