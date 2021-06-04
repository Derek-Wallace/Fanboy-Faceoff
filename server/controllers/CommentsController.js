import BaseController from '../utils/BaseController'
import { commentsService } from '../services/CommentsService'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.updatePost)
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const comment = await commentsService.createComment(req.body)
      req.body.creatorId = req.userInfo.id
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async updatePost(req, res, next) {
    try {
      const id = req.params.id
      const comment = await commentsService.updateComment(id, req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
