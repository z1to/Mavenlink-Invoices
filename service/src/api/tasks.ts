import { ITask, Task } from '../models/task'

export async function create (task: ITask): Promise<string> {
  try {
    if (task == undefined || task?.mavenlinkId == undefined || task?.rate == undefined)
      throw new Error('Task could not be created. Empty properties were passed.')

    // Create user
    await Task.create({
      mavenlinkId: task.mavenlinkId,
      rate: task.rate,
    })

    return 'Success'
  } catch (error) {
    throw new Error('Task creation could not be processed')
  }
}

export async function update (task: ITask): Promise<string> {
  try {
    if (task == undefined || task?.mavenlinkId == undefined || task?.rate == undefined)
      throw new Error('Task could not be created. Empty properties were passed.')

    // Find task
    const findTask: ITask = await Task.findOne({ mavenlinkId: task.mavenlinkId }).exec()

    // Check task exists
    if (findTask == null) {
      return 'Task could not be updated. Task does not exist in Mavenlink.'
    }

    const query = { mavenlinkId: task.mavenlinkId };
    const update = { rate: task.rate };

    // Update task
    await Task.findOneAndUpdate(query, update)

    return 'Success'
  } catch (error) {
    throw new Error('Task update could not be processed')
  }
}
