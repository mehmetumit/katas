module.exports = async function intensiveTask() {
  let n = 10000000000;
  let fac = 1;
  for (let i = 1; i <= n; i++) {
    fac = fac * i;
  }
  console.log("Intensive task finished");
}()
