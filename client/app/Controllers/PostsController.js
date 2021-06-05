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
      <button class="btn text-right"><i class="fas fa-lg fa-arrow-up text-primary" onclick="app.postsController.vote('${p.id}', 'upvote')"></i></button> <button class="btn "><i class="fas fa-lg fa-arrow-down text-danger" onclick="app.postsController.vote('${p.id}', 'downvote')"></i></button></p>
      <p id="${p.id}"></p>
    </div>
  </div>`
  })
  document.getElementById('posts').innerHTML = template
}

function drawIcon(id) {
  const post = ProxyState.posts.find(p => p.id === id)
  if (post.voteCount > -5 && post.voteCount < 5) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-user-tie"> ${post.voteCount}</i></p>`
  }
  if (post.voteCount >= 5 && post.voteCount < 10) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-mask"> ${post.voteCount}</i></p>`
  }
  if (post.voteCount >= 10 && post.voteCount < 15) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-meteor"> ${post.voteCount}</i></p>`
  }
  if (post.voteCount >= 15) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-dna"> ${post.voteCount}</i></p>`
  }
  if (post.voteCount <= -5 && post.voteCount > -10) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-trash-alt"> ${post.voteCount}</i></p>`
  }
  if (post.voteCount <= -10 && post.voteCount > -15) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-dumpster"> ${post.voteCount}</i></p>`
  }
  if (post.voteCount <= -15) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${post.id}"> <i class="fas fa-lg fa-dumpster-fire"> ${post.voteCount}</i></p>`
  }
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

  vote(id, choice) {
    const post = ProxyState.posts.find(p => p.id === id)
    if (choice === 'upvote') {
      post.voteCount += 1
    } else if (choice === 'downvote') {
      post.voteCount -= 1
    }
    drawIcon(id)
  }
}
