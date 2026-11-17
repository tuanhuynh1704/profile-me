import { stats } from "@/lib/data";
import { IconSparkles } from "./Icons";

export default function StatsBar() {
  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, index) => (
            <div
              key={s.label}
              className="stat-card"
              data-reveal
              style={{ ["--delay" as string]: `${index * 90}ms` }}
            >
              <div className="stat-glow" aria-hidden="true" />
              <div className="stat-content">
                <span className="stat-number">{s.value}</span>
                <span className="stat-label">
                  <IconSparkles size={13} className="stat-icon" />
                  {s.label}
                </span>
                <span className="stat-note">{s.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
