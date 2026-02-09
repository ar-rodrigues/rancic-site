"use client";

import { useState, useEffect } from "react";
import { Layout, Space, Drawer, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
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

/** Mobile menu order: HOME, KEY FEATURES, ABOUT, CONTACT */
const MOBILE_NAV_ORDER = ["#hero", "#features", "#about", "#contact"];

const MOBILE_NAV_LINKS = MOBILE_NAV_ORDER.map((href) =>
  NAV_LINKS.find((l) => l.href === href)
).filter(Boolean);

const drawerHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 16,
  borderBottom: "1px solid var(--gradient-accent)",
  fontFamily: "var(--font-poppins)",
  color: "var(--project-bg)",
  fontWeight: 700,
  textTransform: "uppercase",
};

const drawerLinkStyle = {
  display: "block",
  padding: "16px 0",
  fontFamily: "var(--font-poppins)",
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: 18,
  color: "var(--project-bg)",
};

const drawerFooterStyle = {
  marginTop: 24,
  fontFamily: "var(--font-poppins)",
  fontSize: 14,
  color: "var(--project-bg)",
};

/**
 * Top navigation with logo and section links. On viewports below 768px, shows
 * logo and hamburger; opening the menu reveals a slide-in drawer with MENU
 * title, nav links (HOME, KEY FEATURES, ABOUT, CONTACT), and "Located in Croatia".
 * @returns {JSX.Element}
 * @example
 * <Navbar />
 */
export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <Header
        style={{
          background: "var(--project-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: isMobile ? 16 : 50,
          paddingRight: isMobile ? 16 : 50,
          paddingBlock: 5,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
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
            style={{ height: "auto", maxWidth: isMobile ? 160 : 240 }}
          />
          {isMobile ? (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
              aria-label={t("menu")}
              style={{
                color: "var(--text-on-dark)",
                fontSize: 24,
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ) : (
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
          )}
        </div>
      </Header>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        closable={false}
        width="min(100vw - 48px, 360px)"
        styles={{
          body: {
            padding: 24,
            background: "var(--color-surface-inner)",
            fontFamily: "var(--font-poppins)",
          },
          wrapper: { zIndex: 1050 },
        }}
        title={
          <div style={drawerHeaderStyle}>
            <span>{t("menu")}</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              style={{
                color: "var(--project-bg)",
                fontSize: 20,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
        }
      >
        <nav>
          {MOBILE_NAV_LINKS.map(({ href, labelKey }) => (
            <div key={href}>
              <Link
                href={`${pathname}${href}`}
                onClick={() => setDrawerOpen(false)}
                style={drawerLinkStyle}
              >
                {t(labelKey)}
              </Link>
              <div
                style={{
                  height: 1,
                  background: "var(--gradient-accent)",
                  width: "100%",
                }}
              />
            </div>
          ))}
        </nav>
        <p style={drawerFooterStyle}>{t("locatedInCroatia")}</p>
      </Drawer>
    </>
  );
}
