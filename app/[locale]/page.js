import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--project-bg)", minHeight: "100vh" }}>
        <section id="hero" style={{ paddingTop: 0, marginTop: 0 }}>
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
}
