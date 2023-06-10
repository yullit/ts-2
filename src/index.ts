import fs from "fs";
import path from "path";
import https from "https";
const si = require("systeminformation");
const os = require("os");

//task1
type Callback<T> = (item: T, index: number) => Promise<unknown>;

async function executeSequentially<T>(arr: T[], callback: Callback<T>): Promise<unknown[]> {
  const results: unknown[] = [];
  for (let i = 0; i < arr.length; i++) {
    const result = await callback(arr[i], i);
    results.push(result);
  }
  return results;
}

const array = ["one", "two", "three"];
executeSequentially(array, async (item, index) => {
  return {
    item,
    index,
  };
}).then((results) => {
  console.log(results);
});

//task2
function arrayChangeDelete<T>(arr: T[], rule: (item: T) => boolean): T[] {
  const deletedElements: T[] = [];
  let i = 0;

  while (i < arr.length) {
    if (rule(arr[i])) {
      deletedElements.push(...arr.splice(i, 1));
    } else {
      i++;
    }
  }

  return deletedElements;
}

const arr = [1, 2, 3, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const deletedElements = arrayChangeDelete(arr, (item) => item % 2 === 0);

console.log(array); // [1, 3, 7, 9, 11, 13, 15, 17]
console.log(deletedElements); // [2, 6, 10, 12, 14, 16]

//task3
if (process.argv.length < 3) {
  console.error("Usage: node downloadPages.js <json_file_path>");
  process.exit(1);
}

const jsonFilePath = process.argv[2];

fs.readFile(jsonFilePath, (err, data) => {
  if (err) {
    console.error(`Error reading JSON file: ${err}`);
    process.exit(1);
  }

  const urls = JSON.parse(data.toString());

  const outputDirName = path.parse(jsonFilePath).name + "_pages";
  if (!fs.existsSync(outputDirName)) {
    fs.mkdirSync(outputDirName);
  }

  urls.forEach((url: any, index: any) => {
    const outputFileName = path.join(outputDirName, `page_${index}.html`);

    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          console.error(
            `Error downloading page from ${url}: ${res.statusCode}`
          );
          return;
        }

        const fileStream = fs.createWriteStream(outputFileName);
        res.pipe(fileStream);

        fileStream.on("finish", () => {
          console.log(`Page saved to ${outputFileName}`);
        });
      })
      .on("error", (err) => {
        console.error(`Error downloading page from ${url}: ${err}`);
      });
  });
});

//task4

const frequency: any = process.argv[3];
async function printSystemInfo() {
  const system = await si.osInfo();
  const cpu = await si.cpu();
  const mem = await si.mem();
  const graphics = await si.graphics();

  console.log("Operating system:", system.distro);
  console.log("Architecture:", os.arch());
  console.log("Current user name:", os.userInfo().username);
  console.log("CPU Cores Models:");
  const cpuInfo = os.cpus();
  cpuInfo.forEach((core: any) => {
    console.log(`- ${core.model}`);
  });
  console.log("CPU temperature:", `${cpu.temperature} °C`);
  console.log(
    "Graphic controllers vendors and models:",
    graphics.controllers.map(
      (controller: { vendor: any; model: any }) =>
        `${controller.vendor} ${controller.model}`
    )
  );
  console.log("Total memory:", mem.total);
  console.log("Used memory:", mem.used);
  console.log("Free memory:", mem.free);

  const batteryInfo = await si.battery();
  console.log(`Battery charging: ${batteryInfo.isCharging ? "Yes" : "No"}`);
  console.log(`Battery percent: ${batteryInfo.percent}`);
  console.log(`Battery remaining time: ${batteryInfo.timeRemaining}`);
}

setInterval(printSystemInfo, frequency * 1000);

//task5
type MyEventHandler = (...args: any[]) => void;

class MyEventEmitter {
  private events: Map<string, MyEventHandler[]>;

  constructor() {
    this.events = new Map<string, MyEventHandler[]>();
  }

  public addListener(eventName: string, handler: MyEventHandler): void {
    if (this.events.has(eventName)) {
      this.events.get(eventName)?.push(handler);
    } else {
      this.events.set(eventName, [handler]);
    }
  }

  public removeListener(eventName: string, handler: MyEventHandler): void {
    if (!this.events.has(eventName)) {
      return;
    }

    const handlers = this.events.get(eventName);
    const index = handlers?.indexOf(handler) ?? -1;

    if (index >= 0) {
      handlers?.splice(index, 1);
    }
  }

  public emit(eventName: string, ...args: any[]): void {
    const handlers = this.events.get(eventName);

    if (handlers) {
      for (const handler of handlers) {
        handler(...args);
      }
    }
  }
}

const myEmitter = new MyEventEmitter();
myEmitter.addListener("userUpdated", () =>
  console.log("User account has been updated")
);
myEmitter.emit("userUpdated"); // User account has been updated
