import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PostsService {
  async find(query = {}) {
    const posts = await dbContext.Posts.find(query)
    return posts
  }

  async findById(id) {
    const post = await dbContext.Posts.findById(id)
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    return post
  }

  async createPost(postData){
    return await dbContext.Posts.create(postData)
  }
  
  async getPosts(query = {}){
    return await dbContext.Posts.find(query)
  }

  async deletePost(id){
    return await dbContext.Posts.findByIdAndDelete(id)
  }
}

export const postsService = new PostsService()
