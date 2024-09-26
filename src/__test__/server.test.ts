import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe("GET /api", () => {
  test("should say hello world in json format", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Hola mundo");
  });
});

jest.mock("../config/db");

describe("Connect DB", () => {
  test("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Testing DB error connection"));
    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error al conectar con la base de datos")
    );
  });
});
