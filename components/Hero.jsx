"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import { Card, Typography, Space } from "antd";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import { useTranslations } from "next-intl";
import {
  SMOOTH_EASE,
  DESCENT_DURATION,
  sectionEntranceVariants,
} from "@/lib/sectionAnimation";

const { Paragraph } = Typography;

/** Split text into words; each word is wrapped in a span with hero-text-hover for per-word glow */
function WordsWithHover({ text }) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="hero-text-hover">{word}</span>
    </Fragment>
  ));
}

/**
 * Hero section with headline, subtitle, and primary CTAs.
 * Card descends from above with a smooth animation (same as About section).
 * @returns {JSX.Element}
 * @example
 * <Hero />
 */
export default function Hero() {
  const t = useTranslations("Hero");
  const title = t("title");
  const titleParts = title.split(": ");
  const titleFirstPart = titleParts[0] + ":";
  const titleSecondLine1 = t("titleSecondLine1");
  const titleSecondLine2 = t("titleSecondLine2");

  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        width: "var(--container-width)",
        maxWidth: "var(--container-max-width)",
        margin: "0 auto 24px auto",
      }}
    >
      <motion.div
        style={{ position: "relative", width: "100%" }}
        initial="hidden"
        animate={inView ? "visible" : "leave"}
        variants={sectionEntranceVariants}
        transition={{
          duration: DESCENT_DURATION,
          ease: SMOOTH_EASE,
        }}
      >
        <Card
          style={{
            background: "var(--project-bg)",
            border: "none",
            borderRadius: "var(--card-radius)",
            width: "100%",
            textAlign: "center",
            padding: "48px var(--card-inner-horizontal)",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(
                ellipse 130% 130% at 0% 100%,
                #1955B2 0%,
                #1955B2 25%,
                #010c2b 60%,
                #010c2b 100%
              )`,
              borderRadius: "var(--card-radius)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              <Paragraph
                className="hero-subtitle"
                style={{
                  color: "var(--text-on-dark-muted)",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 400,
                  marginBottom: 20,
                  marginTop: 0,
                }}
              >
                <WordsWithHover text={t("subtitle")} />
              </Paragraph>
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <h1
                  className="hero-title"
                  style={{
                    fontFamily: "var(--font-raleway)",
                    fontWeight: 600,
                    color: "var(--text-on-dark)",
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  <WordsWithHover text={titleFirstPart} />
                </h1>
                <h2
                  className="hero-title-secondary"
                  style={{
                    fontFamily: "var(--font-raleway)",
                    fontWeight: 500,
                    color: "var(--text-on-dark)",
                    margin: 0,
                  }}
                >
                  <WordsWithHover text={titleSecondLine1} />
                  <br />
                  <WordsWithHover text={titleSecondLine2} />
                </h2>
              </div>
              <Paragraph
                className="hero-description"
                style={{
                  color: "var(--text-on-dark-muted)",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 400,
                  marginBottom: 52,
                  maxWidth: "800px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <WordsWithHover text={t("description")} />
              </Paragraph>
              <Space size="middle" className="hero-cta-wrap">
                <CTAButton href="#contact" style={{ borderRadius: 12 }}>
                  {t("getInTouch")}
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  href="#about"
                  style={{ borderRadius: 12 }}
                >
                  {t("knowMore")}
                </CTAButton>
              </Space>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
