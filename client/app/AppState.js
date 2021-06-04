import { dev } from './env.js'
import { EventEmitter } from './Utils/EventEmitter.js'
import { isValidProp } from './Utils/isValidProp.js'

class AppState extends EventEmitter {
  user = {}
  account = {}
  socketData = []

  /** @type {Post[]} */
  posts = [{
    imgUrl: 'https://cdn.britannica.com/s:800x450,c:crop/26/187026-138-00A23A77/science-fiction-powers-Marvel-Comics-Avengers.jpg',
    title: 'rip',
    voteCount: 4,
    id: '55555'
  }]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

if (dev) {
  // @ts-ignore
  window.ProxyState = ProxyState
}
