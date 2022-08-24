<template>
  <div :class="{ 'misa-container': true, 'misa-slidebar-hired': !AppStore.getStateSlidebar }">
    <BaseToast :style="{ top: '10px', animationDuration: `0.5s` }" :type="AppStore.typeToast"
      :message="AppStore.toastMessage" v-if="AppStore.toastMessage">
      <div :class="{
        'misa-icon': true,
        'misa-icon-success': AppStore.typeToast == ToastMode.SUCCESS,
        'misa-icon-error': AppStore.typeToast == ToastMode.ERROR
      }">
      </div>
    </BaseToast>
    <TheSlidebar />
    <TheContent />
    <TheLoading v-if="AppStore.isLoading" />
  </div>
</template>

<script>
import TheSlidebar from './components/layout/TheSlidebar.vue';
import TheContent from './components/layout/TheContent.vue';
import { appStore } from './stores/AppStore';
import TheLoading from './components/layout/TheLoading.vue';
import { ToastMode } from './Enum/Enum';

export default {
  name: 'App',
  setup() {
    const AppStore = appStore()

    return {
      //store của App
      AppStore,
      ToastMode
    }
  },
  components: {
    TheSlidebar,
    TheContent,
    TheLoading
  }
}
</script>
<style>
@import '@/assets/base.css';
@import url("./CSS/index.css");

#app {}
</style>
