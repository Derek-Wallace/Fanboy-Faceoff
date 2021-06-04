import { AuthController } from './Controllers/AuthController.js'
import { PostsController } from './Controllers/PostsController.js'
import { SocketTestController } from './Controllers/SocketTestController.js'

class App {
  postsController = new PostsController()
  authController = new AuthController();
  socketTestController = new SocketTestController();
}

// @ts-ignore
window.app = new App()
