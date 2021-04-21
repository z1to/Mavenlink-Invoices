import { model, Schema, Model, Document } from 'mongoose'

export interface IInvoiceLine extends Document {
    invoiceId: string,
    datePerformed: Date,
    timeInMinutes: number,
    notes: string,
    approved: boolean,
    storyId: number,
    taskTitle: string,
    taskDescription: string,
    rate: number,
    timeEntryId: number
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
})

export const InvoiceLine: Model<IInvoiceLine> = model('InvoiceLine', invoiceLineSchema)
