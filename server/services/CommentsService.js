import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'

class CommentsService {
  async createComment(commentData) {
    return await dbContext.Comments.create(commentData)
  }

  async getCommentsByPostId(postId) {
    return await dbContext.Comments.find({ postId })
  }

  async deleteComment(id) {
    return await dbContext.Comments.findByIdAndDelete(id)
  }
}

export const commentsService = new CommentsService()
