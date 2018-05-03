<template>
  <div class="posts">
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="purple-btn button">Add Post</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="500">Description</td>
          <td width="150" align="center">Action</td>
        </tr>
        <tr v-for="post, stateId in posts" :key="post._id">
          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }" class="purple-btn button tiny">Edit</router-link>
            <a href="#" @click="deletePost(post._id, stateId)" class="button tiny">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <router-link v-bind:to="{ name: 'NewPost' }" class="purple-btn button add_post_link">Add Post</router-link>
      <p>There are no posts.. Lets add one now</p>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api'

export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      Api().get('posts/user/' + this.$store.state.user._id).then(result => {
        this.posts = result.data.posts
      }).catch(err => {
        console.log(err.response)
      })
    },
    async deletePost (id, stateId) {
      console.log(stateId)
      Api().delete('posts/' + id).then(result => {
        this.posts.splice(stateId, 1)
        this.$router.push({ name: 'Posts' })
      }).catch(err => {
        console.log(err.response)
      })
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table {
  margin: 20px auto;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
    background: #62cba1;
    color: #fff;
}
a {
  color: #9870f9;
  text-decoration: none;
}

</style>
