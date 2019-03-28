var actual_screen;
var description_bar;
var friendsgroup = [];

function changeScreen(canvas, new_screen, mode, template) {
    canvas.removeChild(actual_screen);
    actual_screen = new_screen;
    canvas.addChild(new_screen);
    description_bar.text = new_screen.description;
    description_bar.zindex = "front";

    if (mode == 2) {
        canvas.addChild(template);
    } else if (mode == 0) {
        canvas.removeChild(template);
    }
}

function loadCanvas() {
    canvas = document.getElementById("workzone");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    var canvas = oCanvas.create({
        canvas: "#workzone",
        fps: 60
    });
        
    var center = canvas.display.ellipse({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: canvas.width / 6,
        fill: "#fff"
    }).add();

    description_bar = canvas.display.text({
        x: canvas.width / 2,
        y: canvas.height / 2 - canvas.width / 17,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "20px",
        fill: "#ffffff",
    });
    
    // ------------------------------------------------ SCREENS CONSTRUCTION --------------------------------

    // ------- Frame --------
    var frame = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14 - 8,
        y: canvas.height / 2 - canvas.width / 14 - 8,
        width: canvas.width / 7 + 16,
        height: canvas.width / 7 + 16,
        borderRadius : 20,
        fill: "#7F7F7F"
    });

    var camera = canvas.display.ellipse({
        x: frame.width / 2,
        y: 4,
        radius: 4,
        fill: "radial-gradient(#ffffff, #000000)",
    });

    var button_plus = canvas.display.rectangle({
        x: -9,
        y: 25,
        width: 10,
        height: 40,
        fill: "#7F7F7F",
        borderTopLeftRadius: 10
    });
    var symbol_plus = canvas.display.text({
        x: 2,
        y: 2,
        origin: { x: "left", y: "top" },
        family: "7Segments",
        font: "15px",
        text: "+",
        fill: "#000000"

    });
    var button_minus = canvas.display.rectangle({
        x: -9,
        y: 66,
        width: 10,
        height: 40,
        fill: "#7F7F7F",
        borderBottomLeftRadius: 10
    });
    var symbol_minus = canvas.display.text({
        x: 2,
        y: button_minus.height - 2,
        origin: { x: "left", y: "bottom" },
        family: "7Segments",
        font: "15px",
        text: "-",
        fill: "#000000"

    });

    var button_back = canvas.display.rectangle({
        x: frame.width - 1,
        y: 25,
        width: 10,
        height: 40,
        fill: "#7F7F7F",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    });

    button_back.bind("click tap", function() {
        switch(actual_screen) {
        case lock_screen:
            changeScreen(canvas, main_screen, 1);
            break;
        case menu_screen:
            changeScreen(canvas, main_screen, 0, template);
            break;
        }      
    })

    
    button_minus.bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });
    button_plus.bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });
    button_back.bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    frame.addChild(camera);
    button_plus.addChild(symbol_plus);
    button_minus.addChild(symbol_minus);
    frame.addChild(button_plus);
    frame.addChild(button_minus);
    frame.addChild(button_back);
    
    // ------- Main Screen --------

    var main_screen = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    var date = canvas.display.text({
        x: main_screen.width / 2,
        y: 30,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "15px",
        fill: "#ffffff"
    });
    var time = canvas.display.text({
        x: main_screen.width / 2,
        y: main_screen.height / 2,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "50px",
        fill: "#ffffff"
    });

    var number_friends = canvas.display.text({
        x: main_screen.width / 2,
        y: main_screen.height - 25,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "20px",
        fill: "#ffffff",
        text: friendsgroup.length,
    });
    var friends = canvas.display.text({
        x: main_screen.width / 2,
        y: main_screen.height - 10,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "10px",
        fill: "#ffffff",
        text: "FRIENDS GROUP"
    });

    main_screen.addChild(date);
    main_screen.addChild(time);
    main_screen.addChild(number_friends);
    main_screen.addChild(friends);

    main_screen.bind("click tap", function() {
        changeScreen(canvas, lock_screen, 1)
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    // ------- Lock Screen --------

    var lock_screen = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    var finger = canvas.display.image({
        x: lock_screen.width / 2,
        y: lock_screen.height / 2,
        width: 100,
        height: 100,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Fingerprint.png"
    });

    var progress_circle_fingerprint = canvas.display.arc({
        x: lock_screen.width / 2,
        y: lock_screen.height / 2,
        radius: 60,
        start: 0,
        end: 0,
        stroke: "10px #0aa",
        touching: 0
    });

    lock_screen.addChild(finger);
    lock_screen.addChild(progress_circle_fingerprint);

    finger.bind("mousedown", function() {
        progress_circle_fingerprint.touching = 7;
    }).bind("mouseup", function() {
        progress_circle_fingerprint.touching = 0;
        progress_circle_fingerprint.end = 0;
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });;

    // ------- Template Screens ------

    var template = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
    });
    var time_template = canvas.display.text({
        x: template.width - 12,
        y: 5,
        origin: { x: "right", y: "top" },
        family: "7Segments",
        font: "12px",
        fill: "#ffffff"
    });

    var battery_template  = canvas.display.image({
        x: template.width /5,
        y: 0.5,
        width: canvas.width / 50,
        height: canvas.width / 50,
        origin: { x: "left", y: "top" },
        image: "../../../Materials/Battery.png"
    });

    var wifi_template  = canvas.display.image({
        x: template.width /20,
        y: 0.5,
        width: canvas.width / 60,
        height: canvas.width / 60,
        origin: { x: "left", y: "top" },
        image: "../../../Materials/Wifi.png"
    });

    template.addChild(time_template);
    template.addChild(battery_template);
    template.addChild(wifi_template);

    // ------- Menu Screen --------

    var menu_screen = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    var contacts_menu_button = canvas.display.image({
        x: menu_screen.width / 4,
        y: menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Contacts.png"
    });
    var gallery_menu_button = canvas.display.image({
        x: 2 * menu_screen.width / 4,
        y: menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Gallery.png"
    });
    var group_menu_button = canvas.display.image({
        x: 3 * menu_screen.width / 4,
        y: menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Group.png"
    });
    var maps_menu_button = canvas.display.image({
        x: menu_screen.width / 4,
        y: 2 * menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Maps.png"
    });
    var camera_menu_button = canvas.display.image({
        x: 2 * menu_screen.width / 4,
        y: 2 * menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Camera.png"
    });
    var health_menu_button = canvas.display.image({
        x: 3 * menu_screen.width / 4,
        y: 2 * menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Health.png"
    });
    var settings_menu_button = canvas.display.image({
        x: 2 * menu_screen.width / 4,
        y: 3 * menu_screen.height / 4,
        width: 50,
        height: 50,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Settings.png"
    });
    
    menu_screen.addChild(contacts_menu_button);
    menu_screen.addChild(gallery_menu_button);
    menu_screen.addChild(group_menu_button);
    menu_screen.addChild(maps_menu_button);
    menu_screen.addChild(camera_menu_button);
    menu_screen.addChild(health_menu_button);
    menu_screen.addChild(settings_menu_button);

    settings_menu_button.bind("mouseenter", function() {
        console.log("Entrou2");
        canvas.mouse.cursor("default");
    });

    // ------- Settings Screen --------

    var settings_screen = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000",
        description: "Settings"
    });
    var security = canvas.display.text({
        x: 10,
        y: 10,
        text: "Screen Lock",
        fill: "#ffffff"
    });

    settings_screen.addChild(security);

    // ------------------------------------------------ Logic and Canvas --------------------------------

    canvas.addChild(frame);
    canvas.addChild(main_screen);
    canvas.addChild(description_bar);

    actual_screen = main_screen;

    canvas.setLoop(function () {
        var d = new Date();
        date.text = ("0" + d.getDate()).slice(-2) + " / " + ("0" + (d.getMonth() + 1)).slice(-2) + " / " + d.getFullYear() + "\n";
        time.text = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        time_template.text = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        // TODO: Check if it's needed to update drawing of number of friend group


        progress_circle_fingerprint.rotation++;
        progress_circle_fingerprint.end += progress_circle_fingerprint.touching;

        if (progress_circle_fingerprint.end >= 360) {
            progress_circle_fingerprint.touching = 0;
            progress_circle_fingerprint.end = 0;
            changeScreen(canvas, menu_screen, 2, template);
        }
        
    });
    
    canvas.timeline.start();
    
}