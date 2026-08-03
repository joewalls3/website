import { spawn } from "node:child_process";

const input = process.argv.slice(2);
const mode = input.includes("--strictPort") ? "start" : "dev";
const args = ["node_modules/next/dist/bin/next", mode];

for (let index = 0; index < input.length; index += 1) {
  const argument = input[index];

  if (argument === "--host") {
    args.push("--hostname", input[index + 1]);
    index += 1;
    continue;
  }

  if (argument === "--strictPort") continue;
  args.push(argument);
}

const child = spawn(process.execPath, args, { stdio: "inherit" });

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
