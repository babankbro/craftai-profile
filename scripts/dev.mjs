import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

// Local development runs at the domain root for a convenient localhost URL.
// Production builds omit this override and use /team from lib/site.ts.
process.env.NEXT_PUBLIC_BASE_PATH = "";

const nextCli = new URL("../node_modules/next/dist/bin/next", import.meta.url);
const child = spawn(process.execPath, [fileURLToPath(nextCli), "dev", ...process.argv.slice(2)], {
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
