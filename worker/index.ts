import schedule from "node-schedule";
import watcher from "./watcher";
import worker from "./worker";

async function main() {
  await watcher();
  await worker();
  schedule.scheduleJob("*/5 * * * *", worker);
}

main();
