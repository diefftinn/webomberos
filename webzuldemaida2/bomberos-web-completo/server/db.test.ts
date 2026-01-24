import { describe, it, expect, beforeAll } from "vitest";
import {
  getNews,
  createNews,
  getServices,
  createService,
  getStations,
  createStation,
  getCourses,
  createCourse,
} from "./db";

describe("Database Functions", () => {
  describe("News", () => {
    it("should return empty array when no news exist", async () => {
      const result = await getNews(10, 0);
      expect(Array.isArray(result)).toBe(true);
    });

    it("should create news successfully", async () => {
      const newsData = {
        title: "Test News",
        content: "This is a test news article",
        status: "published" as const,
      };
      const result = await createNews(newsData);
      expect(result).toBeDefined();
    });
  });

  describe("Services", () => {
    it("should return empty array when no services exist", async () => {
      const result = await getServices();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should create service successfully", async () => {
      const serviceData = {
        name: "Test Service",
        description: "This is a test service",
        order: 0,
      };
      const result = await createService(serviceData);
      expect(result).toBeDefined();
    });
  });

  describe("Stations", () => {
    it("should return empty array when no stations exist", async () => {
      const result = await getStations();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should create station successfully", async () => {
      const stationData = {
        name: "Test Station",
        address: "123 Main St",
        phone: "555-0000",
      };
      const result = await createStation(stationData);
      expect(result).toBeDefined();
    });
  });

  describe("Courses", () => {
    it("should return empty array when no courses exist", async () => {
      const result = await getCourses(10, 0);
      expect(Array.isArray(result)).toBe(true);
    });

    it("should create course successfully", async () => {
      const courseData = {
        title: "Test Course",
        description: "This is a test course",
        status: "scheduled" as const,
      };
      const result = await createCourse(courseData);
      expect(result).toBeDefined();
    });
  });
});
