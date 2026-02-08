"use client";

import Image from "next/image";
import { Modal, Typography } from "antd";
import { useTranslations } from "next-intl";

const { Title, Paragraph } = Typography;

const overlayStyles = {
  mask: {
    backgroundColor: "rgba(60, 60, 60, 0.6)",
    backdropFilter: "blur(4px)",
  },
  content: {
    borderRadius: 24,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "2px solid #24A4FF",
    padding: 0,
    overflow: "hidden",
  },
  body: { padding: "40px 32px", textAlign: "center" },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#ffffff",
    border: "4px solid #24A4FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    boxShadow: "0 2px 12px rgba(36, 164, 255, 0.25)",
  },
  title: {
    margin: 0,
    marginBottom: 12,
    color: "#0e42a1",
    fontFamily: "var(--font-raleway)",
    fontWeight: 700,
    fontSize: 24,
  },
  bodyText: {
    margin: 0,
    color: "#333333",
    fontFamily: "var(--font-poppins)",
    fontSize: 15,
    lineHeight: 1.6,
  },
};

/**
 * Success overlay shown after contact form submission. White card with checkmark, title and message.
 * @param {Object} props
 * @param {boolean} props.visible - Whether the overlay is shown
 * @param {function} [props.onClose] - Called when overlay should close (e.g. backdrop click)
 * @returns {JSX.Element}
 * @example
 * <ContactSuccessOverlay visible={showSuccess} onClose={() => setShowSuccess(false)} />
 */
export default function ContactSuccessOverlay({ visible, onClose }) {
  const t = useTranslations("ContactForm");

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={420}
      styles={{
        mask: overlayStyles.mask,
        content: overlayStyles.content,
        body: overlayStyles.body,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={overlayStyles.iconWrap}>
          <Image
            src="/icons/cheque.png"
            alt=""
            width={44}
            height={44}
            style={{ objectFit: "contain" }}
          />
        </div>
        <Title level={3} style={overlayStyles.title}>
          {t("successTitle")}
        </Title>
        <Paragraph style={overlayStyles.bodyText}>
          {t("successMessage")}
        </Paragraph>
      </div>
    </Modal>
  );
}
