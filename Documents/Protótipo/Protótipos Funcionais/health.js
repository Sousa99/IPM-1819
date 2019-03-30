
function build_health_screen(canvas){
    var health_screen = canvas.display.rectangle({
        description: descriptions[6],
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

    health_screen.sos_bar = canvas.display.rectangle({
        x: 0,
        y: - health_screen.height / 4,
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
        y: - health_screen.height / 4,
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
        y: - health_screen.height / 4,
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


    health_screen.health_help_button.bind("click tap", function() {
        changeScreen(canvas, build_health_screen(canvas));
    }).bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
    }).bind("mouseleave", function () {
        canvas.mouse.cursor("default");
    });


    health_screen.addChild(health_screen.health_help_button);
    health_screen.addChild(health_screen.sos_bar);
    health_screen.sos_bar.addChild(health_screen.sos_bar_text);
    health_screen.addChild(health_screen.health_bar);
    health_screen.health_bar.addChild(health_screen.health_bar_text);
    health_screen.addChild(health_screen.fitness_bar);
    health_screen.fitness_bar.addChild(health_screen.fitness_bar_text);

    
    return health_screen;
}

function build_help_screen(canvas){
    var help_screen = canvas.display.rectangle({
            description: descriptions[6],
            description_show: false,
            template: true,
            x: canvas.width / 2,
            y: canvas.height / 2,
            origin: {x: "center", y: "center" },
            width: canvas.width / 7,
            height: canvas.width / 7,
            borderRadius : 0,
            fill: "#EOFFFF",
    });
    
    help_screen.help_text = canvas.display.text({
        x: 0,
        y: - 2 * help_screen.height / 10,
        origin: {x: "center", y: "center" },
        text: others[2],
        fill: white
    });

    help_screen.addChild(help_screen.help_text);

    return help_screen;
}