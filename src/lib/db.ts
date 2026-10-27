import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dataDir, 'analytics.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

interface Visitor {
  uuid: string;
  ip: string;
  user_agent: string;
  device_name: string;
  first_visit: string;
  last_visit: string;
  visit_count: number;
}

interface Like {
  visitor_uuid: string;
  project_id: string;
  liked_at: string;
}

interface PageView {
  visitor_uuid: string | null;
  ip: string;
  user_agent: string;
  viewed_at: string;
}

interface DbData {
  visitors: Visitor[];
  likes: Like[];
  page_views: PageView[];
}

function readDb(): DbData {
  try {
    if (!fs.existsSync(dbPath)) {
      const initial: DbData = { visitors: [], likes: [], page_views: [] };
      fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw) as DbData;
  } catch {
    return { visitors: [], likes: [], page_views: [] };
  }
}

function writeDb(data: DbData) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

function parseDeviceName(ua: string): string {
  if (!ua) return 'Unknown';
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android';
  if (/Windows/i.test(ua)) return 'Windows PC';
  if (/Macintosh|Mac OS/i.test(ua)) return 'Mac';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Unknown Device';
}

export function getOrCreateVisitor(uuid: string, ip: string, userAgent: string) {
  const db = readDb();
  const now = new Date().toISOString();
  const deviceName = parseDeviceName(userAgent);

  const existing = db.visitors.find((v) => v.uuid === uuid);

  if (existing) {
    existing.last_visit = now;
    existing.visit_count += 1;
    existing.ip = ip;
    existing.user_agent = userAgent;
    existing.device_name = deviceName;
    writeDb(db);
    return existing;
  }

  const visitor: Visitor = {
    uuid,
    ip,
    user_agent: userAgent,
    device_name: deviceName,
    first_visit: now,
    last_visit: now,
    visit_count: 1
  };

  db.visitors.push(visitor);
  writeDb(db);
  return visitor;
}

export function recordPageView(uuid: string | null, ip: string, userAgent: string) {
  const db = readDb();
  db.page_views.push({
    visitor_uuid: uuid,
    ip,
    user_agent: userAgent,
    viewed_at: new Date().toISOString()
  });
  writeDb(db);
}

export function toggleLike(visitorUuid: string, projectId: string): { liked: boolean; count: number } {
  const db = readDb();
  const index = db.likes.findIndex(
    (l) => l.visitor_uuid === visitorUuid && l.project_id === projectId
  );

  if (index >= 0) {
    db.likes.splice(index, 1);
  } else {
    db.likes.push({
      visitor_uuid: visitorUuid,
      project_id: projectId,
      liked_at: new Date().toISOString()
    });
  }

  writeDb(db);

  const count = db.likes.filter((l) => l.project_id === projectId).length;
  return { liked: index < 0, count };
}

export function getLikeStatus(visitorUuid: string, projectId: string): { liked: boolean; count: number } {
  const db = readDb();
  const liked = db.likes.some(
    (l) => l.visitor_uuid === visitorUuid && l.project_id === projectId
  );
  const count = db.likes.filter((l) => l.project_id === projectId).length;
  return { liked, count };
}

export function getProjectLikeCount(projectId: string): number {
  const db = readDb();
  return db.likes.filter((l) => l.project_id === projectId).length;
}

export function getTotalStats() {
  const db = readDb();
  return {
    totalVisitors: db.visitors.length,
    totalViews: db.page_views.length,
    totalLikes: db.likes.length
  };
}
