"use client";

import { useEffect, useRef } from "react";
import { Layout, Space } from "antd";
import { motion, useMotionValue, animate } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const { Header } = Layout;

const NAV_LINKS = [
  { href: "#hero", labelKey: "home" },
  { href: "#about", labelKey: "about" },
  { href: "#features", labelKey: "keyFeatures" },
  { href: "#contact", labelKey: "contact" },
];

/** Same timing as Hero lighthouse beam for synced reveal */
const REVEAL_DURATION = 7.5;
const REVEAL_DELAY = 1.5;
const REVEAL_EASE = [0.33, 0.2, 0.2, 1];

/**
 * Top navigation with logo and section links.
 * Content reveals in sync with Hero beam (no beam on navbar).
 * @returns {JSX.Element}
 * @example
 * <Navbar />
 */
export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const beamSize = useMotionValue(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const controls = animate(beamSize, 250, {
      duration: REVEAL_DURATION,
      delay: REVEAL_DELAY,
      ease: REVEAL_EASE,
    });
    const unsub = beamSize.on("change", (v) => {
      wrapperRef.current?.style.setProperty("--beam-size", `${v}%`);
    });
    wrapperRef.current?.style.setProperty("--beam-size", "0%");
    return () => {
      controls.stop();
      unsub();
    };
  }, [beamSize]);

  return (
    <motion.div ref={wrapperRef} style={{ width: "100%" }}>
      <Header
        style={{
          background: "var(--project-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 50,
          paddingRight: 50,
          paddingBlock: 24,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="hero-content-reveal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Image
            src="/main_logo.png"
            alt={t("logoAlt")}
            width={240}
            height={80}
            style={{ height: "auto" }}
          />
          <Space size="large" style={{ paddingRight: 80 }}>
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={`${pathname}${href}`}
                className="nav-link"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: 18,
                }}
              >
                {t(labelKey)}
              </Link>
            ))}
          </Space>
        </div>
      </Header>
    </motion.div>
  );
}
