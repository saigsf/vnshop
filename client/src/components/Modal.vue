<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition " :class="{'md-show':mdShow}" >
            <div class="md-modal-inner">
                <div class="md-top">
                    <slot name="message"></slot>
                    
                    <slot name="close"></slot>
                </div>
                <div class="md-content">
                    <slot name="btnGroup" ></slot>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="mdShow=false">
        </div>
    </div>
</template>

<script>
import '../../static/css/style.css'
export default {
  name: 'NavHeader',
  props: ['mdShow'],
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
