import request from "supertest";
import server from "../../server";

describe("POST api/v1/products", () => {
  test("Should display validation errors for empty product", async () => {
    const response = await request(server).post("/api/v1/products").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(3);
  });

  test("Should display validation errors for price not been greater than 0", async () => {
    const response = await request(server).post("/api/v1/products").send({
      name: "Testing product",
      price: -1,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });

  test("Should create a product", async () => {
    const response = await request(server).post("/api/v1/products").send({
      name: "Testing product",
      price: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET api/v1/products", () => {
  test("Should display all products", async () => {
    const response = await request(server).get("/api/v1/products");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET api/v1/products/:id", () => {
  test("Should return 400 if :id is not a valid id", async () => {
    const response = await request(server).get("/api/v1/products/not-valid");

    expect(response.status).toBe(400);
  });

  test("Should return 404 if product do not exist", async () => {
    const response = await request(server).get("/api/v1/products/2000");

    expect(response.status).toBe(404);
  });

  test("Should display the product", async () => {
    const response = await request(server).get("/api/v1/products/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PATCH api/v1/products/:id", () => {
  test("Should display validation errors for price not been greater than 0", async () => {
    const response = await request(server).patch("/api/v1/products/1").send({
      price: -1,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });

  test("Should return 404 if product do not exist", async () => {
    const response = await request(server)
      .patch("/api/v1/products/2000")
      .send({ name: "Testing product", price: 100 });

    expect(response.status).toBe(404);
  });

  test("Should update a product", async () => {
    const response = await request(server).patch("/api/v1/products/1").send({
      name: "Testing product",
      price: 10,
      isAvailable: false,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("DELETE api/v1/products/:id", () => {
  test("Should return 400 if :id is not a valid id", async () => {
    const response = await request(server).delete("/api/v1/products/not-valid");

    expect(response.status).toBe(400);
  });

  test("Should return 404 if product do not exist", async () => {
    const response = await request(server).delete("/api/v1/products/2000");

    expect(response.status).toBe(404);
  });

  test("Should delete the product", async () => {
    const response = await request(server).delete("/api/v1/products/1");

    expect(response.status).toBe(200);
  });
});
