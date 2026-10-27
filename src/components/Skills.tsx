'use client';

import siteData from '@/data/siteData.json';

function getBarColor(level: number) {
  if (level <= 4) return '#eab308'; // yellow
  if (level <= 7) return '#ea580c'; // dark orange
  return '#15803d'; // dark green
}

export default function Skills() {
  const skills = siteData.skills;

  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title cursor-target">مهارت‌ها</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-item cursor-target">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}/۱۰</span>
            </div>
            <div className="skill-bar-bg">
              <div
                className="skill-bar-fill"
                style={{
                  width: `${skill.level * 10}%`,
                  backgroundColor: getBarColor(skill.level)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
