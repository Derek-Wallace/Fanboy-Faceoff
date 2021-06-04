import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/postsService.js'

function draw() {
  let template = ''
  ProxyState.posts.forEach(p => {
    template +=
    /* html */ `
  <div class="card">
    <div class="card-header text-center">
      <div>
      <img src="${p.imgUrl}" alt="" style="object-fit: contain;"></div>
      <p class = "text-right">
      <h2>${p.title}</h2> 
      <button class="btn text-right"><i class="fas fa-lg fa-arrow-up text-primary" onclick="app.postsController.upVote('${p.id}')"></i></button> <button class="btn "><i class="fas fa-lg fa-arrow-down text-danger" onclick="app.postsController.downVote('${p.id}')"></i></button></p>
      <p class= "text-right" id="${p.id}">${p.voteCount}</p>
    </div>
  </div>`
  })
  document.getElementById('posts').innerHTML = template
}

export class PostsController {
  constructor() {
    ProxyState.on('posts', draw)
    this.getPosts()
  }

  getPosts() {
    postsService.getPosts()
    draw()
  }

  upVote(id) {
    const post = ProxyState.posts.find(p => p.id === id)
    post.voteCount += 1
    console.log('button worked', post.voteCount)
    draw()
    // document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-user-tie"> ${post.voteCount}</i></p>`
    if (post.voteCount >= 5) {
      document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-mask"> ${post.voteCount}</i></p>`
    } if (post.voteCount >= 10) {
      document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-meteor"> ${post.voteCount}</i></p>`
    } if (post.voteCount >= 15) {
      document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-superpowers"> ${post.voteCount}</i></p>`
    }
  }

  downVote(id) {
    const post = ProxyState.posts.find(p => p.id === id)
    post.voteCount -= 1
    console.log('button worked', post.voteCount)
    draw()
    if (post.voteCount <= -5) {
      document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-trash-alt"> ${post.voteCount}</i></p>`
    }
    if (post.voteCount <= -10) {
      document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-dumpster"> ${post.voteCount}</i></p>`
    }
    if (post.voteCount <= -15) {
      document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-dumpster-fire"> ${post.voteCount}</i></p>`
    }
    // document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-user-tie"> ${post.voteCount}</i></p>`
  }
}
