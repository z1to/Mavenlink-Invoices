import { model, Schema, Model, Document } from 'mongoose'

export interface ITask extends Document {
  mavenlinkId: string,
  rate: number,
}

const taskSchema: Schema = new Schema({
  mavenlinkId: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  rate: {
    type: Number,
    required: true
  }
})
export const Task: Model<ITask> = model('Task', taskSchema)
