if (Notification.permission === "granted") {
   
    new Notification("Welcome to my new web project! It's still a work in progress");
} else if (Notification.permission !== "denied") {
    
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            new Notification("Welcome to my new web project! It's still a work in progress");
        }
    });
}