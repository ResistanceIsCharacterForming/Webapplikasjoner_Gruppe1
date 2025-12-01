import { describe, expect, it, vi } from 'vitest'

// Arrange
import { verifyToken } from "../utils/checkCredentials"

vi.mock("./checkCredentials", async () => {
  return {
    verifyToken: vi.fn().mockResolvedValue("123"),
  };
})

// Act
describe("check if the jwt is valid", () => {
  it("should successfully parse the jwt and give us the user id from the payload", async () => {
    const content = await verifyToken("eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM0ZTkzZmEwLWIzYjUtNDUzZS04NDhkLWJhOWQ1Zjc4ZDlhOCIsImlhdCI6MTc2Mzk0MTUyOSwiaXNzIjoidXJuOmV4YW1wbGU6aXNzdWVyIiwiYXVkIjoidXJuOmV4YW1wbGU6YXVkaWVuY2UiLCJleHAiOjE3NjM5NTk1Mjl9.vNopS0vNOST6BKB2Y9wMPaVdI7LA2wna5iJA0posyNI")
    // Assert
    expect(content).toBe("123")
  })
})

