import schedule from "node-schedule";
import watcher from "./watcher";
import worker from "./worker";

async function main() {
  schedule.scheduleJob("*/5 * * * *", worker);
  await watcher();
}

main();
