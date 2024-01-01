import mongoose from "mongoose";

const Connection = async (username, password) => {
  // mongodb+srv://abidsyed10892:<password>@cluster0.tqutqtw.mongodb.net/?retryWrites=true&w=majority
  const URL = `mongodb+srv://${username}:${password}@cluster0.tqutqtw.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database ", error);
  }
};

export default Connection;
