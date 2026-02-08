"use client";

import { useEffect, useRef, useState } from "react";
import { Card, Row, Col, Typography } from "antd";
import { motion, useMotionValue, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import CTAButton from "./CTAButton";

const { Paragraph } = Typography;

const SMOOTH_EASE = [0.22, 0.61, 0.36, 1];
const DESCENT_DURATION = 1;
const DESCENT_OFFSET_Y = 220;

const cardVariants = {
  hidden: { opacity: 0, y: -DESCENT_OFFSET_Y },
  visible: { opacity: 1, y: 0 },
  leave: { opacity: 0, y: -DESCENT_OFFSET_Y },
};

/**
 * About section with video placeholder and company description.
 * Cards descend from the hero with a smooth animation and gradient pulsing.
 * @returns {JSX.Element}
 * @example
 * <About />
 */
export default function About() {
  const t = useTranslations("About");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const videoGradientRef = useRef(null);
  const textGradientRef = useRef(null);

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

  const videoOriginX = useMotionValue(100);
  const videoOriginY = useMotionValue(0);
  const textOriginX = useMotionValue(100);
  const textOriginY = useMotionValue(50);

  useEffect(() => {
    const unsubVX = videoOriginX.on("change", (v) => {
      videoGradientRef.current?.style.setProperty(
        "--about-video-origin-x",
        `${v}%`
      );
    });
    const unsubVY = videoOriginY.on("change", (v) => {
      videoGradientRef.current?.style.setProperty(
        "--about-video-origin-y",
        `${v}%`
      );
    });
    videoGradientRef.current?.style.setProperty(
      "--about-video-origin-x",
      "100%"
    );
    videoGradientRef.current?.style.setProperty(
      "--about-video-origin-y",
      "0%"
    );

    const ctrlVX = animate(
      videoOriginX,
      [100, 101.5, 99, 101.5, 100],
      { duration: 6, repeat: Infinity, ease: "easeInOut" }
    );
    const ctrlVY = animate(
      videoOriginY,
      [0, -1.5, 1, -1.5, 0],
      { duration: 6, repeat: Infinity, ease: "easeInOut" }
    );

    return () => {
      unsubVX();
      unsubVY();
      ctrlVX.stop();
      ctrlVY.stop();
    };
  }, [videoOriginX, videoOriginY]);

  useEffect(() => {
    const unsubTX = textOriginX.on("change", (v) => {
      textGradientRef.current?.style.setProperty(
        "--about-text-origin-x",
        `${v}%`
      );
    });
    const unsubTY = textOriginY.on("change", (v) => {
      textGradientRef.current?.style.setProperty(
        "--about-text-origin-y",
        `${v}%`
      );
    });
    textGradientRef.current?.style.setProperty(
      "--about-text-origin-x",
      "100%"
    );
    textGradientRef.current?.style.setProperty(
      "--about-text-origin-y",
      "50%"
    );

    const ctrlTX = animate(
      textOriginX,
      [100, 101.5, 99, 101.5, 100],
      { duration: 6, repeat: Infinity, ease: "easeInOut" }
    );
    const ctrlTY = animate(
      textOriginY,
      [50, 48.5, 51.5, 48.5, 50],
      { duration: 6, repeat: Infinity, ease: "easeInOut" }
    );

    return () => {
      unsubTX();
      unsubTY();
      ctrlTX.stop();
      ctrlTY.stop();
    };
  }, [textOriginX, textOriginY]);

  return (
    <div
      style={{
        background: "var(--project-bg)",
        padding: "var(--section-vertical-padding) 0",
        minHeight: "100%",
      }}
    >
      <div
        ref={sectionRef}
        style={{
          width: "var(--container-width)",
          maxWidth: "var(--container-max-width)",
          margin: "0 auto",
        }}
      >
        <Row gutter={[24, 24]} justify="center" align="stretch">
          <Col xs={24} lg={16} style={{ display: "flex" }}>
            <motion.div
              style={{ width: "100%", display: "flex" }}
              initial="hidden"
              animate={inView ? "visible" : "leave"}
              variants={cardVariants}
              transition={{
                duration: DESCENT_DURATION,
                ease: SMOOTH_EASE,
              }}
            >
              <Card
                style={{
                  position: "relative",
                  background: "transparent",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "var(--card-radius)",
                  overflow: "hidden",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  padding: 0,
                }}
                styles={{
                  body: {
                    padding: 0,
                    flex: 1,
                    display: "flex",
                    position: "relative",
                  },
                }}
              >
                <div
                  ref={videoGradientRef}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at var(--about-video-origin-x, 100%) var(--about-video-origin-y, 0%), #3d8bda 0%, #3d8bda 15%, #3d8bda 20%, #010c2b 45%, #010c2b 100%)",
                    pointerEvents: "none",
                    borderRadius: "var(--card-radius)",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    flex: 1,
                    padding: "80px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 0,
                  }}
                >
                  <video
                    src="/video/3130284-uhd_3840_2160_30fps.mp4"
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: 350,
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                    controls
                    muted
                  />
                </div>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} lg={8} style={{ display: "flex" }}>
            <motion.div
              style={{ width: "100%", display: "flex" }}
              initial="hidden"
              animate={inView ? "visible" : "leave"}
              variants={cardVariants}
              transition={{
                delay: 0.15,
                duration: DESCENT_DURATION,
                ease: SMOOTH_EASE,
              }}
            >
              <Card
                style={{
                  position: "relative",
                  background: "transparent",
                  width: "100%",
                  borderRadius: "var(--card-radius)",
                  border: "none",
                  padding: 0,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
                styles={{
                  body: {
                    padding: "48px 32px 64px 32px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    position: "relative",
                  },
                }}
              >
                <div
                  ref={textGradientRef}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at var(--about-text-origin-x, 100%) var(--about-text-origin-y, 50%), #1955B2 0%, #1955B2 25%, #010c2b 70%, #010c2b 100%)",
                    pointerEvents: "none",
                    borderRadius: "var(--card-radius)",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-raleway)",
                      fontWeight: 700,
                      fontSize: "clamp(32px, 4vw, 48px)",
                      color: "var(--text-on-dark)",
                      marginBottom: 24,
                      marginTop: 0,
                      lineHeight: 1.2,
                      textAlign: "center",
                    }}
                  >
                    {t("title")}
                  </h2>
                  <Paragraph
                    style={{
                      color: "var(--text-on-dark-muted)",
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 400,
                      fontSize: 16,
                      marginBottom: 16,
                      lineHeight: 1.6,
                      textAlign: "left",
                    }}
                  >
                    {t("paragraph1")}
                  </Paragraph>
                  <Paragraph
                    style={{
                      color: "var(--text-on-dark-muted)",
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 400,
                      fontSize: 16,
                      marginBottom: 8,
                      lineHeight: 1.6,
                      textAlign: "left",
                    }}
                  >
                    {t("paragraph2")}
                  </Paragraph>
                </div>
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                    marginTop: 8,
                    paddingBottom: 0,
                  }}
                >
                  <CTAButton href="#contact">{t("scheduleMeeting")}</CTAButton>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
