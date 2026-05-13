export const metadata = {
  title: 'Статия - Dimitar Dimitrov',
  description: 'Прочети статия за аквариуми',
  openGraph: {
    type: 'article' as const,
    siteName: 'Dimitar Dimitrov',
  },
};

export default function ReadArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
