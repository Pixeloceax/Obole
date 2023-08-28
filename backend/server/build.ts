// build.ts

import { execSync } from "child_process";

try {
  console.log("Starting TypeScript build...");
  execSync("npm run build", { stdio: "inherit" });
  console.log("TypeScript build completed successfully.");
} catch (error) {
  console.error("TypeScript build failed:", error);
  process.exit(1);
}
