"use client";

import { Button } from "antd";

const primaryStyle = {
  backgroundColor: "var(--text-on-dark)",
  color: "var(--project-bg)",
  border: "none",
  borderRadius: 24,
  fontFamily: "var(--font-raleway)",
  fontWeight: 500,
  padding: "12px 32px",
  height: 48,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
};

const secondaryStyle = {
  backgroundColor: "transparent",
  color: "var(--text-on-dark)",
  borderColor: "var(--text-on-dark)",
  borderRadius: 24,
  fontFamily: "var(--font-raleway)",
  fontWeight: 500,
  padding: "12px 32px",
  height: 48,
};

/**
 * Reusable CTA button for Hero, About, and ContactForm. Primary (filled) or secondary (outline).
 * @param {Object} props
 * @param {"primary"|"secondary"} [props.variant="primary"] - Visual variant
 * @param {string} [props.href] - If set, renders as link (Ant Design Button with href)
 * @param {string} [props.htmlType] - "submit" | "button" for form usage
 * @param {boolean} [props.block] - Full width when true
 * @param {React.ReactNode} props.children - Button label
 * @param {Object} [props.style] - Extra inline styles
 * @returns {JSX.Element}
 * @example
 * <CTAButton href="#contact">Get in touch</CTAButton>
 * <CTAButton variant="secondary" href="#about">Know more</CTAButton>
 * <CTAButton htmlType="submit" block>Submit</CTAButton>
 */
export default function CTAButton({
  variant = "primary",
  href,
  htmlType,
  block = false,
  children,
  style,
  ...rest
}) {
  const baseStyle = variant === "primary" ? primaryStyle : secondaryStyle;
  const isLink = Boolean(href);

  return (
    <Button
      size="large"
      href={href}
      htmlType={htmlType}
      block={block}
      style={{
        ...baseStyle,
        ...(block ? { height: 48 } : {}),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.opacity = "0.9";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        if (variant === "secondary") {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
