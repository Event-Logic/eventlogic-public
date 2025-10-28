import { getTranslations } from 'next-intl/server';
import type { Locale } from "@/dictionaries";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'example' });

  const canonicalPath = locale === 'en' ? '/example' : '/exempel';
  
  return {
    title: `${t('title')} | Your Site Name`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}${canonicalPath}`,
      languages: {
        en: '/en/example',
        sv: '/sv/exempel',
      },
    },
  };
}

export default async function ExamplePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const t = await getTranslations('example');
  
  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}