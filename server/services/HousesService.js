import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class HousesService {
  async getAll() {
    return await dbContext.Houses.find({}).populate('creator', 'picture name')
  }

  async getById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    return house
  }

  async create(body) {
    const house = await dbContext.Houses.create(body)
    await house.populate('creator', 'picture name')
    return house
  }

  async edit(body) {
    const original = await this.getById(body.id)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('Invalid Access')
    }
    original.bedrooms = body.bedrooms || original.bedrooms
    original.bathrooms = body.bathrooms || original.bathrooms
    original.levels = body.levels || original.levels
    original.imgUrl = body.imgUrl || original.imgUrl
    original.year = body.year || original.year
    original.price = body.price || original.price
    original.description = body.description || original.description
    await original.save
    return original
  }

  async remove(id, userId) {
    const house = await this.getById(id)
    if (house.creatorId.toString() !== userId) {
      throw new Forbidden('You are not allowed to delete things that are not yours')
    }
    await dbContext.Houses.findByIdAndDelete(id)
  }
}

export const housesService = new HousesService()
