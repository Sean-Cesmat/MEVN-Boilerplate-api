<template>
  <div class="posts">
    <h1>Add Post</h1>
      <div class="form grid-y align-middle">
        <input type="text" name="title" placeholder="TITLE" v-model="title">
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        <button class="purple-btn button app_post_btn" @click="addPost">Add</button>
      </div>
  </div>
</template>

<script>
import Api from '@/services/Api'

export default {
  name: 'NewPost',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    async addPost () {
      Api().post('posts', {
        author: this.$store.state.user._id,
        title: this.title,
        description: this.description
      }).then(result => {
        this.$router.push({ name: 'Posts' })
      }).catch(err => {
        console.log(err.response)
      })
      // await PostsService.addPost({
      //   author: this.$store.state.user._id,
      //   title: this.title,
      //   description: this.description
      // })
      // this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px !important;
  max-width: 100%;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
  height: auto;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #9870f9;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
