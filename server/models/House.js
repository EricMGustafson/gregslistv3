import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema({
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  levels: { type: Number },
  imgUrl: { type: String, default: 'http://thiscatdoesnotexist.com' },
  year: { type: Number, max: 2022, min: 1900 },
  price: { type: Number, required: true, min: 1 },
  description: { type: String, maxlength: 300 },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

HouseSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
