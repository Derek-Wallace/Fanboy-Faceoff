import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  commentVoteCount: { type: Number, default: 0 },
  postId: { type: Schema.Types.ObjectId, ref: 'postId', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })
