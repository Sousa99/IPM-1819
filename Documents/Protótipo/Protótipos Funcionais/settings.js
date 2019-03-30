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

    var links = add_lines(canvas, settings_screen, 0);

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
        fill: black,
    });
    language_settings_screen.portuguese = canvas.display.text({
        x: - language_settings_screen.width / 2 + language_settings_screen.width / 10,
        y: - 2 * language_settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[2],
        fill: white
    });
    language_settings_screen.english = canvas.display.text({
        x: - language_settings_screen.width / 2 + language_settings_screen.width / 10,
        y: - language_settings_screen.height / 10,
        origin: {x: "left", y: "center" },
        text: settings[3],
        fill: white
    });

    language_settings_screen.addChild(language_settings_screen.portuguese);
    language_settings_screen.addChild(language_settings_screen.english);

    var active = -1;
    switch (language) {
        case "pt":
            active = 0;
            break;
        case "en":
            active = 1;
            break;
    }

    var links = add_lines(canvas, language_settings_screen, 1, active);

    links[0].bind("click tap", function() {
        if (!links[0].active) {
            change_language("pt");
            changeScreen(canvas, build_changed_language_screen(canvas));
            setTimeout(function(){
                changeScreen(canvas, build_language_settings_screen(canvas));
            }, 3000);
        }

        //changeScreen(canvas, build_language_settings_screen(canvas));
    });
    links[1].bind("click tap", function() {
        if (!links[1].active) {
            change_language("en");
            changeScreen(canvas, build_changed_language_screen(canvas));
            setTimeout(function(){
                changeScreen(canvas, build_language_settings_screen(canvas));
            }, 2000);
        };

        //changeScreen(canvas, build_language_settings_screen(canvas));
    });

    return language_settings_screen;
}

function build_changed_language_screen(canvas) {
    var changed_language_screen = canvas.display.rectangle({
        description: descriptions[7],
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
    
    var message = canvas.display.text({
        x: 0,
        y: 0,
        origin: {x: "center", y: "center" },
        align: "center",
        text: settings[4],
        font: "25px",
        fill: white
    });

    changed_language_screen.addChild(message);

    return changed_language_screen;
}