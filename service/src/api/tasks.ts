import { ITask, Task } from '../models/task'

export async function get (ids: Array<string>): Promise<ITask[]> {
  try {
    const tasks = await Task.find({ mavenlinkId: { $in: ids } });
    return tasks;
  } catch (error) {
    throw new Error('Could not get tasks')
  }
}

export async function create (task: ITask): Promise<string> {
  try {
    if (task === undefined || task?.mavenlinkId === undefined || task?.rate === undefined) { throw new Error('Task could not be created. Empty properties were passed.') }

    // Delete user
    await Task.create({
      mavenlinkId: task.mavenlinkId,
      rate: task.rate
    })

    return 'Success'
  } catch (error) {
    throw new Error('Task creation could not be processed')
  }
}

export async function update (task: ITask): Promise<string> {
  try {
    if (task === undefined || task?.mavenlinkId === undefined || task?.rate === undefined) { throw new Error('Task could not be updated. Empty properties were passed.') }

    // Find task
    const findTask: ITask = await Task.findOne({ mavenlinkId: task.mavenlinkId }).exec()

    // Check task exists
    if (findTask == null) {
      return 'Task could not be updated. Task does not exist in Mavenlink.'
    }

    const query = { mavenlinkId: task.mavenlinkId }
    const update = { rate: task.rate }

    // Update task
    await Task.findOneAndUpdate(query, update)

    return 'Success'
  } catch (error) {
    if (error.message !== '') {
      throw new Error(error)
    }

    throw new Error('Task update could not be processed')
  }
}

export async function destroy (mavenlinkId: string): Promise<string> {
  try {
    // Delete task
    await Task.deleteOne({
      mavenlinkId: mavenlinkId,
    })

    return 'Success'
  } catch (error) {
    throw new Error('Task creation could not be processed')
  }
}
