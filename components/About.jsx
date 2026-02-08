"use client";

import { Card, Row, Col, Typography } from "antd";
import { useTranslations } from "next-intl";
import CTAButton from "./CTAButton";

const { Paragraph } = Typography;

/**
 * About section with video placeholder and company description.
 * @returns {JSX.Element}
 * @example
 * <About />
 */
export default function About() {
  const t = useTranslations("About");

  return (
    <div
      style={{
        background: "var(--project-bg)",
        padding: "var(--section-vertical-padding) 0",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          width: "var(--container-width)",
          maxWidth: "var(--container-max-width)",
          margin: "0 auto",
        }}
      >
        <Row gutter={[24, 24]} justify="center" align="stretch">
          <Col xs={24} lg={16} style={{ display: "flex" }}>
            <Card
              style={{
                background:
                  "radial-gradient(ellipse at top right, #3d8bda 0%, #3d8bda 15%, #3d8bda 20%, #010c2b 45%, #010c2b 100%)",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "var(--card-radius)",
                overflow: "hidden",
                border: "none",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                padding: 0,
              }}
              styles={{ body: { padding: 0, flex: 1, display: "flex" } }}
            >
              <div
                style={{
                  position: "relative",
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
          </Col>
          <Col xs={24} lg={8} style={{ display: "flex" }}>
            <Card
              style={{
                background:
                  "radial-gradient(ellipse at right center, #1955B2 0%, #1955B2 25%, #010c2b 70%, #010c2b 100%)",
                width: "100%",
                borderRadius: "var(--card-radius)",
                border: "none",
                padding: 0,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
              }}
              styles={{
                body: {
                  padding: "48px 32px 64px 32px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                },
              }}
            >
              <div>
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
                style={{ textAlign: "center", marginTop: 8, paddingBottom: 0 }}
              >
                <CTAButton href="#contact">{t("scheduleMeeting")}</CTAButton>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
