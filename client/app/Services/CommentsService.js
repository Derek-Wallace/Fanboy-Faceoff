
import { ProxyState } from '../AppState.js'
import { api } from './AxiosService.js'

class CommentsService {
  async getComments(id) {
    const res = await api.get('api/posts/' + id + '/comments')
    ProxyState.comments = res.data
  }

  async createComment(formData) {
    const res = await api.post('api/comments', formData)
    ProxyState.comments.push(res.data)
    // eslint-disable-next-line no-self-assign
    ProxyState.comments = ProxyState.comments
  }

  async deleteComment(id) {
    await api.delete('api/comments/' + id)
    ProxyState.comments = ProxyState.comments.filter(c => c.id !== id)
  }

  async updateComment(comment) {
    await api.put('api/comments/' + comment.id, comment)
    // const commentToUpdate = ProxyState.comments.find(c => c.id === comment.id)
    // ProxyState.comments.splice(commentToUpdate, 1, res.data)
    this.getComments()
    // eslint-disable-next-line no-self-assign
    // ProxyState.comments = ProxyState.comments
  }
}

export const commentsService = new CommentsService()
