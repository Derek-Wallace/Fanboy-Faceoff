import { logger } from '../Utils/Logger.js'

// eslint-disable-next-line no-undef
const url = axios.create({
  baseURL: 'http://localhost:3000/'
})
class PostsService {
  async getPosts() {
    const res = await url.get('posts')
    logger.log(res.data)
  }

  async createPost(formData) {
    const res = await url.post('posts', formData)
    logger.log(res.data)
  }
}
export const postsService = new PostsService()
