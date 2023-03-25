import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { Raleway } from 'next/font/google'
import Head from 'next/head'
import { Toaster } from 'sonner'

const font = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${font.variable} font-sans w-full min-h-screen`}>
      <Component {...pageProps} />
      <Toaster richColors theme="dark" />

      <Head>
        <title>TalentForge | Get expert training for your job interviews</title>
        <meta name="description" content="Get ready to conquer your next professional challenge with TalentForge. Train your job interview skills with personalized questions and answers and increase your chances of success." />
        <meta property="og:image" content="/ogimage.png" />
        <meta property="og:title" content="TalentForge | Get expert training for your job interviews" />
        <meta property="og:description" content="Get ready to conquer your next professional challenge with TalentForge. Train your job interview skills with personalized questions and answers and increase your chances of success." />
        <meta property="og:url" content="https://talent-forge.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TalentForge" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TalentForge | Get expert training for your job interviews" />
        <meta name="twitter:description" content="Get ready to conquer your next professional challenge with TalentForge. Train your job interview skills with personalized questions and answers and increase your chances of success." />
        <meta name="twitter:image" content="/ogimage.png" />
      </Head>

      <style jsx global>{`
      :root {
        --font-raleway: ${font.style.fontFamily};
      }
    `}</style>
    </main>
  )
}
