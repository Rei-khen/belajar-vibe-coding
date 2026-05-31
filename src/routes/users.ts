import { Elysia, t } from "elysia";
import { db } from "../db/db";
import { users } from "../db/schema";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    try {
      const allUsers = await db.select().from(users);
      return { success: true, data: allUsers };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  })
  .post("/", async ({ body }) => {
    try {
      await db.insert(users).values({
        name: body.name,
        email: body.email,
      });
      return { success: true, message: "User created successfully" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
    })
  });
