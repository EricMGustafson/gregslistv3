import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CarSchema } from '../models/Car'
import { HouseSchema } from '../models/House'
import { JobSchema } from '../models/Job'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Cars = mongoose.model('Cars', CarSchema);
  Jobs = mongoose.model('Jobs', JobSchema)
  Houses = mongoose.model('House', HouseSchema)
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
