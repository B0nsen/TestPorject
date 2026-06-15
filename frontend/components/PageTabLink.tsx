import Link from "next/link";

type PageTabLinkProps = {
  href: string;
  active: boolean;
  children: React.ReactNode;
};

export default function PageTabLink({
  href,
  active,
  children,
}: PageTabLinkProps) {
  return (
    <Link
      href={href}
      className={`font-normal text-[24px] text-center border-b ${
        active ? "border-current" : "border-transparent"
      }`}
    >
      {children}
    </Link>
  );
}
