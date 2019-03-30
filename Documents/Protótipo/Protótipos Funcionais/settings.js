var build_lock_screen = build_lock_screen_fingerprint;
var lock_screen_type = "fingerprint";

function build_settings_screen(canvas) {
    var settings_screen = canvas.display.rectangle({
        description: descriptions[4],
        description_show: true,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: {x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black,
    });
    settings_screen.security = canvas.display.text({
        x: - settings_screen.width / 2 + settings_screen.width / 10,
        y: - 2 * settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[0],
        fill: white
    });
    settings_screen.language = canvas.display.text({
        x: - settings_screen.width / 2 + settings_screen.width / 10,
        y: - settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[1],
        fill: white
    });

    settings_screen.addChild(settings_screen.security);
    settings_screen.addChild(settings_screen.language);

    var links = add_lines(canvas, settings_screen, -2, 0);

    links[0].bind("click tap", function() {
        changeScreen(canvas, build_lock_settings_screen(canvas));
    });
    links[1].bind("click tap", function() {
        changeScreen(canvas, build_language_settings_screen(canvas));
    });

    return settings_screen;
}

function build_language_settings_screen(canvas) {
    var language_settings_screen = canvas.display.rectangle({
        description: descriptions[5],
        description_show: true,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: {x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black,
    });
    language_settings_screen.portuguese = canvas.display.text({
        x: - language_settings_screen.width / 2 + language_settings_screen.width / 10,
        y: - 2 * language_settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[2],
        fill: white
    });
    language_settings_screen.english = canvas.display.text({
        x: - language_settings_screen.width / 2 + language_settings_screen.width / 10,
        y: - language_settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[3],
        fill: white
    });

    language_settings_screen.addChild(language_settings_screen.portuguese);
    language_settings_screen.addChild(language_settings_screen.english);

    var active = -1;
    switch (language) {
        case "pt":
            active = 0;
            break;
        case "en":
            active = 1;
            break;
    }

    var links = add_lines(canvas, language_settings_screen, -2, 1, active);

    links[0].bind("click tap", function() {
        if (!links[0].active) {
            change_language("pt");
            changeScreen(canvas, build_changed_language_screen(canvas));
            setTimeout(function(){
                changeScreen(canvas, build_language_settings_screen(canvas));
            }, 1500);
        }
    });
    links[1].bind("click tap", function() {
        if (!links[1].active) {
            change_language("en");
            changeScreen(canvas, build_changed_language_screen(canvas));
            setTimeout(function(){
                changeScreen(canvas, build_language_settings_screen(canvas));
            }, 1500);
        };
    });

    return language_settings_screen;
}

function build_changed_language_screen(canvas) {
    var changed_language_screen = canvas.display.rectangle({
        description: descriptions[6],
        description_show: true,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: {x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black,
    });
    
    var message = canvas.display.text({
        x: 0,
        y: 0,
        origin: {x: "center", y: "center" },
        align: "center",
        text: settings[4],
        font: "25px",
        fill: white
    });

    changed_language_screen.addChild(message);

    return changed_language_screen;
}

function build_lock_settings_screen(canvas) {
    var lock_settings_screen = canvas.display.rectangle({
        description: descriptions[7],
        description_show: true,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: {x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black,
    });
    lock_settings_screen.none = canvas.display.text({
        x: - lock_settings_screen.width / 2 + lock_settings_screen.width / 10,
        y: - 2 * lock_settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[5],
        fill: white
    });
    lock_settings_screen.pin = canvas.display.text({
        x: - lock_settings_screen.width / 2 + lock_settings_screen.width / 10,
        y: - lock_settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[6],
        fill: white
    });
    lock_settings_screen.pattern = canvas.display.text({
        x: - lock_settings_screen.width / 2 + lock_settings_screen.width / 10,
        y: 0,
        origin: {x: "left", y: "center" },
        text: settings[7],
        fill: white
    });
    lock_settings_screen.fingerprint = canvas.display.text({
        x: - lock_settings_screen.width / 2 + lock_settings_screen.width / 10,
        y: + lock_settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[8],
        fill: white
    });

    lock_settings_screen.addChild(lock_settings_screen.none);
    lock_settings_screen.addChild(lock_settings_screen.pin);
    lock_settings_screen.addChild(lock_settings_screen.pattern);
    lock_settings_screen.addChild(lock_settings_screen.fingerprint);

    var active = -1;
    switch (lock_screen_type) {
        case "none":
            active = 0;
            break;
        case "pin":
            active = 1;
            break;
        case "pattern":
            active = 2;
            break;
        case "fingerprint":
            active = 3;
            break;
    }

    var links = add_lines(canvas, lock_settings_screen, -2, 1, active);

    links[0].bind("click tap", function() {
        if (!links[0].active) {
            lock_screen_type = "none";
            build_lock_screen = build_lock_screen_none;
            changeScreen(canvas, build_changed_lock_screen(canvas));
            setTimeout(function(){
                changeScreen(canvas, build_lock_settings_screen(canvas));
            }, 1500);
        }
    });
    links[1].bind("click tap", function() {
        if (!links[1].active) {
            lock_screen_type = "pin";
            build_lock_screen = build_lock_screen_pin;
            changeScreen(canvas, build_changed_lock_screen(canvas));
            setTimeout(function(){
                changeScreen(canvas, build_lock_settings_screen(canvas));
            }, 1500);
        };
    });
    links[2].bind("click tap", function() {
        if (!links[2].active) {
            lock_screen_type = "pattern";
            build_lock_screen = build_lock_screen_pattern;
            changeScreen(canvas, build_changed_lock_screen(canvas));
            setTimeout(function(){
                changeScreen(canvas, build_lock_settings_screen(canvas));
            }, 1500);
        };
    });
    links[3].bind("click tap", function() {
        if (!links[3].active) {
            lock_screen_type = "fingerprint";
            build_lock_screen = build_lock_screen_fingerprint;
            changeScreen(canvas, build_changed_lock_screen(canvas));
            setTimeout(function(){
                changeScreen(canvas, build_lock_settings_screen(canvas));
            }, 1500);
        };
    });

    return lock_settings_screen;
}

function build_changed_lock_screen(canvas) {
    var changed_lock_screen = canvas.display.rectangle({
        description: descriptions[8],
        description_show: true,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: {x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black,
    });
    
    var message = canvas.display.text({
        x: 0,
        y: 0,
        origin: {x: "center", y: "center" },
        align: "center",
        text: settings[9],
        font: "25px",
        fill: white
    });

    changed_lock_screen.addChild(message);

    return changed_lock_screen;
}

function build_lock_screen_none(canvas) {
    var lock_screen = canvas.display.rectangle({
        description: descriptions[9],
        description_show: true,
        template: false,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#A00000"
    });

    return lock_screen;
}

function build_lock_screen_pin(canvas) {
    var lock_screen = canvas.display.rectangle({
        description: descriptions[10],
        description_show: true,
        template: false,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#FF0000"
    });

    return lock_screen;
}

function build_lock_screen_pattern(canvas) {
    var lock_screen = canvas.display.rectangle({
        description: descriptions[11],
        description_show: true,
        template: false,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#00FF00"
    });

    return lock_screen;
}

function build_lock_screen_fingerprint(canvas) {
    var lock_screen = canvas.display.rectangle({
        description: descriptions[12],
        description_show: true,
        template: false,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    lock_screen.finger = canvas.display.image({
        x: 0,
        y: 0,
        width: 7 * lock_screen.width / 18,
        height: 7 * lock_screen.width / 18,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Fingerprint.png"
    });

    lock_screen.progress_circle_fingerprint = canvas.display.arc({
        x: 0,
        y: 0,
        radius: 9 * lock_screen.width / 36,
        start: 0,
        end: 0,
        stroke: "10px #0aa",
        touching: 0
    });

    lock_screen.addChild(lock_screen.finger);
    lock_screen.addChild(lock_screen.progress_circle_fingerprint);

    lock_screen.finger.bind("mousedown", function() {
        lock_screen.progress_circle_fingerprint.touching = 7;
    }).bind("mouseup", function() {
        lock_screen.progress_circle_fingerprint.touching = 0;
        lock_screen.progress_circle_fingerprint.end = 0;
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    return lock_screen;
}