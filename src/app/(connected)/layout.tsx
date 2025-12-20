import NavMenu from "@/components/nav/nav-menu";

export default function ConnectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavMenu />
      <main>{children}</main>
    </div>
  );
}
