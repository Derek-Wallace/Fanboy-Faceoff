import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from "../services/PostsService"

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      // .put('/:id', this.updatePost)
  }

  async getAll(req, res, next) {
    try {
      const posts = await postsService.getPosts(req.query)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      let post = await postsService.createPost(req.body)
      req.body.creatorId = req.userInfo.id
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      let post = await postsService.deletePost(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }
}
