const white = "#FFFFFF";
const black = "#000000";
const gray_frame = "#7F7F7F";

function get_size_px(canvas, px_size) {
    return (canvas.width / (1920 / px_size)) + "px";
}

function add_lines(canvas, screen, startpoint, mode, active) {
    var links = [];
    var number_options = screen.children.length;
    for (var i = 0; i < number_options + 1; i++) {
        if (i < number_options) {
            var link;

            if (mode == 0) {
                link = canvas.display.image({
                    x: screen.width / 2 - 1.5 * screen.width / 10,
                    y: (i + startpoint) * screen.height / 10,
                    origin: { x: "center", y: "center" },
                    width: screen.height / 15,
                    height: screen.height / 15,
                    image: "../../../Materials/Arrow-White.png"
                });
    
            } else {
                var active_object = false;
                if (i == active) {
                    active_object = true;
                    var choosen = canvas.display.ellipse({
                        x: screen.width / 2 - 1.5 * screen.width / 10,
                        y: (i + startpoint) * screen.height / 10,
                        radius: screen.height / 55,
                        fill: "#005dff"
                    });

                    screen.addChild(choosen);
                }

                link = canvas.display.ellipse({
                    active: active_object,
                    x: screen.width / 2 - 1.5 * screen.width / 10,
                    y: (i + startpoint) * screen.height / 10,
                    radius: screen.height / 30,
                    stroke: "2px " + white
                });
            }
            
            link.bind("mouseenter", function () {
                canvas.mouse.cursor("pointer");
            }).bind("mouseleave", function () {
                canvas.mouse.cursor("default");
            });

            links.push(link);
            screen.addChild(link);
        }

        var line = canvas.display.line({
            start: {
                x: - screen.width / 2 + screen.width / 20,
                y: (i + startpoint - 0.5) * screen.height / 10
            },
            end: {
                x: screen.width / 2 - screen.width / 20,
                y: (i + startpoint - 0.5) * screen.height / 10
            },
            stroke: "1px " + white ,
            cap: "round"
        });

        screen.addChild(line);
    }

    return links;
}