"use client";

import { Card, Typography, Space } from "antd";
import CTAButton from "./CTAButton";
import { useTranslations } from "next-intl";

const { Paragraph } = Typography;

/**
 * Hero section with headline, subtitle, and primary CTAs.
 * @returns {JSX.Element}
 * @example
 * <Hero />
 */
export default function Hero() {
  const t = useTranslations("Hero");
  const title = t("title");
  const titleParts = title.split(": ");
  const titleFirstPart = titleParts[0] + ":";
  const titleSecondPart = titleParts.slice(1).join(": ");

  return (
    <Card
      style={{
        background: "var(--card-gradient)",
        border: "none",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
        borderRadius: "var(--card-radius)",
        width: "var(--container-width)",
        maxWidth: "var(--container-max-width)",
        textAlign: "center",
        padding: "120px 24px",
        paddingTop: "180px",
        margin: "-100px auto 24px auto",
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
            marginBottom: 16,
            marginTop: 0,
          }}
        >
          {t("subtitle")}
        </Paragraph>
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-raleway)",
              fontWeight: 700,
              fontSize: "clamp(40px, 8vw, 64px)",
              color: "var(--text-on-dark)",
              margin: 0,
              marginBottom: 8,
              lineHeight: 1.2,
            }}
          >
            {titleFirstPart}
          </h1>
          <h2
            style={{
              fontFamily: "var(--font-raleway)",
              fontWeight: 400,
              fontSize: "clamp(28px, 5vw, 40px)",
              color: "var(--text-on-dark)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {titleSecondPart}
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
          {t("description")}
        </Paragraph>
        <Space size="middle">
          <CTAButton href="#contact">{t("getInTouch")}</CTAButton>
          <CTAButton variant="secondary" href="#about">
            {t("knowMore")}
          </CTAButton>
        </Space>
      </div>
    </Card>
  );
}
