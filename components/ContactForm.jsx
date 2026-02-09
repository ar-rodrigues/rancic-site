"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Form, Input, Typography, message as antMessage } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CTAButton from "./CTAButton";
import ContactSuccessOverlay from "./ContactSuccessOverlay";
import { useContactSubmit } from "@/hooks/useContactSubmit";
import {
  SMOOTH_EASE,
  DESCENT_DURATION,
  sectionEntranceVariants,
} from "@/lib/sectionAnimation";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const labelStyle = {
  color: "var(--text-on-dark)",
  fontFamily: "var(--font-raleway)",
  fontWeight: 600,
};

const inputStyle = {
  background: "var(--input-bg-dark)",
  borderColor: "var(--input-border-dark)",
  color: "var(--text-on-dark)",
  fontFamily: "var(--font-raleway)",
  fontWeight: 600,
  borderRadius: 8,
};

const SUCCESS_OVERLAY_DURATION_MS = 5500;

/**
 * Contact form section with gradient background, center watermark and typography (Raleway/Poppins).
 * Submits to API and shows success overlay on success.
 * @returns {JSX.Element}
 * @example
 * <ContactForm />
 */
export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const [form] = Form.useForm();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const { submit, loading, error } = useContactSubmit();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (error) antMessage.error(error);
  }, [error]);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const onFinish = async (values) => {
    const ok = await submit(values);
    if (!ok) return;
    form.resetFields();
    setOverlayVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(
      () => setOverlayVisible(false),
      SUCCESS_OVERLAY_DURATION_MS
    );
  };

  return (
    <div
      ref={sectionRef}
      style={{
        width: "var(--container-width)",
        maxWidth: "var(--container-max-width)",
        margin: "0 auto",
        padding: "var(--section-vertical-padding) 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={{
          position: "relative",
          background: "var(--contact-form-gradient)",
          border: "none",
          borderRadius: "var(--card-radius)",
          width: "100%",
          padding: "48px 24px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
        initial="hidden"
        animate={inView ? "visible" : "leave"}
        variants={sectionEntranceVariants}
        transition={{
          duration: DESCENT_DURATION,
          ease: SMOOTH_EASE,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/alt_logo.png"
            alt=""
            width={820}
            height={820}
            style={{
              opacity: 0.12,
              objectFit: "contain",
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          <Title
            level={2}
            style={{
              color: "var(--text-on-dark)",
              fontFamily: "var(--font-raleway)",
              fontWeight: 500,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {t("title")}
          </Title>
          <Paragraph
            style={{
              color: "var(--text-on-dark)",
              fontFamily: "var(--font-poppins)",
              fontWeight: 400,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            {t("subtitle")}
          </Paragraph>
          <Form
            className="contact-form"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="website"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                overflow: "hidden",
                opacity: 0,
                margin: 0,
                padding: 0,
                pointerEvents: "none",
              }}
            >
              <Input tabIndex={-1} autoComplete="off" aria-hidden />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span style={labelStyle}>{t("email")}</span>}
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                placeholder={t("placeholderEmail")}
                size="large"
                style={inputStyle}
              />
            </Form.Item>
            <Form.Item
              name="name"
              label={<span style={labelStyle}>{t("name")}</span>}
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t("placeholderName")}
                size="large"
                style={inputStyle}
              />
            </Form.Item>
            <Form.Item
              name="message"
              label={<span style={labelStyle}>{t("message")}</span>}
              rules={[{ required: true }]}
            >
              <TextArea
                placeholder={t("placeholderMessage")}
                rows={4}
                size="large"
                style={{ ...inputStyle, resize: "none" }}
              />
            </Form.Item>
            <Form.Item>
              <CTAButton
                htmlType="submit"
                block
                loading={loading}
                disabled={loading}
              >
                {t("submit")}
              </CTAButton>
            </Form.Item>
          </Form>
        </div>
      </motion.div>
      <ContactSuccessOverlay
        visible={overlayVisible}
        onClose={() => {
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          setOverlayVisible(false);
        }}
      />
    </div>
  );
}
