const { spawn, fork } = require("child_process");

args1 = ["-c", "stress --cpu 1 --timeout 20"];
args2 = ["-c", "stress --cpu 1 --timeout 10"];

console.log("Spawn new proc without blocking main thread");
proc1 = spawn("bash", args1);
console.log("Spawn new proc without blocking main thread");
proc2 = spawn("bash", args2);

proc1.stdout.on("data", (data) => {
  console.log("Proc1 finished");
  console.log(String(data));
});
proc2.stdout.on("data", (data) => {
  console.log("Proc2 finished");
  console.log(String(data));
});

console.log("Starting intensive task in main thread");
(async () => {
  console.log("Blocked");
  await require("./intensiveTask");
})();
console.log("Continue");

console.log("Starting intensive task using fork without blocking main thread");
(async () => {
  console.log("Not blocked");
  await (async () => {
    fork("./intensiveTask");
    fork("./intensiveTask");
    fork("./intensiveTask");
    fork("./intensiveTask");
  })();
})();
console.log("Continue");
