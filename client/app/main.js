import { AuthController } from './Controllers/AuthController.js'
import { CommentsController } from './Controllers/CommentsController.js'
import { PostsController } from './Controllers/PostsController.js'
import { SocketTestController } from './Controllers/SocketTestController.js'

class App {
  postsController = new PostsController()
  authController = new AuthController();
  socketTestController = new SocketTestController();
  commentsController = new CommentsController()
}

// @ts-ignore
window.app = new App()
