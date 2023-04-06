import '@/styles/globals.css'
import type { AppType } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { trpc } from '../utils/trpc';

const MyApp:AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

export default trpc.withTRPC(MyApp);