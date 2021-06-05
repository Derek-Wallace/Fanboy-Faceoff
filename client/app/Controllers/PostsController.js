import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/commentsService.js'
import { postsService } from '../Services/postsService.js'

function draw() {
  let template = ''
  ProxyState.posts.forEach(p => {
    template +=
    /* html */ `
  <div class="card row my-3">
    <div class="card-header text-center d-flex align-items-center">
      <div class="col-3 d-flex align-items-center">
      <img role="button" data-target="#big-post" onclick="app.postsController.drawPost('${p.id}')"  src="${p.imgUrl}" height="200px" length="400px" alt="" style="object-fit: contain;">
      </div>
      <div role="button" data-target="#big-post" onclick="app.postsController.drawPost('${p.id}')" class="col-8">
        <h2 class="ml-3">${p.title}</h2> 
      </div>
      <div class="col-1 justify-content-end text-right">
        <button class="btn"><i class="fas fa-lg fa-arrow-up text-primary" onclick="app.postsController.vote('${p.id}', 'upvote')"></i></button>
        <p id="${p.id}"> <i class="fas fa-lg fa-user-tie"> ${p.voteCount}</i> </p>
        <button class="btn"><i class="fas fa-lg fa-arrow-down text-danger" onclick="app.postsController.vote('${p.id}', 'downvote')"></i></button>
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
function drawCommentIcon(id) {
  const comment = ProxyState.comments.find(c => c.id === id)
  if (comment.commentVoteCount > -5 && comment.commentVoteCount < 5) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${comment.id}"> <i class="fas fa-lg fa-user-tie"> ${comment.commentVoteCount}</i></p>`
  }
  if (comment.commentVoteCount >= 5 && comment.commentVoteCount < 10) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${comment.id}"> <i class="fas fa-lg fa-mask"> ${comment.commentVoteCount}</i></p>`
  }
  if (comment.commentVoteCount >= 10 && comment.commentVoteCount < 15) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${comment.id}"> <i class="fas fa-lg fa-meteor"> ${comment.commentVoteCount}</i></p>`
  }
  if (comment.commentVoteCount >= 15) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${comment.id}"> <i class="fas fa-lg fa-dna"> ${comment.commentVoteCount}</i></p>`
  }
  if (comment.commentVoteCount <= -5 && comment.commentVoteCount > -10) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${comment.id}"> <i class="fas fa-lg fa-trash-alt"> ${comment.commentVoteCount}</i></p>`
  }
  if (comment.commentVoteCount <= -10 && comment.commentVoteCount > -15) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${comment.id}"> <i class="fas fa-lg fa-dumpster"> ${comment.commentVoteCount}</i></p>`
  }
  if (comment.commentVoteCount <= -15) {
    document.getElementById(id).innerHTML = /* html */ `<p class= "text-right" id="${comment.id}"> <i class="fas fa-lg fa-dumpster-fire"> ${comment.commentVoteCount}</i></p>`
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
    postsService.updatePost(post)
  }

  commentVote(id, choice) {
    const comment = ProxyState.comments.find(c => c.id === id)
    if (choice === 'upvote') {
      comment.commentVoteCount += 1
    } else if (choice === 'downvote') {
      comment.commentVoteCount -= 1
    }
    drawCommentIcon(id)
    commentsService.updateComment(comment)
  }

  drawPost(id) {
    const post = ProxyState.posts.find(p => p.id === id)
    document.getElementById('delete').innerHTML = `<i role="button" data-toggle="modal" data-target="#big-post" onclick="app.postsController.deletePost('${post.id}')" class="fas fa-lg fa-trash-alt"></i>`
    document.getElementById('post-body').innerHTML = `<img class="img-fluid" src='${post.imgUrl}'/><h4 class="mt-3 mb-1 text-center">${post.title}</h4><p class="my-2">${post.description}</p>`
    document.getElementById('create-comment').innerHTML = `<form class="d-flex" onsubmit="app.commentsController.createComment(event, '${post.id}')">
              <div class="p-3 text-center">
                <label for="content" class="sr-only">Content</label>
                <input type="text" name="content" id="content" class="border-top-0 border-right-0 border-left-0 bg-transparent" placeholder="Content">
              </div>
              <button type="submit" class="btn btn-success">Submit Comment</button>
            </form>`
    // eslint-disable-next-line no-undef
    $('#big-post').modal('show')
    commentsService.getComments(id)
  }

  deletePost(id) {
    const answer = window.confirm('We will destroy this, are you sure you want that?')
    if (answer) { postsService.deletePost(id) }
  }
}
