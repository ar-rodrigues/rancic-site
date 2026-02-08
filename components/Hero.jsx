"use client";

import { useEffect, useRef, Fragment } from "react";
import { Card, Typography, Space } from "antd";
import { motion, useMotionValue, animate } from "framer-motion";
import CTAButton from "./CTAButton";
import { useTranslations } from "next-intl";

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
 * Lighthouse beam effect: gradient and content reveal from bottom-left.
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

  const beamSize = useMotionValue(0);
  const ambientOriginX = useMotionValue(0);
  const ambientOriginY = useMotionValue(100);
  const beamLayerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const mainControls = animate(beamSize, 250, {
      duration: 7.5,
      delay: 1.5,
      ease: [0.33, 0.2, 0.2, 1],
    });
    const unsub = beamSize.on("change", (v) => {
      wrapperRef.current?.style.setProperty("--beam-size", `${v}%`);
      const shadowOpacity = (v / 250) * 0.22;
      shadowRef.current?.style.setProperty(
        "box-shadow",
        `0 24px 48px rgba(0, 0, 0, ${shadowOpacity})`
      );
    });
    wrapperRef.current?.style.setProperty("--beam-size", "0%");
    shadowRef.current?.style.setProperty("box-shadow", "none");

    // Subscribe to ambient origin changes to update CSS variable
    const unsubX = ambientOriginX.on("change", (x) => {
      beamLayerRef.current?.style.setProperty("--beam-origin-x", `${x}%`);
    });
    const unsubY = ambientOriginY.on("change", (y) => {
      beamLayerRef.current?.style.setProperty("--beam-origin-y", `${y}%`);
    });

    // Set initial values
    beamLayerRef.current?.style.setProperty("--beam-origin-x", "0%");
    beamLayerRef.current?.style.setProperty("--beam-origin-y", "100%");

    let ambientControlsX, ambientControlsY;
    mainControls.then(() => {
      // Subtle drift: gradient origin moves slightly (like lighthouse settling)
      ambientControlsX = animate(ambientOriginX, [0, 1.5, -1, 1.5, 0], {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      });
      ambientControlsY = animate(ambientOriginY, [100, 98.5, 101, 98.5, 100], {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      });
    });

    return () => {
      mainControls.stop();
      unsub();
      unsubX();
      unsubY();
      ambientControlsX?.stop();
      ambientControlsY?.stop();
    };
  }, [beamSize, ambientOriginX, ambientOriginY]);

  return (
    <motion.div
      ref={wrapperRef}
      style={{
        width: "var(--container-width)",
        maxWidth: "var(--container-max-width)",
        margin: "-100px auto 24px auto",
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <div
          ref={shadowRef}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "var(--card-radius)",
            pointerEvents: "none",
            clipPath: "inset(100px 0 0 0)",
            zIndex: 0,
          }}
        />
        <Card
          ref={cardRef}
          style={{
            background: "var(--project-bg)",
            border: "none",
            boxShadow: "none",
            borderRadius: "var(--card-radius)",
            width: "100%",
            textAlign: "center",
            padding: "120px 24px",
            paddingTop: "80px",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          <motion.div
            ref={beamLayerRef}
            className="hero-beam-layer"
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(
              ellipse 130% 130% at var(--beam-origin-x, 0%) var(--beam-origin-y, 100%),
              var(--gradient-accent) 0%,
              var(--gradient-accent) 5%,
              #2a7ac5 12%,
              #2a7ac5 13%,
              #1e6ab0 16%,
              #135a9b 28%,
              #0a4a86 33%,
              #0a4a86 34%,
              #0a4a86 35%,
              #063a71 42%,
              #032a5c 49%,
              #021638 54%,
              #011228 60%,
              var(--project-bg) 66%,
              var(--project-bg) 100%
            )`,
              borderRadius: "var(--card-radius)",
              pointerEvents: "none",
            }}
          />
          <div
            className="hero-content-reveal"
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
                style={{
                  color: "var(--text-on-dark-muted)",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 400,
                  fontSize: 16,
                  marginBottom: 12,
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
                  style={{
                    fontFamily: "var(--font-raleway)",
                    fontWeight: 600,
                    fontSize: "clamp(40px, 8vw, 64px)",
                    color: "var(--text-on-dark)",
                    margin: 0,
                    marginBottom: 8,
                    lineHeight: 1.2,
                  }}
                >
                  <WordsWithHover text={titleFirstPart} />
                </h1>
                <h2
                  style={{
                    fontFamily: "var(--font-raleway)",
                    fontWeight: 500,
                    fontSize: "clamp(28px, 5vw, 40px)",
                    color: "var(--text-on-dark)",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  <WordsWithHover text={titleSecondLine1} />
                  <br />
                  <WordsWithHover text={titleSecondLine2} />
                </h2>
              </div>
              <Paragraph
                style={{
                  color: "var(--text-on-dark-muted)",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 400,
                  fontSize: 18,
                  marginBottom: 40,
                  maxWidth: "800px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <WordsWithHover text={t("description")} />
              </Paragraph>
              <Space size="middle">
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
      </div>
    </motion.div>
  );
}
