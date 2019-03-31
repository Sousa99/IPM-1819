var actual_screen;
var template;
var description_bar;
var friendsgroup = [];

function changeScreen(canvas, new_screen) {
    canvas.removeChild(actual_screen);
    actual_screen = new_screen;
    canvas.addChild(new_screen);

    canvas.removeChild(description_bar);
    description_bar.text = new_screen.description;
    if (new_screen.description_show) {
        canvas.addChild(description_bar);
    }

    canvas.removeChild(template);
    if (new_screen.template) {
        canvas.addChild(template);
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
        fill: "#FFFFFF"
    }).add();

    description_bar = canvas.display.text({
        x: canvas.width / 2,
        y: canvas.height / 2 - canvas.width / 14 / 8 * 6,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: get_size_px(canvas, 16),
        fill: white,
    }).add();

    // ------------------------------------------------ Logic and Canvas --------------------------------
    
    template = build_template(canvas);
    actual_screen = build_main_screen(canvas);

    canvas.addChild(build_frame(canvas));
    canvas.addChild(actual_screen);
    canvas.addChild(description_bar);

    canvas.setLoop(function () {
        var d = new Date();
        switch (actual_screen.description) {
            case descriptions[2]:
                actual_screen.date.text = ("0" + d.getDate()).slice(-2) + " / " + ("0" + (d.getMonth() + 1)).slice(-2) + " / " + d.getFullYear() + "\n";
                actual_screen.time.text = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
                break;

            case descriptions[11]:
                if (canvas.mouse.buttonState == "down" || canvas.touch.touchState == "down") actual_screen.active = true;
                else if (canvas.mouse.buttonState == "up" || canvas.touch.touchState == "up") {
                    changeScreen(canvas, build_lock_screen(canvas));
                }

                if (actual_screen.attempt == code)
                    changeScreen(canvas, build_menu_screen(canvas));
                break;
            
            case descriptions[12]:
                actual_screen.progress_circle_fingerprint.rotation++;
                actual_screen.progress_circle_fingerprint.end += actual_screen.progress_circle_fingerprint.touching;

                if (actual_screen.progress_circle_fingerprint.end >= 360) {
                    actual_screen.progress_circle_fingerprint.touching = 0;
                    actual_screen.progress_circle_fingerprint.end = 0;
                    changeScreen(canvas, build_menu_screen(canvas));
                }

                break;

            case descriptions[19]:
                if (!actual_screen.active && canvas.mouse.buttonState == "up") {
                    actual_screen.message_hold.text = health[38];
                } else if (actual_screen.active && canvas.mouse.buttonState == "up") {
                    actual_screen.message_hold.text = health[40];
                }
                
                if (actual_screen.active) {
                    actual_screen.audio_emergency.play();
                } else {
                    actual_screen.audio_emergency.pause();
                }
        }

        if (actual_screen.template)
            template.time.text = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    

        // TODO: Check if it's needed to update drawing of number of friend group
    });
    
    canvas.timeline.start();
    
}