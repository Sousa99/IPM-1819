function build_frame(canvas) {
    var frame = canvas.display.rectangle({
        description: descriptions[0],
        description_show: false,
        template: false,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7 + canvas.width / 125,
        height: canvas.width / 7 + canvas.width / 125,
        borderRadius : 20,
        fill: gray_frame
    });

    frame.camera = canvas.display.ellipse({
        x: 0,
        y: - frame.height / 2 + frame.height / 75,
        radius: frame.height / 85,
        fill: "radial-gradient(" + white + ", " + black + ")",
    });

    frame.button_plus = canvas.display.rectangle({
        x: - frame.width / 2 - frame.width / 35,
        y: - frame.height / 2 + frame.height / 10,
        width: 2 * frame.width / 50,
        height: 1.5 * frame.height / 10,
        fill: gray_frame,
        borderTopLeftRadius: 10
    });
    frame.symbol_plus = canvas.display.text({
        x: 2,
        y: 2,
        origin: { x: "left", y: "top" },
        family: "7Segments",
        font: "15px",
        text: "+",
        fill: black

    });
    frame.button_minus = canvas.display.rectangle({
        x: - frame.width / 2 - frame.width / 35,
        y: - frame.height / 2 + (2.5 + 0.1) * frame.height / 10,
        width: 2 * frame.width / 50,
        height: 1.5 * frame.height / 10,
        fill: gray_frame,
        borderBottomLeftRadius: 10
    });
    frame.symbol_minus = canvas.display.text({
        x: 2,
        y: frame.button_minus.height - 2,
        origin: { x: "left", y: "bottom" },
        family: "7Segments",
        font: "15px",
        text: "-",
        fill: black

    });

    frame.button_back = canvas.display.rectangle({
        x: frame.width / 2 - 1,
        y: - frame.height / 2 + frame.height / 10,
        width: 2 * frame.width / 50,
        height: 1.5 * frame.height / 10,
        fill: gray_frame,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    });
    frame.button_lock = canvas.display.rectangle({
        x: frame.width / 2 - 1,
        y: frame.height / 2 - frame.height / 10 - 1.5 * frame.height / 10,
        width: 2 * frame.width / 50,
        height: 1.5 * frame.height / 10,
        fill: gray_frame,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    });

    frame.button_back.bind("click tap", function() {
        switch(actual_screen.description) {
        case descriptions[3]:
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case descriptions[4]:
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case descriptions[5]:
            changeScreen(canvas, build_menu_screen(canvas));
            break;
        case descriptions[6]:
            changeScreen(canvas, build_settings_screen(canvas));
            break;
        case descriptions[8]:
            changeScreen(canvas, build_menu_screen(canvas));
            break;
        case descriptions[9]:
            changeScreen(canvas, build_health_screen(canvas));
            break;
        case descriptions[10]:
            changeScreen(canvas, build_health_screen(canvas));
            break;
        case descriptions[11]:
            changeScreen(canvas, build_heart_rate_screen(canvas));
            break;
        case descriptions[12]:
            changeScreen(canvas, build_blood_pressure_screen(canvas));
            break;
        case descriptions[13]:
            changeScreen(canvas, build_blood_oxygen_screen(canvas));
            break;  
        case descriptions[14]:
            changeScreen(canvas, build_sleep_time_screen(canvas));
            break; 
        }
    });

    frame.button_lock.bind("click tap", function() {
        if (actual_screen.description != descriptions[2])
            changeScreen(canvas, build_main_screen(canvas));
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
    frame.button_lock.bind("mouseenter", function () {
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
    frame.addChild(frame.button_lock);

    return frame;
}

function build_template(canvas) {
    var template = canvas.display.rectangle({
        description: descriptions[1],
        description_show: false,
        x: canvas.width / 2,
        y: 13.3 * canvas.height / 36,
        origin: {x: "center", y: "center"},
        width: canvas.width / 7,
        height: canvas.width / 90,
    });
    template.time = canvas.display.text({
        x: template.width / 2 - template.width / 10,
        y: 0,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "12px",
        fill: white
    });

    template.battery  = canvas.display.image({
        x: - template.width / 2 + template.width / 12 + canvas.width / 65,
        y: 0,
        width: canvas.width / 90,
        height: canvas.width / 90,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Battery.png"
    });

    template.wifi  = canvas.display.image({
        x: - template.width / 2 + template.width / 12,
        y: 0,
        width: canvas.width / 90,
        height: canvas.width / 90,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Wifi.png"
    });

    template.addChild(template.time);
    template.addChild(template.battery);
    template.addChild(template.wifi);

    return template;
}

function build_main_screen(canvas) {
    var main_screen = canvas.display.rectangle({
        description: descriptions[2],
        description_show: false,
        template: false,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    main_screen.date = canvas.display.text({
        x: 0,
        y: - main_screen.height / 2 + main_screen.height / 10,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "15px",
        fill: white
    });
    main_screen.time = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "50px",
        fill: white
    });

    main_screen.number_friends = canvas.display.text({
        x: 0,
        y: main_screen.height / 2 - 2.5 * main_screen.height / 20,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "20px",
        fill: white,
        text: friendsgroup.length,
    });
    main_screen.friends = canvas.display.text({
        x: 0,
        y: main_screen.height / 2 - main_screen.height / 20,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "10px",
        fill: white,
        text: others[0]
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
        description: descriptions[3],
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

function build_menu_screen(canvas) {
    var menu_screen = canvas.display.rectangle({
        description: descriptions[4],
        description_show: false,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    menu_screen.contacts_menu_button = canvas.display.image({
        x: - menu_screen.width / 3.6,
        y: - menu_screen.height / 3.6,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Contacts.png"
    });
    menu_screen.gallery_menu_button = canvas.display.image({
        x: 0,
        y: - menu_screen.height / 3.6,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Gallery.png"
    });
    menu_screen.group_menu_button = canvas.display.image({
        x: menu_screen.width / 3.6,
        y: - menu_screen.height / 3.6,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Group.png"
    });
    menu_screen.maps_menu_button = canvas.display.image({
        x: - menu_screen.width / 3.6,
        y: 0,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Maps.png"
    });
    menu_screen.camera_menu_button = canvas.display.image({
        x: 0,
        y: 0,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Camera.png"
    });
    menu_screen.health_menu_button = canvas.display.image({
        x: menu_screen.width / 3.6,
        y: 0,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Health.png"
    });
    menu_screen.settings_menu_button = canvas.display.image({
        x: 0,
        y: menu_screen.height / 3.6,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
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

    menu_screen.health_menu_button.bind("click tap", function() {
        changeScreen(canvas, build_health_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    return menu_screen;
}