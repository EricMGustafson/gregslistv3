import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema({
  company: { type: String },
  jobTitle: { type: String },
  hours: { type: Number },
  rate: { type: Number, required: true },
  description: { type: String },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

JobSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
