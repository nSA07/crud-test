import './globals.scss'
import { Inter } from 'next/font/google'
import QueryWrapper from "./components/QueryWrapper"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (

      <html lang="en">
        <body className={inter.className}>
          <QueryWrapper>
            <div className='container'>
              <div className='aside'>
                <h2 className='aside__title'>DAYRY APP</h2>
                <span className='aside__descr'>Comment whit no sense</span>
              </div>
              {children}
            </div>
          </QueryWrapper>
        </body>
      </html>
  )
}
