function build_settings_screen(canvas) {
    var settings_screen = canvas.display.rectangle({
        description: descriptions[5],
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
    settings_screen.security = canvas.display.text({
        x: - settings_screen.width / 2 + settings_screen.width / 10,
        y: - 2 * settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[0],
        fill: white
    });
    settings_screen.language = canvas.display.text({
        x: - settings_screen.width / 2 + settings_screen.width / 10,
        y: - settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[1],
        fill: white
    });

    settings_screen.addChild(settings_screen.security);
    settings_screen.addChild(settings_screen.language);

    var links = [];
    var number_options = settings_screen.children.length;
    for (var i = 0; i < number_options + 1; i++) {
        if (i < number_options) {
            var link = canvas.display.image({
                x: settings_screen.width / 2 - 1.5 * settings_screen.width / 10,
                y: (i - 2) * settings_screen.height / 10,
                origin: { x: "center", y: "center" },
                width: 15,
                height: 15,
                image: "../../../Materials/Arrow-White.png"
            });

            link.bind("mouseenter", function () {
                canvas.mouse.cursor("pointer");
            }).bind("mouseleave", function () {
                canvas.mouse.cursor("default");
            });

            links.push(link);
            settings_screen.addChild(link);
        }

        var line = canvas.display.line({
            start: {
                x: - settings_screen.width / 2 + settings_screen.width / 20,
                y: (i - 2.5) * settings_screen.height / 10
            },
            end: {
                x: settings_screen.width / 2 - settings_screen.width / 20,
                y: (i - 2.5) * settings_screen.height / 10
            },
            stroke: "1px " + white ,
            cap: "round"
        });

        settings_screen.addChild(line);
    }

    links[1].bind("click tap", function() {
        changeScreen(canvas, build_language_settings_screen(canvas));
    });

    return settings_screen;
}

function build_language_settings_screen(canvas) {
    var language_settings_screen = canvas.display.rectangle({
        description: descriptions[6],
        description_show: true,
        template: true,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: {x: "center", y: "center" },
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#ff00ff",
    });

    return language_settings_screen;
}