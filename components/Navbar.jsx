"use client";

import { Layout, Space } from "antd";
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

/**
 * Top navigation with logo and section links.
 * @returns {JSX.Element}
 * @example
 * <Navbar />
 */
export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  return (
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
            style={{
              color: "var(--text-on-dark)",
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
    </Header>
  );
}
