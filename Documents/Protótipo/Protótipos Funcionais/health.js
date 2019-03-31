function build_health_template(canvas, screen, active) {
    var links = [];
    var colors = [white, white, white]

    colors[active] = "#ed9393";

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
        font: canvas.width / 120 + "px",
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
        font: canvas.width / 130 + "px",
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
        font: canvas.width / 130 + "px",
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
        y: - 1.5 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[3],
        fill: white,
    });
    health_screen.blood_pressure = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: - 0.5 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[4],
        fill: white,
    });
    health_screen.blood_oxygen = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: + 0.5 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[5],
        fill: white,
    });
    health_screen.sleep_time = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: + 1.5 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
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
    links = add_lines(canvas, health_screen, -1.5, 0)

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
        font: canvas.width / 100 + "px",
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
        font: canvas.width / 120 + "px",
        text: health[7],
        fill: white
    });

    heart_rate_screen.today = canvas.display.text({
        x: - heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
        y: - 0.5 * heart_rate_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[8],
        fill: white
    });

    heart_rate_screen.weekly = canvas.display.text({
        x: - heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
        y: + 0.5 * heart_rate_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
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
        font: canvas.width / 120 + "px",
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
        font: canvas.width / 120 + "px",
        text: health[11],
        fill: white
    });

    blood_pressure_screen.diastolic = canvas.display.text({
        x: - blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
        y: - 0.5 * blood_pressure_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[12],
        fill: white
    });

    blood_pressure_screen.report = canvas.display.text({
        x: - blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
        y: + 0.5 * blood_pressure_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
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
        font: canvas.width / 120 + "px",
        text: health[14],
        fill: white
    });

    blood_oxygen_screen.weekly = canvas.display.text({
        x: - blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
        y: - 0.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[15],
        fill: white
    });

    blood_oxygen_screen.report = canvas.display.text({
        x: - blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
        y: + 0.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
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
        font: canvas.width / 120 + "px",
        text: health[17],
        fill: white
    });

    sleep_time_screen.weekly = canvas.display.text({
        x: - sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
        y: - 0.5 * sleep_time_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[18],
        fill: white
    });

    sleep_time_screen.report = canvas.display.text({
        x: - sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
        y: + 0.5 * sleep_time_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
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
        y: - 1.5 * sos_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[20],
        fill: white
    });

    sos_screen.emergency_delay = canvas.display.text({
        x: - sos_screen.width / 2 + sos_screen.width / 10,
        y: - 0.5 * sos_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[21],
        fill: white
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
    links = add_lines(canvas, sos_screen, -1.5, 0)

    build_health_template(canvas, sos_screen, 1);
    sos_screen.addChild(sos_screen.sos_help_button);
    
    sos_screen.sos_help_button.bind("click tap", function() {
        changeScreen(canvas, build_sos_help_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
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
        font: canvas.width / 100 + "px",
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
        y: - 1.5 * fitness_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[22],
        fill: white
    });

    fitness_screen.activity = canvas.display.text({
        x: - fitness_screen.width / 2 + fitness_screen.width / 10,
        y: - 0.5 * fitness_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
        text: health[23],
        fill: white
    });

    fitness_screen.nutrition = canvas.display.text({
        x: - fitness_screen.width / 2 + fitness_screen.width / 10,
        y:  0.5 * fitness_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: canvas.width / 120 + "px",
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
    links = add_lines(canvas, fitness_screen, -1.5, 0)

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
    
    fitness_help_screen.help_text = canvas.display.text({
        x: 0,
        y: - 2 * fitness_help_screen.height / 10,
        origin: {x: "center", y: "center" },
        font: canvas.width / 100 + "px",
        text: others[1],
        fill: white
    });

    fitness_help_screen.addChild(fitness_help_screen.help_text);

    return fitness_help_screen;
}