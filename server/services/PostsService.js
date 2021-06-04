import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PostsService {
  async findById(id) {
    const post = await dbContext.Posts.findById(id)
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    return post
  }

  async createPost(postData) {
    return await dbContext.Posts.create(postData)
  }

  async getAll() {
    return await dbContext.Posts.find()
  }

  async getPost(postId) {
    return await dbContext.Posts.findById(postId)
  }

  async deletePost(id) {
    return await dbContext.Posts.findByIdAndDelete(id)
  }

  async updatePost(id, postData) {
    const post = await dbContext.Posts.findByIdAndUpdate(id, postData, { new: true, runValidators: true })
    return post
  }
}

export const postsService = new PostsService()
