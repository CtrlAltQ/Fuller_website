import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import ContactForm from '@/components/sections/ContactForm'

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <ContactForm />
      <Footer />
    </main>
  )
}