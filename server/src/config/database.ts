import mongoose from "mongoose";
import { injectData } from "./injectData";
import User from "../models/User";

export async function connectToDatabase(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log("Connected to database. Checking documents...");
    await checkCollectionEmpty();
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
  const collectionName = "Recipe-App";
  const count = await User.countDocuments();

  if (count === 0) {
    console.log(`Collection ${collectionName} is empty! Injecting data...`);
    try {
      await injectData();
    } catch (injectError) {
      console.error("Error injecting data:", injectError);
    }
  } else {
    console.log(`Collection ${collectionName} has documents.`);
  }
}
