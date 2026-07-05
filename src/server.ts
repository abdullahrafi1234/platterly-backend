import app from "./app";
import prisma from "./config/db";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected");

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

main();

export default app;
