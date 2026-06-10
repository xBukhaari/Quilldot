import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Clients from './components/Clients';

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Clients />
    </div>
  );
}