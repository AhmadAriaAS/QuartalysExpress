module.exports = (rds) => {
  let Rawtime = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  let rawClock = Rawtime.split(":");
  let hours = parseInt(rawClock[0]);
  let inf = rawClock[2];

  if (hours >= 11 && inf.includes("AM")) return "Siang";
  if (hours >= 5 && inf.includes("AM")) return "Pagi";
  if (hours >= 7 && inf.includes("PM")) return "Malam";
  if (hours >= 3 && inf.includes("PM")) return "Sore";
};
