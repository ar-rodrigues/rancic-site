import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = process.env.PUBLIC_SITE_URL || "https://rancic.com";
  return {
    title: {
      default: "Rancic",
      template: "%s | Ranci Software",
    },
    description:
      "Armatura: The Future of Steel Processing and Production Control. Discover our offerings and get in touch.",
    applicationName: "Ranci Software",
    referrer: "origin-when-cross-origin",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      locale,
      url: baseUrl,
      siteName: "Ranci Software",
      title: "Ranci Software",
      description:
        "Armatura: The Future of Steel Processing and Production Control. Discover our offerings and get in touch.",
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <AntdRegistry>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </AntdRegistry>
  );
}
