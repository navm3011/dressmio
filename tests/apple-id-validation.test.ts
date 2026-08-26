import { describe, expect, it } from "vitest";

/**
 * Test to validate Apple ID credentials are properly configured.
 * This test checks that the APPLE_ID and APPLE_ID_PASSWORD environment variables are set.
 */
describe("Apple ID Credentials", () => {
  it("should have APPLE_ID environment variable set", () => {
    const appleId = process.env.APPLE_ID;
    expect(appleId).toBeDefined();
    expect(appleId).toBeTruthy();
    expect(typeof appleId).toBe("string");
    // Validate it looks like an email
    expect(appleId!).toMatch(/@/);
  });

  it("should have APPLE_ID_PASSWORD environment variable set", () => {
    const applePassword = process.env.APPLE_ID_PASSWORD;
    expect(applePassword).toBeDefined();
    expect(applePassword).toBeTruthy();
    expect(typeof applePassword).toBe("string");
    // Validate it's not empty
    expect(applePassword!.length).toBeGreaterThan(0);
  });

  it("should have valid Apple ID format", () => {
    const appleId = process.env.APPLE_ID;
    // Basic email validation
    expect(appleId!).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
