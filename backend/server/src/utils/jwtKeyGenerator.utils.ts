import crypto from "crypto";
import fs from "fs";
import path from "path";

function generateJWTKey(): string {
  const key = crypto.randomBytes(64).toString("hex");
  return key;
}

function writeJWTKeyToFile(key: string): void {
  const envFilePath = path.join(".env");
  let envContent = "";
  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, "utf-8");
  }
  if (!envContent.includes("JWT_KEY=")) {
    envContent += `JWT_KEY="${key}"\n`;
    fs.writeFileSync(envFilePath, envContent, { flag: "w" });
  }
}

function generateAndWriteJWTKey(): void {
  const jwtKey = generateJWTKey();
  writeJWTKeyToFile(jwtKey);
}

generateAndWriteJWTKey();

export { generateAndWriteJWTKey };
