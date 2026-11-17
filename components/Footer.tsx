import { site } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#top" className="logo" aria-label="HAT Huỳnh Anh Tuấn" suppressHydrationWarning>
          <span className="monogram">{site.monogram}</span>{' '}
          <span className="logo-name">{site.name}</span>
        </a>
        <p>
          © {year} {site.name}. Bảo lưu mọi quyền.
        </p>
        <a href="#top" className="back-top">
          Lên đầu trang
        </a>
      </div>
    </footer>
  );
}
