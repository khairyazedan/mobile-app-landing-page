import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Screenshots from './components/Screenshots.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'

function App() {
 

  return (
    <>
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Features />
      <Screenshots />
      <Testimonials/>
      <CTA/>
      <FAQ/>
      <Footer/>
    </div>
    </>
  )
}

export default App
