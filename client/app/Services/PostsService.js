import { ProxyState } from '../AppState.js'

// eslint-disable-next-line no-undef
const url = axios.create({
  baseURL: 'http://localhost:3000/api/'
})
class PostsService {
  async getPosts() {
    const res = await url.get('posts')
    ProxyState.posts.push(res.data)
  }

  async createPost(formData) {
    const res = await url.post('posts', formData)
    ProxyState.posts.push(res.data)
  }
}
export const postsService = new PostsService()
