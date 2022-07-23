<template>
  <div :class="{'misa-container':true ,'misa-slidebar-hired':!AppStore.getStateSlidebar}">
    <TheSlidebar />
    <TheContent />
    <TheLoading v-if="AppStore.isLoading" />
  </div>
</template>

<script>
import TheSlidebar from './components/layout/TheSlidebar.vue';
import TheContent from './components/layout/TheContent.vue';
import {appStore} from './stores/AppStore';
import TheLoading from './components/layout/TheLoading.vue';

  export default {
    name: 'App',
    setup(){
      const AppStore = appStore()

      return {
        //store của App
        AppStore
      }
    },
    components:{
    TheSlidebar,
    TheContent,
    TheLoading
}
  }
</script>
<style>
@import '@/assets/base.css';
@import url("./CSS/index.css");

#app {
  
}

</style>
