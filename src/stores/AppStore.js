import { defineStore } from 'pinia'
import { ToastMode } from '../Enum/Enum'

export const appStore = defineStore({
  id: 'AppStore',
  state: () => ({
    //status slide bar
    isShowSlidebar: true,
    //status loading
    isLoading: false,
    //thông báo của toast message
    toastMessage: "",
    typeToast:ToastMode.SUCCESS
  }),
  getters: {
    getStateSlidebar: (state) => state.isShowSlidebar
  },
  actions: {

    /**
     * Func : ẩn slide bar
     * Author : Lê Mạnh Hùng (15/7/2022)
     */
    hideSlidebar() {
      this.isShowSlidebar = false
    },


    /**
     * Func : hiện slide bar
     * Author : Lê Mạnh Hùng (15/7/2022)
     */
    showSlidebar() {
      this.isShowSlidebar = true
    },

    
    /**
     * Func : thay đổi status loading
     * Author : Lê Mạnh Hùng (15/7/2022)
     */
    setStateLoading(state) {
      this.isLoading = state
    }
  }
})
