import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/#top" className="site-header__brand">
          Bean &amp; Brew
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link href="/#menu">Menu</Link>
          <Link href="/#hours">Hours</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
