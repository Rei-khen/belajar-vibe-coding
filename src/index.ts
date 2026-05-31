import { Elysia } from "elysia";
import { userRoutes } from "./routes/users";

const port = process.env.PORT || 3000;

const app = new Elysia()
  .get("/", () => ({
    message: "Welcome to Bun + ElysiaJS + Drizzle + MySQL API!",
    endpoints: {
      getUsers: "GET /users",
      createUser: "POST /users"
    }
  }))
  .use(userRoutes)
  .listen(port);

console.log(
  `🦊 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);
