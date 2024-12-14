import mongoose from "mongoose";

export async function connectToDatabase(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log("Connected to database.");

    mongoose.connection.once("open", async () => {
      console.log("Connection is open. Checking documents...");
      await checkCollectionEmpty();
    });
  } catch (error) {
    console.error(
      "Error connecting to the database or running operations:",
      error
    );
  }
}

async function checkCollectionEmpty() {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database connection is not established.");
  }

  const count = await db.collection("yourCollection").countDocuments();
  if (count === 0) {
    console.log("Collection is empty!");
    // Perform initialization logic if necessary
  } else {
    console.log("Collection has documents.");
  }
}
