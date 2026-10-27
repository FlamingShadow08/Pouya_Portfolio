'use client';

import siteData from '@/data/siteData.json';

export default function Certificates() {
  const certs = siteData.certificates;

  return (
    <section id="certificates" className="section certificates-section">
      <h2 className="section-title cursor-target">مدارک و گواهینامه‌ها</h2>
      <div className="certificates-grid">
        {certs.map((cert) => (
          <article key={cert.id} className="cert-card cursor-target">
            <div className="cert-image-wrap">
              <img
                src={cert.image}
                alt={cert.title}
                className="cert-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect fill="%2312121a" width="300" height="200"/%3E%3Ctext fill="%230d9488" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="14"%3E' +
                    encodeURIComponent(cert.title) +
                    '%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <div className="cert-content">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-year">{cert.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
