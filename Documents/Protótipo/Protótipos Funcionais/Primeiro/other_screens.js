function build_frame(canvas) {
    var frame = canvas.display.rectangle({
        description: descriptions["frame"],
        description_show: false,
        template: false,
        emergency: 5,
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
        font: get_size_px(canvas, 16),
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
        font: get_size_px(canvas, 16),
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
        case descriptions["menu"]:
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case descriptions["settings"]:
            changeScreen(canvas, build_menu_screen(canvas));
            break;
        case descriptions["language_settings"]:
            changeScreen(canvas, build_settings_screen(canvas));
            break;
        case descriptions["lock_settings"]:
            changeScreen(canvas, build_settings_screen(canvas));
            break;
        case descriptions["no_lock"]:
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case descriptions["pin_lock"]:
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case descriptions["pattern_lock"]:
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case descriptions["fingerprint_lock"]:
            changeScreen(canvas, build_main_screen(canvas));
            break;
        case descriptions["health"]:
            changeScreen(canvas, build_menu_screen(canvas));
            break;  
        case descriptions["health_help"]:
            changeScreen(canvas, build_health_screen(canvas));
            break;
        case descriptions["heart_rate"]:
            changeScreen(canvas, build_health_screen(canvas));
            break;
        case descriptions["blood_pressure"]:
            changeScreen(canvas, build_health_screen(canvas));
            break;
        case descriptions["blood_oxygen"]:
            changeScreen(canvas, build_health_screen(canvas));
            break;
        case descriptions["sleep_time"]:
            changeScreen(canvas, build_health_screen(canvas));
            break;
        case descriptions["sos"]:
            changeScreen(canvas, build_menu_screen(canvas));
            break;
        case descriptions["sos_help"]:
            changeScreen(canvas, build_sos_screen(canvas));
            break;
        case descriptions["fitness"]:
            changeScreen(canvas, build_menu_screen(canvas));
            break;
        case descriptions["fitness_help"]:
            changeScreen(canvas, build_fitness_screen(canvas));
            break;
        case descriptions["energy"]:
            changeScreen(canvas, build_fitness_screen(canvas));
            break;
        case descriptions["activity"]:
            changeScreen(canvas, build_fitness_screen(canvas));
            break;
        case descriptions["nutrition"]:
            changeScreen(canvas, build_fitness_screen(canvas));
            break;
        case descriptions["choose_activity"]:
            changeScreen(canvas, build_activity_screen(canvas));
            break;
        }
    });

    frame.button_back.bind("mousedown touchstart", function() {
        var check = function() {
            if (canvas.mouse.buttonState == "down") {
                if (frame.emergency == 1) {
                    canvas.mouse.cancel();
                    canvas.touch.cancel();
                    changeScreen(canvas, build_sos_screen(canvas));
                    actual_screen.active = true;
                    actual_screen.message.fill = "radial-gradient(" + "#FF5555" + ", " + black + ")";
                    actual_screen.message_text.text = health["help_on_the_way"];
                    actual_screen.message_hold.text = health["press_5_seconds_cancel"];
                    actual_screen.message_hold.y = 0.50 * actual_screen.height / 10;
                }

                frame.emergency -= 1;
            }
    
        }

        setTimeout(check, 1000);
        setTimeout(check, 2000);
        setTimeout(check, 3000);
        setTimeout(check, 4000);
        setTimeout(check, 5000);
    });

    var non_lockables = [descriptions["main"], descriptions["changed_language"], descriptions["changed_lock"]];
    frame.button_lock.bind("click tap", function() {
        if (!non_lockables.includes(actual_screen.description))
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
        description: descriptions["template"],
        description_show: false,
        x: canvas.width / 2,
        y: canvas.height / 2 - 0.90 * canvas.width / 14,
        origin: {x: "center", y: "center"},
        width: canvas.width / 7,
        height: canvas.width / 90,
    });
    template.time = canvas.display.text({
        x: template.width / 2 - template.width / 10,
        y: 0,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: get_size_px(canvas, 12),
        fill: white
    });

    template.battery  = canvas.display.image({
        x: - template.width / 2 + template.width / 12 + canvas.width / 65,
        y: 0,
        width: canvas.width / 90,
        height: canvas.width / 90,
        origin: { x: "center", y: "center" },
        image: MATERIALS_DIR + "/Battery.png"
    });

    template.wifi  = canvas.display.image({
        x: - template.width / 2 + template.width / 12,
        y: 0,
        width: canvas.width / 90,
        height: canvas.width / 90,
        origin: { x: "center", y: "center" },
        image: MATERIALS_DIR + "/Wifi.png"
    });

    template.addChild(template.time);
    template.addChild(template.battery);
    template.addChild(template.wifi);

    return template;
}

function build_main_screen(canvas) {
    var main_screen = canvas.display.rectangle({
        description: descriptions["main"],
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
        font: get_size_px(canvas, 16),
        fill: white
    });
    main_screen.time = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: get_size_px(canvas, 50),
        fill: white
    });

    main_screen.number_friends = canvas.display.text({
        x: 0,
        y: main_screen.height / 2 - 2.5 * main_screen.height / 20,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: get_size_px(canvas, 20),
        fill: white,
        text: friendsgroup.length,
    });
    main_screen.friends = canvas.display.text({
        x: 0,
        y: main_screen.height / 2 - main_screen.height / 20,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: get_size_px(canvas, 10),
        fill: white,
        text: others["friends_group"]
    });

    main_screen.addChild(main_screen.date);
    main_screen.addChild(main_screen.time);
    main_screen.addChild(main_screen.number_friends);
    main_screen.addChild(main_screen.friends);

    main_screen.bind("click tap", function() {
        changeScreen(canvas, build_lock_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    return main_screen;
}

function build_menu_screen(canvas) {
    var menu_screen = canvas.display.rectangle({
        description: descriptions["menu"],
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
        image: MATERIALS_DIR + "/Contacts.png"
    });
    menu_screen.gallery_menu_button = canvas.display.image({
        x: 0,
        y: - menu_screen.height / 3.6,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: MATERIALS_DIR + "/Gallery.png"
    });
    menu_screen.group_menu_button = canvas.display.image({
        x: menu_screen.width / 3.6,
        y: - menu_screen.height / 3.6,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: MATERIALS_DIR + "/Group.png"
    });
    menu_screen.maps_menu_button = canvas.display.image({
        x: - menu_screen.width / 3.6,
        y: 0,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: MATERIALS_DIR + "/Maps.png"
    });
    menu_screen.camera_menu_button = canvas.display.image({
        x: 0,
        y: 0,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: MATERIALS_DIR + "/Camera.png"
    });
    menu_screen.health_menu_button = canvas.display.image({
        x: menu_screen.width / 3.6,
        y: 0,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: MATERIALS_DIR + "/Health.png"
    });
    menu_screen.settings_menu_button = canvas.display.image({
        x: 0,
        y: menu_screen.height / 3.6,
        width: menu_screen.width / 5,
        height: menu_screen.height / 5,
        origin: { x: "center", y: "center" },
        image: MATERIALS_DIR + "/Settings.png"
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