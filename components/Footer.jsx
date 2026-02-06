"use client";

import { Card, Row, Col, Space, Typography } from "antd";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const { Paragraph } = Typography;

const NAV_LINKS = [
  { href: "#hero", labelKey: "home" },
  { href: "#about", labelKey: "about" },
  { href: "#features", labelKey: "keyFeatures" },
  { href: "#contact", labelKey: "contact" },
];

/**
 * Footer with logo, description, nav links, and copyright.
 * @returns {JSX.Element}
 * @example
 * <Footer />
 */
export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations("Footer");

  return (
    <div
      style={{
        width: "var(--container-width)",
        maxWidth: "var(--container-max-width)",
        margin: "0 auto",
        paddingTop: 16,
        paddingBottom: "var(--section-vertical-padding)",
      }}
    >
      <Card
        style={{
          background: "var(--footer-gradient)",
          border: "none",
          borderRadius: "var(--card-radius)",
          padding: "56px 32px 48px",
          marginTop: 0,
          minHeight: 320,
          boxShadow:
            "0 4px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Row gutter={[24, 24]} align="top">
          <Col xs={24} md={14}>
            <Space align="start" orientation="vertical" size="middle">
              <Image
                src="/alt_logo.png"
                alt={t("logoAlt")}
                width={128}
                height={128}
              />
              <div style={{ maxWidth: 320 }}>
                <Paragraph
                  style={{
                    color: "var(--text-on-dark-muted)",
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 200,
                    marginBottom: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {t("description")}
                </Paragraph>
                <Paragraph
                  style={{
                    color: "var(--text-on-dark-muted)",
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 200,
                    marginBottom: 0,
                  }}
                >
                  {t("located")}
                </Paragraph>
              </div>
            </Space>
          </Col>
          <Col
            xs={24}
            md={10}
            className="footer-nav-col"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Space size="large" wrap>
              {NAV_LINKS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={`${pathname}${href}`}
                  style={{
                    color: "var(--text-on-dark-muted)",
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontSize: 14,
                  }}
                >
                  {t(labelKey)}
                </Link>
              ))}
            </Space>
          </Col>
        </Row>
        <Paragraph
          style={{
            color: "var(--text-on-dark-muted)",
            fontFamily: "var(--font-poppins)",
            fontWeight: 200,
            textAlign: "center",
            marginTop: 32,
            marginBottom: 0,
          }}
        >
          {t("copyright")}
        </Paragraph>
      </Card>
    </div>
  );
}
