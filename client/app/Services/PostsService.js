import { ProxyState } from '../AppState.js'
import { api } from './AxiosService.js'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    ProxyState.posts = res.data
  }

  async createPost(formData) {
    const res = await api.post('api/posts', formData)
    ProxyState.posts.push(res.data)
    // eslint-disable-next-line no-self-assign
    ProxyState.posts = ProxyState.posts
  }
}
export const postsService = new PostsService()
