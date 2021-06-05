import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/postsService.js'

function draw() {
  let template = ''
  ProxyState.posts.forEach(p => {
    template +=
    /* html */ `
  <div class="card row my-3">
    <div class="card-header text-center d-flex align-items-center">
      <div class="col-3 d-flex align-items-center">
      <img src="${p.imgUrl}" height="200px" length="400px" alt="" style="object-fit: contain;">
      </div>
      <div class="col-8">
        <h2 class="ml-3">${p.title}</h2> 
      </div>
      <div class="col-1 justify-content-end text-right">
        <button class="btn"><i class="fas fa-lg fa-arrow-up text-primary" onclick="app.postsController.upVote('${p.id}')"></i></button>
        <p id="${p.id}"> <i class="fas fa-lg fa-user-tie"> ${p.voteCount}</i> </p>
        <button class="btn"><i class="fas fa-lg fa-arrow-down text-danger" onclick="app.postsController.downVote('${p.id}')"></i></button>
      </div>
    </div>
  </div>`
  })
  document.getElementById('posts').innerHTML = template
  document.getElementById('total-posts').innerHTML = ProxyState.posts.length
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
  }

  createPost(event) {
    event.preventDefault()
    const form = event.target
    const formData = {
      title: form.title.value,
      description: form.description.value,
      imgUrl: form.imgURL.value
    }
    postsService.createPost(formData)
    form.reset()
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
