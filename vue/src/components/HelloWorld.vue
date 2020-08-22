<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ redis_key }}</h1>
    <p>
      This is, an only slightly modified, version of the default Vue app.
    </p>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {redis_key: null}
    },
    mounted() {
      axios.get('http://localhost:8080').then((r) => {
        console.log('got data from express', r)
        this.redis_key = r.data
      }).catch((e) => {
        console.error('error getting data', e)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
