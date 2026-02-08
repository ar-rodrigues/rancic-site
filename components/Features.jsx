"use client";

import { useState, useCallback } from "react";
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

const CARD_TITLE_COLOR = "#073799";
const CARD_TEXT_COLOR = "#2E2E2E";
const TILT_MAX_DEG = 8;
const HOVER_SCALE = 1.05;
const CARD_TRANSITION = "transform 0.25s ease, box-shadow 0.25s ease";

/**
 * Single feature card with hover zoom, mouse-follow tilt, and shadow.
 * @param {Object} props
 * @param {string} props.iconSrc - Icon image path
 * @param {number} props.index - Feature index for translations
 * @returns {JSX.Element}
 */
function FeatureCard({ iconSrc, index }) {
  const t = useTranslations("Features");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltY = (x - 0.5) * 2 * TILT_MAX_DEG;
    const tiltX = (y - 0.5) * 2 * -TILT_MAX_DEG;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const cardStyle = {
    height: "100%",
    borderRadius: "var(--card-radius)",
    minHeight: 220,
    boxShadow: isHovered
      ? "0 12px 32px rgba(0, 0, 0, 0.18), 0 6px 16px rgba(0, 0, 0, 0.12)"
      : "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
    transform: `scale(${isHovered ? HOVER_SCALE : 1}) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: CARD_TRANSITION,
    zIndex: isHovered ? 10 : 1,
  };

  return (
    <Card
      style={cardStyle}
      styles={{ body: { padding: 20 } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
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
          color: CARD_TITLE_COLOR,
          textAlign: "left",
          marginBottom: 8,
        }}
      >
        {t(`features.${index}.title`)}
      </Title>
      <Paragraph
        style={{
          fontFamily: "var(--font-poppins)",
          fontWeight: 300,
          color: CARD_TEXT_COLOR,
          textAlign: "left",
          marginBottom: 0,
        }}
      >
        {t(`features.${index}.description`)}
      </Paragraph>
    </Card>
  );
}

/**
 * Key features section with radial gradient (light center, dark edges) and white feature cards.
 * @returns {JSX.Element}
 * @example
 * <Features />
 */
export default function Features() {
  const t = useTranslations("Features");

  const GAP = 24;
  const middleRowCardWidth = `calc((100% - ${GAP}px) / 2)`;

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
          boxShadow:
            "0 8px 24px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Title
          level={2}
          style={{
            fontFamily: "var(--font-raleway)",
            fontWeight: 500,
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
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
              <div key={iconSrc} style={{ minHeight: 0, perspective: 1000 }}>
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
                style={{
                  width: middleRowCardWidth,
                  minWidth: 0,
                  minHeight: 0,
                  perspective: 1000,
                }}
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
              <div key={iconSrc} style={{ minHeight: 0, perspective: 1000 }}>
                <FeatureCard iconSrc={iconSrc} index={i + 5} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
