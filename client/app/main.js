import { AuthController } from './Controllers/AuthController.js'
import { PostController } from "./Controllers/PostController.js";
import { SocketTestController } from './Controllers/SocketTestController.js'

class App {

  postController = new PostController()
  authController = new AuthController();
  socketTestController = new SocketTestController();
}

// @ts-ignore
window.app = new App()
