'use client';

import { useEffect, useState, useRef } from 'react';
import ProfileCard from '@/components/ProfileCard';
import TargetCursor from '@/components/TargetCursor';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Certificates from '@/components/Certificates';
import Footer from '@/components/Footer';
import siteData from '@/data/siteData.json';

export default function Home() {
  const [visitorUuid, setVisitorUuid] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalVisitors: number;
    totalViews: number;
    totalLikes: number;
  } | null>(null);
  const recordedRef = useRef(false);

  useEffect(() => {
    if (recordedRef.current) return;
    recordedRef.current = true;

    let uuid = localStorage.getItem('visitor_uuid');

    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('visitor_uuid', data.uuid);
          setVisitorUuid(data.uuid);
          setStats(data.stats);
        }
      })
      .catch(console.error);

    const interval = setInterval(() => {
      fetch('/api/visit')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setStats(data.stats);
        })
        .catch(() => {});
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleContact = () => {
    window.location.href = `mailto:${siteData.personal.email}`;
  };

  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.25}
        cursorColor="#ffffff"
        cursorColorOnTarget="#B497CF"
      />

      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo cursor-target">
            {siteData.personal.nameEn}
          </a>
          <ul className="nav-links">
            <li>
              <a href="#about" className="cursor-target">
                درباره من
              </a>
            </li>
            <li>
              <a href="#skills" className="cursor-target">
                مهارت‌ها
              </a>
            </li>
            <li>
              <a href="#portfolio" className="cursor-target">
                نمونه‌کارها
              </a>
            </li>
            <li>
              <a href="#certificates" className="cursor-target">
                مدارک
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="hero snap-section">
          <div className="hero-content">
            <ProfileCard
              name={siteData.personal.name}
              title={siteData.personal.title}
              handle={siteData.personal.handle}
              status={siteData.personal.status}
              contactText={siteData.personal.contactText}
              avatarUrl={siteData.personal.avatar}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={handleContact}
              behindGlowColor="rgba(124, 58, 237, 0.35)"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#4c1d958c 0%,#1e3a8a44 100%)"
            />
          </div>
        </section>

        <div className="main-container">
          <About />
          <Skills />
          <Portfolio visitorUuid={visitorUuid} />
          <Certificates />
        </div>
      </main>

      <Footer stats={stats} />
    </>
  );
}
