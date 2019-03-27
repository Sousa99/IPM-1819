var friendsgroup = 0;

function loadCanvas() {
    var canvas = document.getElementById("workzone");
 
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    var canvas = oCanvas.create({
        canvas: "#workzone",
        fps: 60
    });
        
    var center = canvas.display.ellipse({
        x: canvas.width / 2,
        y: canvas.height / 2,
        zindex: 0,
        radius: canvas.width / 6,
        fill: "#fff"
    }).add();
    
    var frame = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14 - 8,
        y: canvas.height / 2 - canvas.width / 14 - 8,
        zindex: 1,
        width: canvas.width / 7 + 16,
        height: canvas.width / 7 + 16,
        borderRadius : 20,
        fill: "#7F7F7F"
    });

    var camera = canvas.display.ellipse({
        x: frame.width / 2,
        y: 4,
        zindex: 2,
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

    
    frame.addChild(camera);
    button_plus.addChild(symbol_plus);
    button_minus.addChild(symbol_minus);
    frame.addChild(button_plus);
    frame.addChild(button_minus);
    frame.addChild(button_back);
    canvas.addChild(frame);
    
    var screen = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    var date = canvas.display.text({
        x: screen.width / 2,
        y: 30,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "15px",
        fill: "#ffffff"
    });
    var time = canvas.display.text({
        x: screen.width / 2,
        y: screen.height / 2,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "50px",
        fill: "#ffffff"
    });

    var number_friends = canvas.display.text({
        x: screen.width / 2,
        y: screen.height - 45,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "30px",
        fill: "#ffffff",
        text: friendsgroup,
    });
    var friends = canvas.display.text({
        x: screen.width / 2,
        y: screen.height - 15,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "15px",
        fill: "#ffffff",
        text: "FRIENDS GROUP"
    });

    screen.addChild(date);
    screen.addChild(time);
    screen.addChild(number_friends);
    screen.addChild(friends);
    canvas.addChild(screen);

    canvas.setLoop(function () {
        var d = new Date();
        date.text = ("0" + d.getDate()).slice(-2) + " / " + ("0" + (d.getMonth() + 1)).slice(-2) + " / " + d.getFullYear() + "\n";
        time.text = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        // TODO: Check if it's needed to update drawing of number of friend group
    });
    
    canvas.timeline.start();
    
}