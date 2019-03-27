var actual_screen;
var friendsgroup = [];

function changeScreen(canvas, new_screen, mode, template) {
    canvas.removeChild(actual_screen);
    actual_screen = new_screen;
    canvas.addChild(new_screen);

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
        stroke: "5px #0aa",
        touching: 0
    });

    lock_screen.addChild(finger);
    lock_screen.addChild(progress_circle_fingerprint);

    finger.bind("mousedown", function() {
        progress_circle_fingerprint.touching = 7;
    }).bind("mouseup", function() {
        progress_circle_fingerprint.touching = 0;
        progress_circle_fingerprint.end = 0;
    });

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

    template.addChild(time_template);

    // ------- Menu Screen --------

    var menu_screen = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    // ------------------------------------------------ Logic and Canvas --------------------------------

    canvas.addChild(frame);
    canvas.addChild(main_screen);

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