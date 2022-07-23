import { defineStore } from 'pinia'

export const appStore = defineStore({
  id: 'AppStore',
  state: () => ({
    isShowSlidebar:true,
    isLoading:false
  }),
  getters: {
    getStateSlidebar: (state) => state.isShowSlidebar
  },
  actions: {
    hireSlidebar() {
      this.isShowSlidebar = false
    },

    showSlidebar() {
      this.isShowSlidebar = true
    },
    setStateLoading(state) {
      this.isLoading = state
    }
  }
})
