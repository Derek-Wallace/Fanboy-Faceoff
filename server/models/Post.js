import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema ({
  title: {type: String, required: true},
  description: {type: String},
  imgUrl: {type: String}

}, 
{ timestamps: true, toJSON: { virtuals: true } }
)