import NavMenu from "@/components/nav/nav-menu";

export default function ConnectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavMenu />
      <main className="py-2 px-6">{children}</main>
    </div>
  );
}
