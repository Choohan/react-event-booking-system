import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from './context/AuthContext'
import { theme } from './theme.js'
import { ThemeProvider } from '@mui/system'
import Header from './components/layout/header'
import Footer from './components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MySukarelawan',
  description: 'Event volunteering system',
}


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <Header />
              {children}
            <Footer />
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
