import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  news, InsertNews,
  services, InsertService,
  stations, InsertStation,
  courses, InsertCourse,
  galleryItems, InsertGalleryItem,
  serviceRequests, InsertServiceRequest,
  volunteers, InsertVolunteer,
  emergencyStats, InsertEmergencyStat,
  institutionalInfo, InsertInstitutionalInfo
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// News queries
export async function getNews(limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(news).where(eq(news.status, 'published')).orderBy(desc(news.publishedAt)).limit(limit).offset(offset);
}

export async function getNewsBySlug(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result[0];
}

export async function createNews(data: InsertNews) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  const result = await db.insert(news).values(data);
  return result;
}

export async function updateNews(id: number, data: Partial<InsertNews>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(news).set(data).where(eq(news.id, id));
}

export async function deleteNews(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.delete(news).where(eq(news.id, id));
}

// Services queries
export async function getServices() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).orderBy(services.order);
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result[0];
}

export async function createService(data: InsertService) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(services).values(data);
}

export async function updateService(id: number, data: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(services).set(data).where(eq(services.id, id));
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.delete(services).where(eq(services.id, id));
}

// Stations queries
export async function getStations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(stations).orderBy(stations.name);
}

export async function getStationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(stations).where(eq(stations.id, id)).limit(1);
  return result[0];
}

export async function createStation(data: InsertStation) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(stations).values(data);
}

export async function updateStation(id: number, data: Partial<InsertStation>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(stations).set(data).where(eq(stations.id, id));
}

export async function deleteStation(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.delete(stations).where(eq(stations.id, id));
}

// Courses queries
export async function getCourses(limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courses).orderBy(desc(courses.startDate)).limit(limit).offset(offset);
}

export async function getCourseById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return result[0];
}

export async function createCourse(data: InsertCourse) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(courses).values(data);
}

export async function updateCourse(id: number, data: Partial<InsertCourse>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(courses).set(data).where(eq(courses.id, id));
}

export async function deleteCourse(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.delete(courses).where(eq(courses.id, id));
}

// Gallery queries
export async function getGalleryItems(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(galleryItems).where(eq(galleryItems.category, category)).orderBy(galleryItems.order);
  }
  return db.select().from(galleryItems).orderBy(galleryItems.order);
}

export async function getGalleryItemById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(galleryItems).where(eq(galleryItems.id, id)).limit(1);
  return result[0];
}

export async function createGalleryItem(data: InsertGalleryItem) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(galleryItems).values(data);
}

export async function updateGalleryItem(id: number, data: Partial<InsertGalleryItem>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(galleryItems).set(data).where(eq(galleryItems.id, id));
}

export async function deleteGalleryItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.delete(galleryItems).where(eq(galleryItems.id, id));
}

// Service Requests queries
export async function getServiceRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt));
}

export async function getServiceRequestById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(serviceRequests).where(eq(serviceRequests.id, id)).limit(1);
  return result[0];
}

export async function createServiceRequest(data: InsertServiceRequest) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(serviceRequests).values(data);
}

export async function updateServiceRequest(id: number, data: Partial<InsertServiceRequest>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(serviceRequests).set(data).where(eq(serviceRequests.id, id));
}

// Volunteers queries
export async function getVolunteers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(volunteers).orderBy(desc(volunteers.createdAt));
}

export async function getVolunteerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(volunteers).where(eq(volunteers.id, id)).limit(1);
  return result[0];
}

export async function createVolunteer(data: InsertVolunteer) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(volunteers).values(data);
}

export async function updateVolunteer(id: number, data: Partial<InsertVolunteer>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(volunteers).set(data).where(eq(volunteers.id, id));
}

// Emergency Statistics queries
export async function getEmergencyStats(stationId?: number) {
  const db = await getDb();
  if (!db) return [];
  if (stationId) {
    return db.select().from(emergencyStats).where(eq(emergencyStats.stationId, stationId)).orderBy(desc(emergencyStats.date));
  }
  return db.select().from(emergencyStats).orderBy(desc(emergencyStats.date));
}

export async function createEmergencyStat(data: InsertEmergencyStat) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(emergencyStats).values(data);
}

export async function updateEmergencyStat(id: number, data: Partial<InsertEmergencyStat>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(emergencyStats).set(data).where(eq(emergencyStats.id, id));
}

// Institutional Info queries
export async function getInstitutionalInfo(section?: string) {
  const db = await getDb();
  if (!db) return [];
  if (section) {
    return db.select().from(institutionalInfo).where(eq(institutionalInfo.section, section)).orderBy(institutionalInfo.order);
  }
  return db.select().from(institutionalInfo).orderBy(institutionalInfo.order);
}

export async function createInstitutionalInfo(data: InsertInstitutionalInfo) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(institutionalInfo).values(data);
}

export async function updateInstitutionalInfo(id: number, data: Partial<InsertInstitutionalInfo>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(institutionalInfo).set(data).where(eq(institutionalInfo.id, id));
}
