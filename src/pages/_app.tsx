import '../../public/css/bootstrap.min.css'
import '../../public/css/style.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}
