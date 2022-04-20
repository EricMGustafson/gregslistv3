import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class JobsService {
  async getAll() {
    return await dbContext.Jobs.find({}).populate('creator', 'picture name')
  }

  async getById(id) {
    const job = await dbContext.Jobs.findById(id).populate('creator', 'picture name')
    if (!job) {
      throw new BadRequest('Invalid Id')
    }
    return job
  }

  async create(body) {
    const job = await dbContext.Jobs.create(body)
    await job.populate('creator', 'picture name')
    return job
  }

  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('Invalid Id')
    }
    original.company = update.company || original.company
    original.jobTitle = update.jobTitle || original.jobTitle
    original.hours = update.hours || original.hours
    original.rate = update.rate || original.rate
    original.description = update.description || original.description
    await original.save()
    return original
  }

  async remove(id, userId) {
    const job = await this.getById(id)
    if (job.creatorId.toString() !== userId) {
      throw new Forbidden('You are not allowed to delete things that are not yours')
    }
    await dbContext.Jobs.findByIdAndDelete(id)
  }
}

export const jobsService = new JobsService()
