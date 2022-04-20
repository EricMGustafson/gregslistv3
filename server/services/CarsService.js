import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CarsService {
  async getAll() {
    return await dbContext.Cars.find({}).populate('creator', 'picture name')
  }

  async getById(id) {
    const car = await dbContext.Cars.findById(id).populate('creator', 'picture name')
    if (!car) {
      throw new BadRequest('Invalid Id')
    }
    return car
  }

  async create(body) {
    const car = await dbContext.Cars.create(body)
    await car.populate('creator', 'picture name')
    return car
  }

  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('Invalid Access')
    }
    original.make = update.make || original.make
    original.model = update.model || original.model
    original.year = update.year || original.year
    original.price = update.price || original.price
    original.imgUrl = update.imgUrl || original.imgUrl
    original.color = update.color || original.color
    await original.save()
    return original
  }

  async remove(id, userId) {
    const car = await this.getById(id)
    if (car.creatorId.toString() !== userId) {
      throw new Forbidden('You are not allowed to delete things that are not yours')
    }
    await dbContext.Cars.findByIdAndDelete(id)
  }
}
export const carsService = new CarsService()
