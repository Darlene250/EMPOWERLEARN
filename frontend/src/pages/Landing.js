import React from 'react';
import { Link } from 'react-router-dom';
import '../Landing.css';

const Landing = () => {
  return (
    <div className="landing-body">
      {/* NAV */}
      <nav className="landing-nav">
        <div className="nav-brand">Empower<span>Learn</span></div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#who">Who it is for</a>
          <Link to="/login" className="nav-cta">Sign in</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-bg">
        <section className="hero">
          <div className="hero-label">Digital Learning Platform</div>
          <h1 className="hero-headline">
            Education that fits<br />
            <em>your</em> life, not the<br />
            other way around.
          </h1>
          <p className="hero-sub">
            Free, flexible courses for women who are returning to education
            after a pause. Learn on your terms, track your progress, and
            keep moving forward.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn-primary">Start learning</Link>
            <a href="#how" className="btn-ghost">See how it works</a>
          </div>
        </section>
      </div>

      {/* STATS */}
      <div className="stats-strip">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="stat-num">12<span>k</span></div>
            <div className="stat-desc">Women enrolled across Africa</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">4<span>+</span></div>
            <div className="stat-desc">Countries reached</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">100<span>%</span></div>
            <div className="stat-desc">Free to access</div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="landing-section" id="how">
        <div className="section-label">How it works</div>
        <div className="how-grid">

          <div className="how-step">
            <div className="step-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <div className="step-title">Create your account</div>
              <div className="step-body">Sign in with Google in one step. No forms to fill out before you get started.</div>
            </div>
          </div>

          <div className="how-step">
            <div className="step-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <div>
              <div className="step-title">Set your learning goal</div>
              <div className="step-body">Tell us what you want to achieve. We use that to surface courses relevant to you.</div>
            </div>
          </div>

          <div className="how-step">
            <div className="step-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <div>
              <div className="step-title">Browse and enroll</div>
              <div className="step-body">Search thousands of free video courses by topic. Enroll in as many as you like.</div>
            </div>
          </div>

          <div className="how-step">
            <div className="step-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div>
              <div className="step-title">Learn at your pace</div>
              <div className="step-body">Watch when you can, mark lessons complete, and track your progress on your dashboard.</div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <div className="features-section" id="features">
        <div className="features-inner">
          <div className="features-header">
            <h2 className="features-headline">
              Built around the way<br />
              you actually learn.
            </h2>
            <p className="features-desc">
              Every feature in EmpowerLearn is designed for women who are
              balancing education with real life. No rigid schedules,
              no pressure, no cost.
            </p>
          </div>

          <div className="features-list">

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
              </div>
              <div className="feature-title">Learn from any device</div>
              <div className="feature-body">Works on your phone, tablet, or computer. No app download required.</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div className="feature-title">Self-paced courses</div>
              <div className="feature-body">No deadlines. Pause and resume whenever life gets in the way and pick up where you left off.</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
              </div>
              <div className="feature-title">Thousands of free videos</div>
              <div className="feature-body">Courses sourced from YouTube at no cost. Search any topic and find quality content instantly.</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div className="feature-title">Track what you have done</div>
              <div className="feature-body">Mark lessons complete and watch your progress grow. Your dashboard shows how far you have come.</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <div className="feature-title">Courses matched to your goal</div>
              <div className="feature-body">Set a learning goal and the platform surfaces courses directly relevant to what you want to achieve.</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div className="feature-title">Your journey in one place</div>
              <div className="feature-body">Enrolled courses, progress, and personal details are saved and always accessible from your profile.</div>
            </div>

          </div>
        </div>
      </div>

      {/* WHO IT IS FOR */}
      <section className="who-section" id="who">
        <div className="who-grid">
          <div className="who-left">
            <h2>Who this is for</h2>
            <p>
              EmpowerLearn is built for women at every stage of their
              learning journey, with one thing in common: the need
              for flexibility.
            </p>
          </div>
          <div className="who-rows">
            <div className="who-row">
              <div className="who-role">Returning learners</div>
              <div className="who-desc">
                Women who paused their education due to family responsibilities,
                pregnancy, early marriage, or financial difficulty and are ready
                to continue on their own terms.
              </div>
            </div>
            <div className="who-row">
              <div className="who-role">Skill builders</div>
              <div className="who-desc">
                Women who want to learn something new, whether for a career
                change, a business idea, or personal confidence, without
                committing to a fixed program.
              </div>
            </div>
            <div className="who-row">
              <div className="who-role">Working mothers</div>
              <div className="who-desc">
                Women juggling children and household responsibilities who
                need a learning platform that works in short sessions,
                at any hour of the day.
              </div>
            </div>
            <div className="who-row">
              <div className="who-role">Instructors</div>
              <div className="who-desc">
                Educators and mentors who want to share knowledge with women
                across Africa by creating and uploading their own course content.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <div className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-headline">
            Your education does not<br />
            have to stop. <em>Start today.</em>
          </h2>
          <Link to="/login" className="btn-white">Create your account</Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-brand">Empower<span>Learn</span></div>
        <div className="footer-note">Built for women across Africa. Free to access.</div>
        <Link to="/login" className="footer-login">Sign in</Link>
      </footer>
    </div>
  );
};

export default Landing;
