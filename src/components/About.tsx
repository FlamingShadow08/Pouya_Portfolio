'use client';

import siteData from '@/data/siteData.json';

export default function About() {
  const { personal } = siteData;

  return (
    <section id="about" className="section about-section">
      <h2 className="section-title cursor-target">درباره من</h2>
      <div className="about-content">
        <p className="about-text">{personal.about}</p>
        <div className="about-meta">
          <div className="meta-item cursor-target">
            <span className="meta-label">سن</span>
            <span className="meta-value">{personal.age} سال</span>
          </div>
          <div className="meta-item cursor-target">
            <span className="meta-label">محل زندگی</span>
            <span className="meta-value">{personal.location}</span>
          </div>
          <div className="meta-item cursor-target">
            <span className="meta-label">ایمیل</span>
            <a href={`mailto:${personal.email}`} className="meta-value email-link">
              {personal.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
