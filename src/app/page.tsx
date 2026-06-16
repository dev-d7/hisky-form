import RequirementsForm from '@/components/RequirementsForm'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PartnerLogos from '@/components/PartnerLogos'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <section id="send-requirement">
        <RequirementsForm />
      </section>
      <PartnerLogos />
    </>
  )
}
