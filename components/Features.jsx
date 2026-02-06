"use client";

import { Card, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";

const { Title, Paragraph } = Typography;

const FEATURE_ICONS = [
  "/icons/cloud.png",
  "/icons/Recurso%208copies.png",
  "/icons/scanbar.png",
  "/icons/design.png",
  "/icons/favorite.png",
  "/icons/ethernet.png",
  "/icons/clock.png",
  "/icons/Recurso%2012graph3.png",
];

/**
 * Key features section with radial gradient (light center, dark edges) and white feature cards.
 * @returns {JSX.Element}
 * @example
 * <Features />
 */
export default function Features() {
  const t = useTranslations("Features");

  const GAP = 24;
  const cardStyle = {
    height: "100%",
    borderRadius: "var(--card-radius)",
    minHeight: 220,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
  };
  const middleRowCardWidth = `calc((100% - ${GAP}px) / 2)`;

  const FeatureCard = ({ iconSrc, index }) => (
    <Card style={cardStyle} styles={{ body: { padding: 20 } }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: "var(--icon-bg-tint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <Image
          src={iconSrc}
          alt={t(`features.${index}.iconAlt`)}
          width={28}
          height={28}
        />
      </div>
      <Title
        level={5}
        style={{
          fontFamily: "var(--font-raleway)",
          fontWeight: 600,
          textAlign: "left",
          marginBottom: 8,
        }}
      >
        {t(`features.${index}.title`)}
      </Title>
      <Paragraph
        type="secondary"
        style={{
          fontFamily: "var(--font-poppins)",
          fontWeight: 300,
          textAlign: "left",
          marginBottom: 0,
        }}
      >
        {t(`features.${index}.description`)}
      </Paragraph>
    </Card>
  );

  return (
    <div
      style={{
        width: "var(--container-width)",
        maxWidth: "var(--container-max-width)",
        margin: "0 auto",
        padding: "var(--section-vertical-padding) 0",
      }}
    >
      <Card
        style={{
          background: "var(--features-section-gradient)",
          border: "none",
          borderRadius: "var(--card-radius)",
          padding: "48px 24px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Title
          level={2}
          style={{
            fontFamily: "var(--font-raleway)",
            fontWeight: 500,
            color: "var(--text-on-dark)",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          {t("sectionTitle")}
        </Title>
        <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
          {/* Row 1: 3 cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: GAP,
            }}
          >
            {FEATURE_ICONS.slice(0, 3).map((iconSrc, i) => (
              <div key={iconSrc} style={{ minHeight: 0 }}>
                <FeatureCard iconSrc={iconSrc} index={i} />
              </div>
            ))}
          </div>
          {/* Row 2: 2 cards centered (no empty column) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: GAP,
            }}
          >
            {FEATURE_ICONS.slice(3, 5).map((iconSrc, i) => (
              <div
                key={iconSrc}
                style={{ width: middleRowCardWidth, minWidth: 0, minHeight: 0 }}
              >
                <FeatureCard iconSrc={iconSrc} index={i + 3} />
              </div>
            ))}
          </div>
          {/* Row 3: 3 cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: GAP,
            }}
          >
            {FEATURE_ICONS.slice(5, 8).map((iconSrc, i) => (
              <div key={iconSrc} style={{ minHeight: 0 }}>
                <FeatureCard iconSrc={iconSrc} index={i + 5} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
