import type { PropsWithChildren } from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='bg-linear-to-br from-background to-muted'>
      {/* Header */}
      <Header />

      <main className='container mx-auto min-h-screen px-4 py-8'>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
export default Layout
