import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--project-bg)", minHeight: "100vh" }}>
        <section
          id="hero"
          style={{
            paddingTop: 0,
            marginTop: 0,
            position: "relative",
            zIndex: 2,
          }}
        >
          <Hero />
        </section>
        <section id="about" style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <About />
          </ScrollReveal>
        </section>
        <section id="features">
          <ScrollReveal>
            <Features />
          </ScrollReveal>
        </section>
        <section id="contact">
          <ScrollReveal>
            <ContactForm />
          </ScrollReveal>
        </section>
        <footer>
          <ScrollReveal>
            <Footer />
          </ScrollReveal>
        </footer>
      </main>
    </>
  );
}
