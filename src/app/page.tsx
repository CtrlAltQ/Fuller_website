import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import ContactForm from '@/components/sections/ContactForm'
import { generateFAQSchema } from '@/utils/seo'
import { homePageFAQs } from '@/data/faqs'

export default function HomePage() {
  const faqSchema = generateFAQSchema(homePageFAQs);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Header />
      <Hero />
      <Services />
      <ContactForm />
      <Footer />
    </main>
  )
}