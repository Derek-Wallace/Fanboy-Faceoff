import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/commentsService.js'

function _draw() {
  let template = ''
  ProxyState.comments.forEach(c => {
    template += `
    <div class="row bg-dark text-light justify-content-between align-items-center m-4">
      <i role="button" onclick="app.commentsController.deleteComment('${c.id}')" class="ml-2 fas fa-sm fa-trash-alt"></i>
      <p class="col-9">${c.content}</p>
      <div class="col-2 text-right">
        <button class="btn"><i class="fas fa-sm fa-arrow-up text-primary" onclick="app.postsController.commentVote('${c.id}', 'upvote')"></i></button>
        <p id="${c.id}"> <i class="fas fa-sm fa-user-tie"> ${c.commentVoteCount}</i> </p>
        <button class="btn"><i class="fas fa-sm fa-arrow-down text-danger" onclick="app.postsController.commentVote('${c.id}', 'downvote')"></i></button>
      </div>
    </div>
  `
  })
  document.getElementById('comments').innerHTML = template
}
export class CommentsController {
  constructor() {
    ProxyState.on('comments', _draw)
  }

  getComments(id) {
    commentsService.getComments(id)
    _draw()
  }

  createComment(event, id) {
    event.preventDefault()
    const form = event.target
    const formData = {
      content: form.content.value,
      postId: id
    }
    commentsService.createComment(formData, id)
    form.reset()
  }

  deleteComment(id) {
    const answer = window.confirm('This will be destroyed, Are you sure you want that?')
    if (answer) { commentsService.deleteComment(id) }
  }
}
