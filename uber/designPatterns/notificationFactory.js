class NotificationFactory {
    static createNotification(type, options) {
        switch (type.toLowerCase()) {
            case "success":
                return new SuccessNotification(options);
            case "error":
                return new ErrorNotification(options);
            case "warning":
                return new WarningNotification(options);
            case "info":
                return new InfoNotification(options);
            default:
                throw new Error("Invalid notification type!");
        }
    }
}


class BaseNotification {
    constructor({ message, duration = 3000 }) {
        this.message = message;
        this.duration = duration;
    }

    render(color) {
        const notification = document.createElement("div");
        notification.innerText = this.message;
        notification.style.background = color;
        notification.style.color = "white";
        notification.style.padding = "10px";
        notification.style.margin = "10px 0";
        notification.style.borderRadius = "5px";
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, this.duration);
    }
}

class SuccessNotification extends BaseNotification {
    show() {
        this.render("green");
    }
}

class ErrorNotification extends BaseNotification {
    show() {
        this.render("red");
    }
}

class WarningNotification extends BaseNotification {
    show() {
        this.render("orange");
    }
}

class InfoNotification extends BaseNotification {
    show() {
        this.render("blue");
    }
}


const success = NotificationFactory.createNotification("success", {
    message: "🎉 Operation Successful!",
});
success.show();

const error = NotificationFactory.createNotification("error", {
    message: "❌ Something went wrong!",
});
error.show();

const warning = NotificationFactory.createNotification("warning", {
    message: "⚠️ This is a warning!",
});
warning.show();

const info = NotificationFactory.createNotification("info", {
    message: "ℹ️ Just an FYI!",
});
info.show();
