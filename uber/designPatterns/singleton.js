class Logger {
    constructor() {
        if (!Logger.instance) {
            Logger.instance = this;
        }
        return Logger.instance;
    }

    log(message) {
        console.log(`[LOG]: ${message}`);
    }
}

const logger1 = new Logger();
const logger2 = new Logger();

logger1.log("User signed in!"); // [LOG]: User signed in!
logger2.log("User clicked a button!"); // [LOG]: User clicked a button!

console.log(logger1 === logger2); // true (Same instance)


class ConfigManager {
    constructor() {
        if (!ConfigManager.instance) {
            this.config = {
                apiUrl: "https://api.example.com",
                theme: "dark",
            };
            ConfigManager.instance = this;
        }
        return ConfigManager.instance;
    }

    getConfig() {
        return this.config;
    }

    setConfig(key, value) {
        this.config[key] = value;
    }
}

const config1 = new ConfigManager();
config1.setConfig("theme", "light");

const config2 = new ConfigManager();
console.log(config2.getConfig().theme); // light (Same instance)
