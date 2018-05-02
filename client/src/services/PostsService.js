import Api from '@/services/Api'

export default {
  fetchPosts (params) {
    return Api().get('posts/user/' + params)
  },
  addPost (params) {
    return Api().post('posts', params)
  },
  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },
  getPost (params) {
    return Api().get('posts/' + params.id)
  },
  deletePost (id) {
    return Api().delete('posts/' + id)
  },
  signUp () {
    return Api().post('signup')
  }
}
