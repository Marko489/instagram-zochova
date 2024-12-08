// src/app/(public)/layout.tsx

export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        {/* Empty layout */}
        <main>{children}</main>
      </div>
    );
  }