
 const url = axios.create({
   baseURL: 'http://localhost:3000/'
 })
class PostService{
 async getPosts(){
let res = await url.get('posts')
console.log(res)
 }
}
export const postservice = new PostService()