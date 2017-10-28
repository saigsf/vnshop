<template>
  <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">Home</a>
               <span><slot></slot></span> 
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavCrumbs',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>