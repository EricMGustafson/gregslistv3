import { Auth0Provider } from '@bcwdev/auth0provider'
import { carsService } from '../services/CarsService'
import BaseController from '../utils/BaseController'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const cars = await carsService.getAll()
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const car = await carsService.getById(req.params.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const car = await carsService.create(req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const car = await carsService.edit(req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await carsService.remove(req.params.id, req.userInfo.id)
      return res.send('Car did done get deleted')
    } catch (error) {
      next(error)
    }
  }
}
