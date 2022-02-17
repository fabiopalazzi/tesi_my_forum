<template>
  <router-view/>
</template>

<script>
export default({
  mounted() {
    this.axios.defaults.baseURL = 'http://localhost:8080';
    this.axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    this.axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'; 
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
<style>
  @import './assets/css/sb-admin-2.min.css';
  @import './assets/vendor/fontawesome-free/css/all.min.css';
</style>