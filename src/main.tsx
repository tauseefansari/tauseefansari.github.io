import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'src/i18n' // initialize i18next (bundled resources) before render
import 'src/index.css'
import App from 'src/App'
import { registerPwa } from 'src/lib/pwa'
import { ThemeProvider } from 'src/theme/ThemeProvider'

registerPwa()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
