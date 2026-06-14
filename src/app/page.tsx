import RequirementsForm from '@/components/RequirementsForm'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <section id="send-requirement">
        <RequirementsForm />
      </section>
    </>
  )
}
