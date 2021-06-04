import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function draw() {
  let template = ''
  ProxyState.posts.forEach(p => {
    template +=
    /* html */ `
  <div class="card my-3">
    <div class="card-header ">
      <div>
      <img src="${p.imgUrl}" alt="">
      </div>
      <h2>${p.title}</h2> 
      <p> <i class="fas fa-arrow-up"></i> <i class="fas fa-user-tie">VOTE COUNT</i><i class="fas fa-arrow-down"></i></p>
    </div>
  </div>`
  }
  )
  document.getElementById('posts').innerHTML = template
}
export class PostsController {
  constructor() {
    ProxyState.on('posts', draw)
    this.getPosts()
  }

  getPosts() {
    // postsService.getPosts()
    draw()
  }

  createPost(event) {
    event.preventDefault()
    logger.log(event)
    const form = event.target
    const formData = {
      title: form.title.value,
      description: form.description.value,
      imgUrl: form.imgURL.value
    }
    ProxyState.posts.push(formData)
    ProxyState.posts = ProxyState.posts
    // postsService.createPost(formData)
    form.reset()
  }
}
