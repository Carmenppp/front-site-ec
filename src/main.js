import './assets/main.css'
import 'remixicon/fonts/remixicon.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark', // Cambiar a 'dark' si prefieres el tema oscuro
    themes: {
      light: {
        colors: {
          background: '#FFFFFF', // Ajusta los colores según lo que necesites
          primary: '#1976D2',    // Color primario
          secondary: '#424242',  // Color secundario
        },
      },
      dark: {
        colors: {
          background: '#121212',
          primary: '#1E88E5',
          secondary: '#FF5722',
        },
      },
    },
  },
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
