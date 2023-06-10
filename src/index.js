"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var https_1 = require("https");
var si = require("systeminformation");
var os = require("os");
// завдання 1
function runSequent(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var results, i, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[i], i)];
                case 2:
                    result = _a.sent();
                    results.push(result);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
var array = ["one", "two", "three"];
runSequent(array, function (item, index) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                item: item,
                index: index,
            }];
    });
}); }).then(function (results) {
    console.log(results);
});
// завдання 2
function arrayChangeDelete(arr, rule) {
    var deletedElements = [];
    var i = 0;
    while (i < arr.length) {
        if (rule(arr[i])) {
            deletedElements.push.apply(deletedElements, arr.splice(i, 1));
        }
        else {
            i++;
        }
    }
    return deletedElements;
}
var arr = [1, 2, 3, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17];
var deletedElements = arrayChangeDelete(arr, function (item) { return item % 2 === 0; });
console.log(array); // [1, 3, 7, 9, 11, 13, 15, 17]
console.log(deletedElements); // [2, 6, 10, 12, 14, 16]
// завдання 3
if (process.argv.length < 3) {
    console.error("Usage: node downloadPages.js <json_file_path>");
    process.exit(1);
}
var jsonFilePath = process.argv[2];
fs_1.default.readFile(jsonFilePath, function (err, data) {
    if (err) {
        console.error("Error reading JSON file: ".concat(err));
        process.exit(1);
    }
    var urls = JSON.parse(data.toString());
    var outputDirName = path_1.default.parse(jsonFilePath).name + "_pages";
    if (!fs_1.default.existsSync(outputDirName)) {
        fs_1.default.mkdirSync(outputDirName);
    }
    urls.forEach(function (url, index) {
        var outputFileName = path_1.default.join(outputDirName, "page_".concat(index, ".html"));
        https_1.default
            .get(url, function (res) {
            if (res.statusCode !== 200) {
                console.error("Error downloading page from ".concat(url, ": ").concat(res.statusCode));
                return;
            }
            var fileStream = fs_1.default.createWriteStream(outputFileName);
            res.pipe(fileStream);
            fileStream.on("finish", function () {
                console.log("Page saved to ".concat(outputFileName));
            });
        })
            .on("error", function (err) {
            console.error("Error downloading page from ".concat(url, ": ").concat(err));
        });
    });
});
// завдання 4
// Отримати параметр з командного рядка
var frequency = process.argv[3];
// Функція для отримання системної інформації та виведення її в консоль
function printSystemInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var system, cpu, mem, graphics, cpuInfo, batteryInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, si.osInfo()];
                case 1:
                    system = _a.sent();
                    return [4 /*yield*/, si.cpu()];
                case 2:
                    cpu = _a.sent();
                    return [4 /*yield*/, si.mem()];
                case 3:
                    mem = _a.sent();
                    return [4 /*yield*/, si.graphics()];
                case 4:
                    graphics = _a.sent();
                    console.log("Operating system:", system.distro);
                    console.log("Architecture:", os.arch());
                    console.log("Current user name:", os.userInfo().username);
                    console.log("CPU Cores Models:");
                    cpuInfo = os.cpus();
                    cpuInfo.forEach(function (core) {
                        console.log("- ".concat(core.model));
                    });
                    console.log("CPU temperature:", "".concat(cpu.temperature, " \u00B0C"));
                    console.log("Graphic controllers vendors and models:", graphics.controllers.map(function (controller) {
                        return "".concat(controller.vendor, " ").concat(controller.model);
                    }));
                    console.log("Total memory:", mem.total);
                    console.log("Used memory:", mem.used);
                    console.log("Free memory:", mem.free);
                    return [4 /*yield*/, si.battery()];
                case 5:
                    batteryInfo = _a.sent();
                    console.log("Battery charging: ".concat(batteryInfo.isCharging ? "Yes" : "No"));
                    console.log("Battery percent: ".concat(batteryInfo.percent));
                    console.log("Battery remaining time: ".concat(batteryInfo.timeRemaining));
                    return [2 /*return*/];
            }
        });
    });
}
// Викликати функцію через задану кількість секунд
setInterval(printSystemInfo, frequency * 1000);
var MyEventEmitter = /** @class */ (function () {
    function MyEventEmitter() {
        this.events = new Map();
    }
    MyEventEmitter.prototype.registerHandler = function (eventType, handler) {
        var _a;
        if (this.events.has(eventType)) {
            (_a = this.events.get(eventType)) === null || _a === void 0 ? void 0 : _a.push(handler);
        }
        else {
            this.events.set(eventType, [handler]);
        }
    };
    MyEventEmitter.prototype.unregisterHandler = function (eventType, handler) {
        var _a;
        if (!this.events.has(eventType)) {
            return;
        }
        var handlers = this.events.get(eventType);
        var index = (_a = handlers === null || handlers === void 0 ? void 0 : handlers.indexOf(handler)) !== null && _a !== void 0 ? _a : -1;
        if (index >= 0) {
            handlers === null || handlers === void 0 ? void 0 : handlers.splice(index, 1);
        }
    };
    MyEventEmitter.prototype.emitEvent = function (eventType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this.events.get(eventType);
        if (handlers) {
            for (var _a = 0, handlers_1 = handlers; _a < handlers_1.length; _a++) {
                var handler = handlers_1[_a];
                handler.apply(void 0, args);
            }
        }
    };
    return MyEventEmitter;
}());
var emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", function () {
    return console.log("Обліковий запис користувача оновлено");
});
emitter.emitEvent("userUpdated"); // Обліковий запис користувача оновлено
