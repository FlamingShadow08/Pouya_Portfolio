'use client';

import { useEffect, useState } from 'react';
import siteData from '@/data/siteData.json';
import PulseHeart from './PulseHeart';

interface LikeState {
  [projectId: string]: { liked: boolean; count: number };
}

export default function Portfolio({ visitorUuid }: { visitorUuid: string | null }) {
  const projects = siteData.portfolio;
  const [likes, setLikes] = useState<LikeState>({});

  useEffect(() => {
    if (!visitorUuid) return;
    projects.forEach(async (p) => {
      try {
        const res = await fetch(`/api/like?uuid=${visitorUuid}&projectId=${p.id}`);
        const data = await res.json();
        if (data.success) {
          setLikes((prev) => ({
            ...prev,
            [p.id]: { liked: data.liked, count: data.count }
          }));
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, [visitorUuid]);

  const handleLikeChange = async (projectId: string, liked: boolean, count: number) => {
    if (!visitorUuid) return;
    setLikes((prev) => ({ ...prev, [projectId]: { liked, count } }));
    try {
      await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: visitorUuid, projectId })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="portfolio" className="section portfolio-section">
      <h2 className="section-title cursor-target">نمونه‌کارها</h2>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <article key={project.id} className="portfolio-card cursor-target">
            <div className="portfolio-image-wrap">
              <img
                src={project.image}
                alt={project.title}
                className="portfolio-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"%3E%3Crect fill="%2312121a" width="400" height="250"/%3E%3Ctext fill="%237c3aed" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="18"%3E' +
                    encodeURIComponent(project.title) +
                    '%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <div className="portfolio-content">
              <h3 className="portfolio-title">{project.title}</h3>
              <p className="portfolio-desc">{project.description}</p>
              <div className="portfolio-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="portfolio-footer">
                <PulseHeart
                  defaultLiked={likes[project.id]?.liked || false}
                  count={likes[project.id]?.count || 0}
                  onChange={(liked, count) => handleLikeChange(project.id, liked, count)}
                  size={32}
                  likedColor="#c084fc"
                  idleColor="#71717a"
                  pillColor="#1a1a24"
                  textColor="#f5f5f7"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
