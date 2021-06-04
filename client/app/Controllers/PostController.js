import { ProxyState } from "../AppState.js";
import { postservice } from "../Services/PostService.js";

function draw() {
  let template = ''
  ProxyState.posts.forEach(p => template +=
    /*html*/ `
  <div class="card">
    <div class="card-header ">
      <div>
      <img src="${p.imgUrl}" alt="">
      </div>
      <h2>${p.title}</h2> 
      <p> <i class="fas fa-arrow-up"></i> <i class="fas fa-user-tie">VOTE COUNT</i><i class="fas fa-arrow-down"></i></p>
    </div>
  </div>`
  )
document.getElementById('posts').innerHTML = template
}
export class PostController {
  constructor() {
    ProxyState.on('posts', draw)
    this.getPosts()
  }
  getPosts() {
    // postservice.getPosts()
    draw()
  }
}