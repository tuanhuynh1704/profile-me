import { IconGitHub, IconLinkedIn, IconArrowRight } from "./Icons";

const channels = [
  {
    label: "GitHub",
    href: "https://github.com/tuanhuynh1704",
    icon: "github" as const,
    note: "Xem mã nguồn các dự án",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tu%E1%BA%A5n-hu%E1%BB%B3nh-508540346/",
    icon: "linkedin" as const,
    note: "Kết nối và nhắn tin trực tiếp",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-panel">
          <div className="section-head" data-reveal>
            <p className="kicker">Liên hệ</p>
            <h2>Cùng làm một thứ đáng để dùng.</h2>
            <p className="section-sub">
              Mình phản hồi nhanh nhất qua LinkedIn và GitHub.
            </p>
          </div>
          <div className="contact-links">
            {channels.map((c, index) => (
              <a
                key={c.label}
                className="contact-link-card"
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Liên hệ qua ${c.label}`}
                data-reveal
                style={{ ["--delay" as string]: `${index * 90}ms` }}
              >
                <span className="contact-link-icon" aria-hidden="true">
                  {c.icon === "github" ? (
                    <IconGitHub size={26} />
                  ) : (
                    <IconLinkedIn size={26} />
                  )}
                </span>
                <span className="contact-link-body">
                  <span className="contact-link-title">{c.label}</span>
                  <span className="contact-link-note">{c.note}</span>
                </span>
                <IconArrowRight size={18} className="contact-link-arrow" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
