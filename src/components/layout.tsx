import Footer from './footer'

interface NavElementProps {
  children: React.ReactNode
}

export default function Layout({ children }: NavElementProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">{children}</main>
      <Footer />
    </div>
  )
}
