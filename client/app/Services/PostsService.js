// import { logger } from '../Utils/Logger.js'

// const url = axios.create({
//   baseURL: 'http://localhost:3000/'
// })
class PostsService {
  async getPosts() {
<<<<<<< HEAD
    const res = await api.get('api/posts')
    ProxyState.posts = res.data
  }

  async createPost(formData) {
    const res = await api.post('api/posts', formData)
    ProxyState.posts.push(res.data)
    // eslint-disable-next-line no-self-assign
    ProxyState.posts = ProxyState.posts
=======
    // const res = await url.get('posts')
    // logger.log(res.data)
  }

  async createPost(formData) {
    // const res = await url.post('posts', formData)
    // logger.log(res.data)
>>>>>>> b5891149e55be6526ef966950246a01f59766a7b
  }
}
export const postsService = new PostsService()
