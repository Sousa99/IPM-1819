function build_frame(canvas) {
    var frame = canvas.display.rectangle({
        description: "Frame",
        template: false,
        x: canvas.width / 2 - canvas.width / 14 - 8,
        y: canvas.height / 2 - canvas.width / 14 - 8,
        width: canvas.width / 7 + 16,
        height: canvas.width / 7 + 16,
        borderRadius : 20,
        fill: "#7F7F7F"
    });

    frame.camera = canvas.display.ellipse({
        x: frame.width / 2,
        y: 4,
        radius: 4,
        fill: "radial-gradient(#ffffff, #000000)",
    });

    frame.button_plus = canvas.display.rectangle({
        x: -9,
        y: 25,
        width: 10,
        height: 40,
        fill: "#7F7F7F",
        borderTopLeftRadius: 10
    });
    frame.symbol_plus = canvas.display.text({
        x: 2,
        y: 2,
        origin: { x: "left", y: "top" },
        family: "7Segments",
        font: "15px",
        text: "+",
        fill: "#000000"

    });
    frame.button_minus = canvas.display.rectangle({
        x: -9,
        y: 66,
        width: 10,
        height: 40,
        fill: "#7F7F7F",
        borderBottomLeftRadius: 10
    });
    frame.symbol_minus = canvas.display.text({
        x: 2,
        y: frame.button_minus.height - 2,
        origin: { x: "left", y: "bottom" },
        family: "7Segments",
        font: "15px",
        text: "-",
        fill: "#000000"

    });

    frame.button_back = canvas.display.rectangle({
        x: frame.width - 1,
        y: 25,
        width: 10,
        height: 40,
        fill: "#7F7F7F",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    });

    frame.button_back.bind("click tap", function() {
        switch(actual_screen.description) {
        case "Fingerprint Lock Screen":
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case "Menu Screen":
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case "Settings Screen":
            changeScreen(canvas, build_menu_screen(canvas));
            break;
        }
    });

    
    frame.button_minus.bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });
    frame.button_plus.bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });
    frame.button_back.bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    frame.addChild(frame.camera);
    frame.button_plus.addChild(frame.symbol_plus);
    frame.button_minus.addChild(frame.symbol_minus);
    frame.addChild(frame.button_plus);
    frame.addChild(frame.button_minus);
    frame.addChild(frame.button_back);

    return frame;
}

function build_template(canvas) {
    var template = canvas.display.rectangle({
        description: "Template",
        on: false,
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 90,
    });
    template.time = canvas.display.text({
        x: template.width - 12,
        y: 5,
        origin: { x: "right", y: "top" },
        family: "7Segments",
        font: "12px",
        fill: "#ffffff"
    });

    template.battery  = canvas.display.image({
        x: template.width / 7,
        y: 0.5,
        width: canvas.width / 90,
        height: canvas.width / 90,
        origin: { x: "left", y: "top" },
        image: "../../../Materials/Battery.png"
    });

    template.wifi  = canvas.display.image({
        x: template.width / 30,
        y: 0.5,
        width: canvas.width / 90,
        height: canvas.width / 90,
        origin: { x: "left", y: "top" },
        image: "../../../Materials/Wifi.png"
    });

    template.addChild(template.time);
    template.addChild(template.battery);
    template.addChild(template.wifi);

    return template;
}

function build_main_screen(canvas) {
    var main_screen = canvas.display.rectangle({
        description: "Main Screen",
        template: false,
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    main_screen.date = canvas.display.text({
        x: main_screen.width / 2,
        y: 30,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "15px",
        fill: "#ffffff"
    });
    main_screen.time = canvas.display.text({
        x: main_screen.width / 2,
        y: main_screen.height / 2,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "50px",
        fill: "#ffffff"
    });

    main_screen.number_friends = canvas.display.text({
        x: main_screen.width / 2,
        y: main_screen.height - 25,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "20px",
        fill: "#ffffff",
        text: friendsgroup.length,
    });
    main_screen.friends = canvas.display.text({
        x: main_screen.width / 2,
        y: main_screen.height - 10,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "10px",
        fill: "#ffffff",
        text: "FRIENDS GROUP"
    });

    main_screen.addChild(main_screen.date);
    main_screen.addChild(main_screen.time);
    main_screen.addChild(main_screen.number_friends);
    main_screen.addChild(main_screen.friends);

    main_screen.bind("click tap", function() {
        changeScreen(canvas, build_lock_screen_fingerprint(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    return main_screen;
}

function build_lock_screen_fingerprint(canvas) {
    var lock_screen = canvas.display.rectangle({
        description: "Fingerprint Lock Screen",
        template: false,
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    lock_screen.finger = canvas.display.image({
        x: lock_screen.width / 2,
        y: lock_screen.height / 2,
        width: 100,
        height: 100,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Fingerprint.png"
    });

    lock_screen.progress_circle_fingerprint = canvas.display.arc({
        x: lock_screen.width / 2,
        y: lock_screen.height / 2,
        radius: 60,
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

function build_menu_screen(canvas) {
    var menu_screen = canvas.display.rectangle({
        description: "Menu Screen",
        template: true,
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    menu_screen.contacts_menu_button = canvas.display.image({
        x: menu_screen.width / 4,
        y: menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Contacts.png"
    });
    menu_screen.gallery_menu_button = canvas.display.image({
        x: 2 * menu_screen.width / 4,
        y: menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Gallery.png"
    });
    menu_screen.group_menu_button = canvas.display.image({
        x: 3 * menu_screen.width / 4,
        y: menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Group.png"
    });
    menu_screen.maps_menu_button = canvas.display.image({
        x: menu_screen.width / 4,
        y: 2 * menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Maps.png"
    });
    menu_screen.camera_menu_button = canvas.display.image({
        x: 2 * menu_screen.width / 4,
        y: 2 * menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Camera.png"
    });
    menu_screen.health_menu_button = canvas.display.image({
        x: 3 * menu_screen.width / 4,
        y: 2 * menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Health.png"
    });
    menu_screen.settings_menu_button = canvas.display.image({
        x: 2 * menu_screen.width / 4,
        y: 3 * menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Settings.png"
    });
    
    menu_screen.addChild(menu_screen.contacts_menu_button);
    menu_screen.addChild(menu_screen.gallery_menu_button);
    menu_screen.addChild(menu_screen.group_menu_button);
    menu_screen.addChild(menu_screen.maps_menu_button);
    menu_screen.addChild(menu_screen.camera_menu_button);
    menu_screen.addChild(menu_screen.health_menu_button);
    menu_screen.addChild(menu_screen.settings_menu_button);

    menu_screen.settings_menu_button.bind("click tap", function() {
        changeScreen(canvas, build_settings_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    return menu_screen;
}

function build_settings_screen(canvas) {
    var settings_screen = canvas.display.rectangle({
        description: "Settings Screen",
        template: true,
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000",
    });
    settings_screen.security = canvas.display.text({
        x: 10,
        y: 10,
        text: "Screen Lock",
        fill: "#ffffff"
    });

    settings_screen.addChild(settings_screen.security);

    return settings_screen;
}