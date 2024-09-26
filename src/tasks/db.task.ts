import { exit } from "node:process";
import db from "../config/db";

const cleanDb = async () => {
  try {
    await db.sync({ force: true });
    console.log("Datos eliminados con exito!");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv.includes("--clean")) {
  cleanDb();
}
