import express from 'express'
import { model, Schema, Model, Document } from 'mongoose';

export interface IInvoiceLine extends Document {
    invoiceId: String,
    datePerformed: Date,
    timeInMinutes: Number,
    notes: String,
    approved: Boolean,
    storyId: Number,
    taskTitle: String,
    taskDescription: String,
    rate: Number,
    timeEntryId: Number
}

const invoiceLineSchema: Schema = new Schema({
    invoiceId: {
        type: String,
        required: true
    },
    datePerformed: {
        type: Date,
        required: true
    },
    timeInMinutes: {
        type: Number,
        required: true
    },
    notes: String,
    approved: Boolean,
    storyId: {
        type: Number,
        required: true
    },
    taskTitle: String,
    taskDescription: String,
    rate: {
        type: Number,
        required: true
    },
    timeEntryId: {
        type: Number,
        required: true
    }
});

export const InvoiceLine: Model<IInvoiceLine> = model('InvoiceLine', invoiceLineSchema);