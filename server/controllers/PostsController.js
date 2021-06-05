import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import { commentsService } from '../services/CommentsService'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getPost)
      .get('/:postId/comments', this.getComments)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.updatePost)
  }

  async getAll(req, res, next) {
    try {
      const posts = await postsService.getAll()
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getPost(req, res, next) {
    try {
      const post = await postsService.getPost(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByPostId(req.params.postId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const post = await postsService.createPost(req.body)
      req.body.creatorId = req.userInfo.id
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const post = await postsService.deletePost(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async updatePost(req, res, next) {
    try {
      const id = req.params.id
      const post = await postsService.updatePost(id, req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }
}
