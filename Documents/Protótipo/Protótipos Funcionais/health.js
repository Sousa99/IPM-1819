function build_health_template(canvas, screen, active) {
    var links = [];
    var colors = [white, white, white]

    colors[active] = "#e85151";

    screen.sos_bar = canvas.display.rectangle({
        x: 0,
        y: - 0.95 * screen.height / 3,
        origin: { x: "center", y: "center" },
        width: screen.width / 4,
        height: screen.width / 7,
        borderRadius : 0,
        fill: colors[1]
    });
    screen.sos_bar_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: get_size_px(canvas, 16),
        text: health[1],
        fill: black
    });
    
    screen.health_bar = canvas.display.rectangle({
        x: screen.width / 4 ,
        y: - 0.95 * screen.height / 3,
        origin: { x: "center", y: "center" },
        width: screen.width / 4,
        height: screen.width / 7,
        borderRadius : 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        fill: colors[2]
    });
    screen.health_bar_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: get_size_px(canvas, 14),
        text: health[2],
        fill: black,
        align: "center"
    });
    
    screen.fitness_bar = canvas.display.rectangle({
        x: - screen.width / 4 ,
        y: - 0.95 * screen.height / 3,
        origin: { x: "center", y: "center" },
        width: screen.width / 4,
        height: screen.width / 7,
        borderRadius : 0,
        fill: colors[0],
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    });
    screen.fitness_bar_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: get_size_px(canvas, 14),
        text: health[0],
        fill: black,
        align: "center"
    });

    links.push(screen.sos_bar);
    screen.addChild(screen.sos_bar);
    screen.sos_bar.addChild(screen.sos_bar_text);
    links.push(screen.health_bar);
    screen.addChild(screen.health_bar);
    screen.health_bar.addChild(screen.health_bar_text);
    links.push(screen.fitness_bar);
    screen.addChild(screen.fitness_bar);
    screen.fitness_bar.addChild(screen.fitness_bar_text);

    if (active != 0) {
        screen.fitness_bar.bind("click tap", function() {
            changeScreen(canvas, build_fitness_screen(canvas));
        }).bind("mouseenter", function () {
            canvas.mouse.cursor("pointer");
        }).bind("mouseleave", function () {
            canvas.mouse.cursor("default");
        });
    } if (active != 1) {
        screen.sos_bar.bind("click tap", function() {
            changeScreen(canvas, build_sos_screen(canvas));
        }).bind("mouseenter", function () {
            canvas.mouse.cursor("pointer");
        }).bind("mouseleave", function () {
            canvas.mouse.cursor("default");
        });
    } if (active != 2) {
        screen.health_bar.bind("click tap", function() {
            changeScreen(canvas, build_health_screen(canvas));
        }).bind("mouseenter", function () {
            canvas.mouse.cursor("pointer");
        }).bind("mouseleave", function () {
            canvas.mouse.cursor("default");
        });
    }
}

