import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BaseButton from "./components/Base/BaseButton.vue"
import BaseCheckbox from "./components/Base/BaseCheckbox.vue"
import BaseDateInput from "./components/Base/BaseDateInput.vue"
import BaseDropdown from "./components/Base/BaseDropdown.vue"
import BaseInput from "./components/Base/BaseInput.vue"
import BaseInputWithIcon from "./components/Base/BaseInputWithIcon.vue"
import BaseMenuContext from "./components/Base/BaseMenuContext.vue"
import BasePaging from "./components/Base/BasePaging.vue"
import BasePopup from "./components/Base/BasePopup.vue"
import BaseRadioGroup from "./components/Base/BaseRadioGroup.vue"
import BaseSlidebarItem from "./components/Base/BaseSlidebarItem.vue"
import BaseTable from "./components/Base/BaseTable.vue"
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';
import {DatePicker } from "v-calendar"
import BaseToast from "./components/Base/BaseToast.vue"

// Use plugin with defaults
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VCalendar, {})
app.use(router)
app.component("BaseButton",BaseButton)
app.component("BaseCheckbox", BaseCheckbox)
app.component("BaseDateInput", BaseDateInput)
app.component("BaseDropdown", BaseDropdown)
app.component("BaseInput", BaseInput)
app.component("BaseInputWithIcon", BaseInputWithIcon)
app.component("BaseMenuContext", BaseMenuContext)
app.component("BasePaging", BasePaging)
app.component("BasePopup", BasePopup)
app.component("BaseRadioGroup", BaseRadioGroup)
app.component("BaseSlidebarItem", BaseSlidebarItem)
app.component("BaseTable", BaseTable)
app.component('DatePicker', DatePicker)
app.component("BaseToast",BaseToast);

app.mount('#app')
