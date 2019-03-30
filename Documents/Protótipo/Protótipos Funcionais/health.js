
function build_health_screen(canvas){
    var health_screen = canvas.display.rectangle({
        description: descriptions[8],
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
    
    health_screen.sos_bar = canvas.display.rectangle({
        x: 0,
        y: - health_screen.height / 3,
        origin: { x: "center", y: "center" },
        width: health_screen.width / 4,
        height: health_screen.width / 7,
        borderRadius : 0,
        fill: white
    });
    
    health_screen.sos_bar_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: "15px",
        text: health[1],
        fill: black
    });
    
    health_screen.health_bar = canvas.display.rectangle({
        x: health_screen.width / 4 ,
        y: - health_screen.height / 3,
        origin: { x: "center", y: "center" },
        width: health_screen.width / 4,
        height: health_screen.width / 7,
        borderRadius : 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        fill: "#ed9393"
    });
    
    health_screen.health_bar_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: "10px",
        text: health[2],
        fill: black,
        align: "center"
    });
    
    health_screen.fitness_bar = canvas.display.rectangle({
        x: - health_screen.width / 4 ,
        y: - health_screen.height / 3,
        origin: { x: "center", y: "center" },
        width: health_screen.width / 4,
        height: health_screen.width / 7,
        borderRadius : 0,
        fill: white,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    });
    
    health_screen.fitness_bar_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: "10px",
        text: health[0],
        fill: black,
        align: "center"
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
        font: "10px",
        text: health[3],
        fill: white,
    });
    health_screen.blood_pressure = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: - 0.5 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[4],
        fill: white,
    });
    health_screen.blood_oxygen = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: + 0.5 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[5],
        fill: white,
    });
    health_screen.sleep_time = canvas.display.text({
        x: - health_screen.width / 2 + health_screen.width / 10,
        y: + 1.5 * health_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
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

    health_screen.addChild(health_screen.sos_bar);
    health_screen.sos_bar.addChild(health_screen.sos_bar_text);
    health_screen.addChild(health_screen.health_bar);
    health_screen.health_bar.addChild(health_screen.health_bar_text);
    health_screen.addChild(health_screen.fitness_bar);
    health_screen.fitness_bar.addChild(health_screen.fitness_bar_text);
    health_screen.addChild(health_screen.health_help_button);
    
    return health_screen;
}

function build_health_help_screen(canvas){
    var health_help_screen = canvas.display.rectangle({
        description: descriptions[9],
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
        text: others[1],
        fill: white
    });

    health_help_screen.addChild(health_help_screen.help_text);

    return health_help_screen;
}

function build_heart_rate_screen(canvas) {
    var heart_rate_screen = canvas.display.rectangle({
        description: descriptions[10],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#ff887f"
    });

    heart_rate_screen.live = canvas.display.text({
        x: - heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
        y: - 1.5 * heart_rate_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[7],
        fill: white
    });

    heart_rate_screen.today = canvas.display.text({
        x: - heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
        y: - 0.5 * heart_rate_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[8],
        fill: white
    });

    heart_rate_screen.weekly = canvas.display.text({
        x: - heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
        y: + 0.5 * heart_rate_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[9],
        fill: white
    });

    heart_rate_screen.message = canvas.display.rectangle({
        x: 0,
        y: heart_rate_screen.height / 4,
        origin: {x: "center", y: "center" },
        width: heart_rate_screen.width / 7,
        height: heart_rate_screen.width / 7,
        borderRadius : 20,
        fill: white,
    });
    
    heart_rate_screen.message_text = canvas.display.text({
        x: 0,
        y: 0,
        origin: { x: "center", y: "center" },
        font: "15px",
        text: health[10],
        fill: black
    });

    heart_rate_screen.addChild(heart_rate_screen.live);
    heart_rate_screen.addChild(heart_rate_screen.today);
    heart_rate_screen.addChild(heart_rate_screen.weekly);
    links = add_lines(canvas, heart_rate_screen, -1.5, 0)

    heart_rate_screen.message.addChild(heart_rate_screen.message_text);
    heart_rate_screen.addChild(heart_rate_screen.message);
    
    links[0].bind("click tap", function() {
        //changeScreen(canvas, build_heart_rate_screen(canvas));
    });

    return heart_rate_screen;
}

function blood_pressure_screen(canvas) {
    var blood_pressure_screen = canvas.display.rectangle({
        description: descriptions[11],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#ff887f"
    });

   blood_pressure_screenn.systolic = canvas.display.text({
        x: - blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
        y: - 1.5 * blood_pressure_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[10],
        fill: white
    });

    blood_pressure_screen.diastolic = canvas.display.text({
        x: - blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
        y: - 0.5 * blood_pressure_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[11],
        fill: white
    });

    blood_pressure_screen.report = canvas.display.text({
        x: - blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
        y: + 0.5 * blood_pressure_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[12],
        fill: white
    });
    
    blood_pressure_screen.addChild(blood_pressure_screen.systolic);
    blood_pressure_screen.addChild(blood_pressure_screen.diastolic);
    blood_pressure_screen.addChild(blood_pressure_screen.report);

    
    links = add_lines(canvas, blood_pressure_screen, -1.5, 0)

    links[0].bind("click tap", function() {
        changeScreen(canvas, build_blood_pressure_screen(canvas));
    });

    return blood_pressure_screen;
}

function build_blood_oxygen_screen (canvas){
    var blood_oxygen_screen = canvas.display.rectangle({
        description: descriptions[12],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#ff887f"
    });

    blood_oxygen_screen.today = canvas.display.text({
        x: - blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
        y: - 1.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[13],
        fill: white
    });

    blood_oxygen_screen.weekly = canvas.display.text({
        x: - blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
        y: - 0.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[14],
        fill: white
    });

    blood_oxygen_screen.report = canvas.display.text({
        x: - blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
        y: + 0.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[15],
        fill: white
    });

    blood_oxygen_screen.addChild(blood_oxygen_screen.today);
    blood_oxygen_screen.addChild(blood_oxygen_screen.weekly);
    blood_oxygen_screen.addChild(blood_oxygen_screen.report);
    
    links = add_lines(canvas, blood_oxygen_screen, -1.5, 0)

    links[0].bind("click tap", function() {
        changeScreen(canvas, build_blood_oxygen_screen(canvas));
    });

    return blood_oxygen_screen;

}

function build_sleep_time_screen (canvas){
    var sleep_time_screen = canvas.display.rectangle({
        description: descriptions[13],
        description_show: true ,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#ff887f"
    });

    sleep_time_screen.today = canvas.display.text({
        x: - sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
        y: - 1.5 * sleep_time_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[16],
        fill: white
    });

    sleep_time_screen.weekly = canvas.display.text({
        x: - sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
        y: - 0.5 * sleep_time_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[17],
        fill: white
    });

    sleep_time_screen.report = canvas.display.text({
        x: - sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
        y: + 0.5 * blood_oxygen_screen.height / 10,
        origin: {x: "left", y: "center" },
        font: "10px",
        text: health[18],
        fill: white
    });

    sleep_time_screen.addChild(sleep_time_screen.today);
    sleep_time_screen.addChild(sleep_time_screen.weekly);
    sleep_time_screen.addChild(sleep_time_screen.report);
    
    links = add_lines(canvas, sleep_time_screen, -1.5, 0)

    links[0].bind("click tap", function() {
        changeScreen(canvas, build_sleep_time_screen(canvas));
    });

    return sleep_time_screen;

}