function build_health_screen(canvas){
    var health_screen = canvas.display.rectangle({
        description: descriptions[13],
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
    
    health_screen.health_help_button = canvas.display.image({
        x: health_screen.width / 2.5,
        y: health_screen.height / 2.5,
        width: health_screen.width / 10,
        height: health_screen.height / 10,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Help.png"
    });

    health_screen.heart_rate = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: - 1 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[3],
        fill: white,
    });
    health_screen.blood_pressure = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: - 0 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[4],
        fill: white,
    });
    health_screen.blood_oxygen = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: + 1 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[5],
        fill: white,
    });
    health_screen.sleep_time = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: + 2 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[6],
        fill: white,
    });
    
    health_screen.health_help_button.bind("click tap", function() {
        changeScreen(canvas, build_health_help_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    health_screen.addChild(health_screen.heart_rate);
    health_screen.addChild(health_screen.blood_pressure);
    health_screen.addChild(health_screen.blood_oxygen);
    health_screen.addChild(health_screen.sleep_time);
    links = add_lines(canvas, health_screen, -1, 0)

    links[0].bind("click tap", function() {
        changeScreen(canvas, build_heart_rate_screen(canvas));
    });
    links[1].bind("click tap", function() {
        changeScreen(canvas, build_blood_pressure_screen(canvas));
    });
    links[2].bind("click tap", function() {
        changeScreen(canvas, build_blood_oxygen_screen(canvas));
    });
    links[3].bind("click tap", function() {
        changeScreen(canvas, build_sleep_time_screen(canvas));
    });

    build_health_template(canvas, health_screen, 2);
    health_screen.addChild(health_screen.health_help_button);
    
    return health_screen;
}

function build_health_help_screen(canvas){
    var health_help_screen = canvas.display.rectangle({
        description: descriptions[14],
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
    
    health_help_screen.help_text = canvas.display.text({
        x: 0,
        y: - 2 * health_help_screen.height / 10,
        origin: {x: "center", y: "center" },
        font: get_size_px(canvas, 19),
        text: others[1],
        fill: white
    });

    health_help_screen.addChild(health_help_screen.help_text);

    return health_help_screen;
}

function build_heart_rate_screen(canvas) {
    var heart_rate_screen = canvas.display.rectangle({
        description: descriptions[15],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    heart_rate_screen.live = canvas.display.text({
        x: - heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
        y: - 1.5 * heart_rate_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[7],
        fill: white
    });

    heart_rate_screen.today = canvas.display.text({
        x: - heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
        y: - 0.5 * heart_rate_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[8],
        fill: white
    });

    heart_rate_screen.weekly = canvas.display.text({
        x: - heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
        y: + 0.5 * heart_rate_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[9],
        fill: white
    });

    heart_rate_screen.message = canvas.display.rectangle({
        x: 0,
        y: heart_rate_screen.height / 3,
        origin: {x: "center", y: "center" },
        width: heart_rate_screen.width / 4,
        height: heart_rate_screen.width / 4,
        borderRadius : 5,
        fill: white,
    });
    
    heart_rate_screen.message_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[10],
        fill: black
    });

    heart_rate_screen.addChild(heart_rate_screen.live);
    heart_rate_screen.addChild(heart_rate_screen.today);
    heart_rate_screen.addChild(heart_rate_screen.weekly);
    
    
    links = add_lines(canvas, heart_rate_screen, -1.5, 0)

    heart_rate_screen.message.addChild(heart_rate_screen.message_text);
    heart_rate_screen.addChild(heart_rate_screen.message);
    
    return heart_rate_screen;
}

function build_blood_pressure_screen(canvas) {
    var blood_pressure_screen = canvas.display.rectangle({
        description: descriptions[16],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

   blood_pressure_screen.systolic = canvas.display.text({
        x: - blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
        y: - 1.5 * blood_pressure_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[11],
        fill: white
    });

    blood_pressure_screen.diastolic = canvas.display.text({
        x: - blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
        y: - 0.5 * blood_pressure_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[12],
        fill: white
    });

    blood_pressure_screen.report = canvas.display.text({
        x: - blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
        y: + 0.5 * blood_pressure_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[13],
        fill: white
    });
    
    blood_pressure_screen.addChild(blood_pressure_screen.systolic);
    blood_pressure_screen.addChild(blood_pressure_screen.diastolic);
    blood_pressure_screen.addChild(blood_pressure_screen.report);

    links = add_lines(canvas, blood_pressure_screen, -1.5, 0)

    return blood_pressure_screen;
}

function build_blood_oxygen_screen (canvas){
    var blood_oxygen_screen = canvas.display.rectangle({
        description: descriptions[17],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    blood_oxygen_screen.today = canvas.display.text({
        x: - blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
        y: - 1.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[14],
        fill: white
    });

    blood_oxygen_screen.weekly = canvas.display.text({
        x: - blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
        y: - 0.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[15],
        fill: white
    });

    blood_oxygen_screen.report = canvas.display.text({
        x: - blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
        y: + 0.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[16],
        fill: white
    });

    blood_oxygen_screen.addChild(blood_oxygen_screen.today);
    blood_oxygen_screen.addChild(blood_oxygen_screen.weekly);
    blood_oxygen_screen.addChild(blood_oxygen_screen.report);

    links = add_lines(canvas, blood_oxygen_screen, -1.5, 0)

    return blood_oxygen_screen;

}

function build_sleep_time_screen (canvas){
    var sleep_time_screen = canvas.display.rectangle({
        description: descriptions[18],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    sleep_time_screen.today = canvas.display.text({
        x: - sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
        y: - 1.5 * sleep_time_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[17],
        fill: white
    });

    sleep_time_screen.weekly = canvas.display.text({
        x: - sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
        y: - 0.5 * sleep_time_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[18],
        fill: white
    });

    sleep_time_screen.report = canvas.display.text({
        x: - sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
        y: + 0.5 * sleep_time_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[19],
        fill: white
    });

    sleep_time_screen.addChild(sleep_time_screen.today);
    sleep_time_screen.addChild(sleep_time_screen.weekly);
    sleep_time_screen.addChild(sleep_time_screen.report);

    links = add_lines(canvas, sleep_time_screen, -1.5, 0)

    return sleep_time_screen;

}

function build_sos_screen (canvas){
    var sos_screen = canvas.display.rectangle({
        description: descriptions[19],
        description_show: false,
        template: true,
        active: false,
        audio_emergency: new Audio('../../../Materials/Emergency.mp3'),
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    sos_screen.live_monitoring = canvas.display.text({
        x: - sos_screen.width / 2 + sos_screen.width / 10,
        y: - 1 * sos_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[20],
        fill: white
    });

    sos_screen.emergency_delay = canvas.display.text({
        x: - sos_screen.width / 2 + sos_screen.width / 10,
        y: - 0 * sos_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[21],
        fill: white
    });
    
    sos_screen.circle_help_button = canvas.display.ellipse({
        x: sos_screen.width / 2.5,
        y: sos_screen.height / 2.5,
        radius: sos_screen.height / 15,
        fill: black
    });

    sos_screen.message = canvas.display.rectangle({
        x: 0,
        y: 1.10 * sos_screen.height / 4,
        origin: {x: "center", y: "center" },
        width: sos_screen.width / 1.2,
        height: 0.75 * sos_screen.width / 3,
        borderRadius : 5,
        fill: "radial-gradient(" + white + ", " + "#AAAAAA" + ")"
    });
    
    sos_screen.message_text = canvas.display.text({
        x: 0,
        y: -0.35 * sos_screen.height / 10,
        origin: { x: "center", y: "center" },
        align: "center",
        font: get_size_px(canvas, 17),
        text: health[37],
        fill: black,
    });
    sos_screen.message_hold = canvas.display.text({
        x: 0,
        y: 0.35 * sos_screen.height / 10,
        origin: { x: "center", y: "center" },
        align: "center",
        font: get_size_px(canvas, 17),
        text: health[38],
        fill: black,
    });

    sos_screen.sos_help_button = canvas.display.image({
        x: sos_screen.width / 2.5,
        y: sos_screen.height / 2.5,
        width: sos_screen.width / 10,
        height: sos_screen.height / 10,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Help.png"
    });

    sos_screen.addChild(sos_screen.live_monitoring);
    sos_screen.addChild(sos_screen.emergency_delay);
    links = add_lines(canvas, sos_screen, -1, 0)

    sos_screen.message.addChild(sos_screen.message_text);
    sos_screen.message.addChild(sos_screen.message_hold);
    sos_screen.addChild(sos_screen.message);

    build_health_template(canvas, sos_screen, 1);
    sos_screen.addChild(sos_screen.circle_help_button);
    sos_screen.addChild(sos_screen.sos_help_button);
    
    sos_screen.sos_help_button.bind("click tap", function() {
        changeScreen(canvas, build_sos_help_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    sos_screen.message.bind("mousedown touchstart", function() {
        var check = function() {
            if (canvas.mouse.buttonState == "down") {
                if (sos_screen.message_hold.text.indexOf("1") != -1) {
                    if (sos_screen.active) {
                        sos_screen.active = false;
                        sos_screen.message.fill = "radial-gradient(" + white + ", " + "#AAAAAA" + ")";
                        sos_screen.message_text.text = health[37];
                        sos_screen.message_hold.text = health[38];
                        sos_screen.message_hold.y = 0.35 * sos_screen.height / 10;
                    } else {
                        sos_screen.active = true;
                        sos_screen.message.fill = "radial-gradient(" + "#FF5555" + ", " + "#bc2b2b" + ")";
                        sos_screen.message_text.text = health[39];
                        sos_screen.message_hold.text = health[40];
                        sos_screen.message_hold.y = 0.50 * sos_screen.height / 10;
                    }
                }

                sos_screen.message_hold.text = sos_screen.message_hold.text.replace("2", "1");
                sos_screen.message_hold.text = sos_screen.message_hold.text.replace("3", "2");
                sos_screen.message_hold.text = sos_screen.message_hold.text.replace("4", "3");
                sos_screen.message_hold.text = sos_screen.message_hold.text.replace("5", "4");
            }
    
        }

        setTimeout(check, 1000);
        setTimeout(check, 2000);
        setTimeout(check, 3000);
        setTimeout(check, 4000);
        setTimeout(check, 5000);
    });

    sos_screen.message.bind("mouseup", function() {
        
    });

    return sos_screen;
}

function build_sos_help_screen(canvas){
    var sos_help_screen = canvas.display.rectangle({
        description: descriptions[20],
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
    
    sos_help_screen.help_text = canvas.display.text({
        x: 0,
        y: - 2 * sos_help_screen.height / 10,
        origin: {x: "center", y: "center" },
        font: get_size_px(canvas, 19),
        text: others[1],
        fill: white
    });

    sos_help_screen.addChild(sos_help_screen.help_text);

    return sos_help_screen;
}

function build_fitness_screen (canvas){
    var fitness_screen = canvas.display.rectangle({
        description: descriptions[21],
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

    fitness_screen.energy = canvas.display.text({
        x: - fitness_screen.width / 2 + fitness_screen.width / 10,
        y: - 1 * fitness_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[22],
        fill: white
    });

    fitness_screen.activity = canvas.display.text({
        x: - fitness_screen.width / 2 + fitness_screen.width / 10,
        y: - 0 * fitness_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[23],
        fill: white
    });

    fitness_screen.nutrition = canvas.display.text({
        x: - fitness_screen.width / 2 + fitness_screen.width / 10,
        y:  1 * fitness_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[24],
        fill: white
    });

    fitness_screen.fitness_help_button = canvas.display.image({
        x: fitness_screen.width / 2.5,
        y: fitness_screen.height / 2.5,
        width: fitness_screen.width / 10,
        height: fitness_screen.height / 10,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Help.png"
    });

    fitness_screen.addChild(fitness_screen.energy);
    fitness_screen.addChild(fitness_screen.activity);
    fitness_screen.addChild(fitness_screen.nutrition);
    links = add_lines(canvas, fitness_screen, -1, 0)

    links[0].bind("click tap", function() {
        changeScreen(canvas, build_energy_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    links[1].bind("click tap", function() {
        changeScreen(canvas, build_activity_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    links[2].bind("click tap", function() {
        changeScreen(canvas, build_nutrition_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    build_health_template(canvas, fitness_screen, 0);
    fitness_screen.addChild(fitness_screen.fitness_help_button);
    
    fitness_screen.fitness_help_button.bind("click tap", function() {
        changeScreen(canvas, build_fitness_help_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    return fitness_screen;
}

function build_fitness_help_screen(canvas){
    var fitness_help_screen = canvas.display.rectangle({
        description: descriptions[22],
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
    
    fitness_help_screen.help_text = canvas.display.text({
        x: 0,
        y: - 2 * fitness_help_screen.height / 10,
        origin: {x: "center", y: "center" },
        font: get_size_px(canvas, 19),
        text: others[1],
        fill: white
    });

    fitness_help_screen.addChild(fitness_help_screen.help_text);

    return fitness_help_screen;
}

function build_energy_screen (canvas){
    var energy_screen = canvas.display.rectangle({
        description: descriptions[23],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    energy_screen.today = canvas.display.text({
        x: - energy_screen.width / 2 + energy_screen.width / 10,
        y: - 1.5 * energy_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[25],
        fill: white
    });

    energy_screen.weekly = canvas.display.text({
        x: - energy_screen.width / 2 + energy_screen.width / 10,
        y: - 0.5 * energy_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[26],
        fill: white
    });

    energy_screen.units = canvas.display.text({
        x: - energy_screen.width / 2 + energy_screen.width / 10,
        y: + 0.5 * energy_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[27],
        fill: white
    });

    energy_screen.addChild(energy_screen.today);
    energy_screen.addChild(energy_screen.weekly);
    energy_screen.addChild(energy_screen.units);

    links = add_lines(canvas, energy_screen, -1.5, 0)

    return energy_screen;
}

function build_activity_screen (canvas){
    var activity_screen = canvas.display.rectangle({
        description: descriptions[24],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    activity_screen.distance = canvas.display.text({
        x: - activity_screen.width / 2 + activity_screen.width / 10,
        y: - 1.5 * activity_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[28],
        fill: white
    });

    activity_screen.steps = canvas.display.text({
        x: - activity_screen.width / 2 + activity_screen.width / 10,
        y: - 0.5 * activity_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[29],
        fill: white
    });

    activity_screen.elevation = canvas.display.text({
        x: - activity_screen.width / 2 + activity_screen.width / 10,
        y: + 0.5 * activity_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[30],
        fill: white
    });

    activity_screen.message = canvas.display.rectangle({
        x: 0,
        y: 1.10 * activity_screen.height / 4,
        origin: {x: "center", y: "center" },
        width: activity_screen.width / 1.2,
        height: 0.75 * activity_screen.width / 3,
        borderRadius : 5,
        fill: "radial-gradient(" + white + ", " + "#AAAAAA" + ")"
    });
    
    activity_screen.message_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[31],
        fill: black,
    });

    activity_screen.addChild(activity_screen.distance);
    activity_screen.addChild(activity_screen.steps);
    activity_screen.addChild(activity_screen.elevation);

    links = add_lines(canvas, activity_screen, -1.5, 0)

    activity_screen.message.addChild(activity_screen.message_text);
    activity_screen.addChild(activity_screen.message);

    activity_screen.message.bind("click tap", function() {
        changeScreen(canvas, build_choose_activity_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });

    return activity_screen;
}

function build_nutrition_screen (canvas){
    var nutrition_screen = canvas.display.rectangle({
        description: descriptions[25],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    nutrition_screen.vitamins = canvas.display.text({
        x: - nutrition_screen.width / 2 + nutrition_screen.width / 10,
        y: - 1.5 * nutrition_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[32],
        fill: white
    });

    nutrition_screen.proteins = canvas.display.text({
        x: - nutrition_screen.width / 2 + nutrition_screen.width / 10,
        y: - 0.5 * nutrition_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[33],
        fill: white
    });

    nutrition_screen.water = canvas.display.text({
        x: - nutrition_screen.width / 2 + nutrition_screen.width / 10,
        y: + 0.5 * nutrition_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[34],
        fill: white
    });

    nutrition_screen.fat = canvas.display.text({
        x: - nutrition_screen.width / 2 + nutrition_screen.width / 10,
        y: + 1.5 * nutrition_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[35],
        fill: white
    });

    nutrition_screen.calcium = canvas.display.text({
        x: - nutrition_screen.width / 2 + nutrition_screen.width / 10,
        y: + 2.5 * nutrition_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: get_size_px(canvas, 17),
        text: health[36],
        fill: white
    });

    nutrition_screen.addChild(nutrition_screen.vitamins);
    nutrition_screen.addChild(nutrition_screen.proteins);
    nutrition_screen.addChild(nutrition_screen.water);
    nutrition_screen.addChild(nutrition_screen.fat);
    nutrition_screen.addChild(nutrition_screen.calcium);

    links = add_lines(canvas, nutrition_screen, -1.5, 0)

    return nutrition_screen;
}

function build_choose_activity_screen (canvas){
    var choose_activity_screen = canvas.display.rectangle({
        description: descriptions[26],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: black
    });

    var line_separating = canvas.display.line({
        start: { x:  - 0.55 * choose_activity_screen.width / 2, y: 0.20 * choose_activity_screen.height / 2 },
        end: { x: 0.55 * choose_activity_screen.width / 2, y: 0.20 * choose_activity_screen.height / 2 },
        stroke: "2px " + white,
        cap: "round"
    });
    choose_activity_screen.addChild(line_separating);

    var line_separating = canvas.display.line({
        start: { x: 0, y: (0.20 - 0.55) * choose_activity_screen.height / 2 },
        end: { x: 0, y:  (0.20 + 0.55) * choose_activity_screen.height / 2 },
        stroke: "2px " + white,
        cap: "round"
    });
    choose_activity_screen.addChild(line_separating);

    choose_activity_screen.walk_button = canvas.display.image({
        x: - choose_activity_screen.width / 4.75,
        y: - choose_activity_screen.height / 4.75 + 0.20 * choose_activity_screen.height / 2,
        width: choose_activity_screen.width / 4.75,
        height: choose_activity_screen.height / 4.75,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Activity-Walk.png"
    });
    choose_activity_screen.run_button = canvas.display.image({
        x: + choose_activity_screen.width / 4.75,
        y: - choose_activity_screen.height / 4.75 + 0.20 * choose_activity_screen.height / 2,
        width: choose_activity_screen.width / 4.75,
        height: choose_activity_screen.height / 4.75,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Activity-Run.png"
    });
    choose_activity_screen.cycle_button = canvas.display.image({
        x: - choose_activity_screen.width / 4.75,
        y: + choose_activity_screen.height / 4.75 + 0.20 * choose_activity_screen.height / 2,
        width: choose_activity_screen.width / 4.75,
        height: choose_activity_screen.height / 4.75,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Activity-Bike.png"
    });
    choose_activity_screen.gym_button = canvas.display.image({
        x: + choose_activity_screen.width / 4.75,
        y: + choose_activity_screen.height / 4.75 + 0.20 * choose_activity_screen.height / 2,
        width: choose_activity_screen.width / 4.75,
        height: choose_activity_screen.height / 4.75,
        origin: { x: "center", y: "center" },
        image: "../../../Materials/Activity-Gym.png"
    });

    choose_activity_screen.addChild(choose_activity_screen.walk_button);
    choose_activity_screen.addChild(choose_activity_screen.run_button);
    choose_activity_screen.addChild(choose_activity_screen.cycle_button);
    choose_activity_screen.addChild(choose_activity_screen.gym_button);

    return choose_activity_screen;
}