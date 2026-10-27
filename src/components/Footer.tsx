'use client';

import siteData from '@/data/siteData.json';

interface FooterProps {
  stats: {
    totalVisitors: number;
    totalViews: number;
    totalLikes: number;
  } | null;
}

export default function Footer({ stats }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-name">{siteData.personal.name}</span>
          <span className="footer-title">{siteData.personal.title}</span>
        </div>

        <div className="footer-stats">
          {stats ? (
            <>
              <div className="stat-item">
                <span className="stat-value">{stats.totalViews.toLocaleString('fa-IR')}</span>
                <span className="stat-label">بازدید</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.totalVisitors.toLocaleString('fa-IR')}</span>
                <span className="stat-label">بازدیدکننده یکتا</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.totalLikes.toLocaleString('fa-IR')}</span>
                <span className="stat-label">لایک</span>
              </div>
            </>
          ) : (
            <span className="stat-loading">در حال بارگذاری آمار...</span>
          )}
        </div>

        <div className="footer-contact">
          <a href={`mailto:${siteData.personal.email}`} className="footer-email cursor-target">
            {siteData.personal.email}
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {siteData.personal.nameEn}. همه حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}
