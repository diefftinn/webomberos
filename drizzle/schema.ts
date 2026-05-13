import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// News and Communications
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  imageKey: varchar("imageKey", { length: 255 }),
  author: varchar("author", { length: 255 }),
  publishedAt: timestamp("publishedAt").defaultNow(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

// Services
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 255 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  imageKey: varchar("imageKey", { length: 255 }),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// Fire Stations
export const stations = mysqlTable("stations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  commander: varchar("commander", { length: 255 }),
  personnel: int("personnel").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Station = typeof stations.$inferSelect;
export type InsertStation = typeof stations.$inferInsert;

// Courses and Training
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  instructor: varchar("instructor", { length: 255 }),
  startDate: varchar("startDate", { length: 50 }),
  endDate: varchar("endDate", { length: 50 }),
  capacity: int("capacity").default(0),
  enrolled: int("enrolled").default(0),
  location: varchar("location", { length: 255 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  imageKey: varchar("imageKey", { length: 255 }),
  status: mysqlEnum("status", ["scheduled", "ongoing", "completed", "cancelled"]).default("scheduled").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

// Gallery Items
export const galleryItems = mysqlTable("gallery_items", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  imageKey: varchar("imageKey", { length: 255 }),
  videoUrl: varchar("videoUrl", { length: 500 }),
  category: varchar("category", { length: 100 }),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;

// Service Requests
export const serviceRequests = mysqlTable("service_requests", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["inspection", "event", "other"]).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  description: text("description"),
  requestedDate: varchar("requestedDate", { length: 50 }),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "completed"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;

// Volunteers
export const volunteers = mysqlTable("volunteers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  birthDate: varchar("birthDate", { length: 50 }),
  idNumber: varchar("idNumber", { length: 20 }),
  experience: text("experience"),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "active", "inactive"]).default("pending").notNull(),
  joinDate: varchar("joinDate", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Volunteer = typeof volunteers.$inferSelect;
export type InsertVolunteer = typeof volunteers.$inferInsert;

// Emergency Statistics
export const emergencyStats = mysqlTable("emergency_stats", {
  id: int("id").autoincrement().primaryKey(),
  type: varchar("type", { length: 100 }).notNull(),
  stationId: int("stationId"),
  date: varchar("date", { length: 50 }),
  count: int("count").default(0),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmergencyStat = typeof emergencyStats.$inferSelect;
export type InsertEmergencyStat = typeof emergencyStats.$inferInsert;

// Institutional Information
export const institutionalInfo = mysqlTable("institutional_info", {
  id: int("id").autoincrement().primaryKey(),
  section: varchar("section", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  imageKey: varchar("imageKey", { length: 255 }),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type InstitutionalInfo = typeof institutionalInfo.$inferSelect;
export type InsertInstitutionalInfo = typeof institutionalInfo.$inferInsert;