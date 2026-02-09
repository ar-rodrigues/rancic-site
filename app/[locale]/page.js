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
        <section
          id="hero"
          style={{
            paddingTop: 0,
            marginTop: 0,
            position: "relative",
            zIndex: 5,
          }}
        >
          <Hero />
        </section>
        <section id="about" style={{ position: "relative", zIndex: 4 }}>
          <About />
        </section>
        <section id="features" style={{ position: "relative", zIndex: 3 }}>
          <Features />
        </section>
        <section id="contact" style={{ position: "relative", zIndex: 2 }}>
          <ContactForm />
        </section>
        <footer style={{ position: "relative", zIndex: 1 }}>
          <Footer />
        </footer>
      </main>
    </>
  );
}
