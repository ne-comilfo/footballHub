export default function FootballLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div>For all of football</div>
      {children}
    </main>
  );
}
