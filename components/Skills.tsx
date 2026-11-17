import { skillGroups } from "@/lib/data";
import {
  IconSparkles,
  IconCpu,
  IconUsers,
  IconFileText,
  IconCheck,
  IconCode,
  IconLayers,
  IconDatabase,
} from "./Icons";

const skillCategoryIcons = [
  IconCode,     // Languages
  IconSparkles, // AI & ML
  IconCpu,      // Backend & Systems
  IconLayers,   // Frontend Modern
  IconDatabase, // Data & Infra
  IconUsers,    // AI-Powered Workflow
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="kicker">Năng lực cốt lõi</p>
          <h2>Công nghệ &amp; Hệ thống tôi làm chủ.</h2>
          <p className="section-sub">
            Từ phát triển hệ thống Go hiệu năng cao, ứng dụng Desktop Wails v2 đến các mô hình AI/RAG cá nhân hóa và xây dựng đội AI Agent tự động hóa quy trình.
          </p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const CategoryIcon = skillCategoryIcons[index % skillCategoryIcons.length];
            return (
              <article
                key={group.name}
                className="skill-group"
                data-reveal
                style={{ ["--delay" as string]: `${index * 90}ms` }}
              >
                <div className="skill-header">
                  <span className="skill-cat-icon" aria-hidden="true">
                    <CategoryIcon size={16} />
                  </span>
                  <span className="skill-tagline">{group.tagline}</span>
                </div>
                <h3>{group.name}</h3>
                <div className="chips">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Multi-Agent Orchestration Architecture Showcase */}
        <div className="agent-workflow-banner" data-reveal>
          <div className="agent-workflow-head">
            <div className="agent-workflow-badge">
              <IconSparkles size={14} /> AI-Native Engineering
            </div>
            <h3>Mô hình Đội ngũ AI Multi-Agent &amp; Siêu hiệu suất (10x Productivity)</h3>
            <p>
              Quy trình tự động hóa khép kín: Phân công nhiệm vụ cho mạng lưới Agent chuyên biệt, 
              thực thi song song và tối ưu hóa thời gian phát triển với sự kiểm định chất lượng (Human-in-the-Loop).
            </p>
          </div>

          <div className="agent-flow-steps">
            <div className="agent-flow-card flow-agent-main">
              <div className="agent-card-pill">
                <span className="pulse-dot-cyan" aria-hidden="true" />
                <IconCpu size={14} /> Điều phối (Orchestration)
              </div>
              <h4>Main Agent (Orchestrator)</h4>
              <p>
                Tiếp nhận mục tiêu sản phẩm, phân tích yêu cầu kỹ thuật, phân rã bài toán và 
                lập kế hoạch phân bổ tác vụ cho từng Subagent.
              </p>
              <div className="agent-tool-tags">
                <span>Claude Opus / 3.7</span>
                <span>Antigravity CLI</span>
                <span>OpenAI Codex</span>
                <span>OpenCode CLI</span>
              </div>
            </div>

            <div className="agent-flow-connector" aria-hidden="true">
              <div className="flow-stream-line">
                <span className="flow-stream-pulse" />
              </div>
              <span className="flow-arrow">→</span>
            </div>

            <div className="agent-flow-card flow-agent-sub">
              <div className="agent-card-pill">
                <span className="pulse-dot-green" aria-hidden="true" />
                <IconUsers size={14} /> Mạng lưới Subagents (Swarm)
              </div>
              <h4>Specialized Subagent Swarm</h4>
              <ul className="subagent-list">
                <li>
                  <strong>🔍 Research Agent:</strong> Đọc codebase, tra cứu tài liệu &amp; tìm best practice.
                </li>
                <li>
                  <strong>⚡ Code Author:</strong> Sinh mã Go/React 19/TS chuẩn Clean Architecture.
                </li>
                <li>
                  <strong>🧪 QA &amp; Verifier:</strong> Kiểm thử tự động, build check &amp; vá lỗi hồi quy.
                </li>
              </ul>
            </div>

            <div className="agent-flow-connector" aria-hidden="true">
              <div className="flow-stream-line">
                <span className="flow-stream-pulse" />
              </div>
              <span className="flow-arrow">→</span>
            </div>

            <div className="agent-flow-card flow-agent-human">
              <div className="agent-card-pill">
                <span className="pulse-dot-lime" aria-hidden="true" />
                <IconFileText size={14} /> Thẩm định &amp; Nghiệm thu
              </div>
              <h4>Human-in-the-Loop Review</h4>
              <p>
                Đội AI tự động tổng hợp báo cáo công việc, diff logs và checklist kiểm thử. 
                Tôi trực tiếp đọc, thẩm định chất lượng kiến trúc và phê duyệt phát hành.
              </p>
              <div className="agent-human-status">
                <IconCheck size={14} /> Tiết kiệm 80% thời gian thực thi thủ công
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
