<template>
  <div class="posts">
    <h1>Edit Post</h1>
      <div class="form grid-y align-middle">
        <input type="text" name="title" placeholder="TITLE" v-model="title">
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        <button class="purple-btn button app_post_btn" @click="updatePost">Update</button>
      </div>
  </div>
</template>

<script>
import Api from '@/services/Api'

export default {
  name: 'EditPost',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      Api().get('posts/' + this.$route.params.id).then(result => {
        this.title = result.data.title
        this.description = result.data.description
      }).catch(err => {
        console.log(err.response)
      })

      // const response = await PostsService.getPost({
      //   id: this.$route.params.id
      // })
      // this.title = response.data.title
      // this.description = response.data.description
    },
    async updatePost () {
      Api().put('posts/' + this.$route.params.id, {
        id: this.$route.params.id,
        title: this.title,
        description: this.description
      }).then(result => {
        this.$router.push({ name: 'Posts' })
      }).catch(err => {
        console.log(err.response)
      })

      // await PostsService.updatePost({
      //   id: this.$route.params.id,
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
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
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
