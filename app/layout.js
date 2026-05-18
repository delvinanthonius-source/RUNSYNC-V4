export const metadata = {
  title: "RunSync — AI Running Coach",
  description: "Your personalized AI running coach. Kalkulasi kalori, program latihan, & rekomendasi makanan yang dipersonalisasi.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%235eead4'/%3E%3Cstop offset='100%25' stop-color='%23a78bfa'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='22' fill='url(%23g)'/%3E%3Ctext x='50' y='68' font-size='60' text-anchor='middle' font-family='sans-serif' font-weight='800' fill='%230a0a0f'%3E🏃%3C/text%3E%3C/svg%3E" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#050507", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
