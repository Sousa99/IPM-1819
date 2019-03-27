function loadCanvas() {
    var canvas = document.getElementById("workzone");
 
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    var canvas = oCanvas.create({
        canvas: "#workzone",
        fps: 60
    });
        
    var center = canvas.display.ellipse({
        x: canvas.width / 2, y: canvas.height / 2,
        radius: canvas.width / 6,
        fill: "#fff"
    }).add();
    
    var frame = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14 - 5,
        y: canvas.height / 2 - canvas.width / 14 - 5,
        width: canvas.width / 7 + 10,
        height: canvas.width / 7 + 10,
        borderRadius : 20,
        fill: "#7F7F7F"
    }).add();
    
    var screen = canvas.display.rectangle({
        x: canvas.width / 2 - canvas.width / 14,
        y: canvas.height / 2 - canvas.width / 14,
        width: canvas.width / 7,
        height: canvas.width / 7,
        borderRadius : 20,
        fill: "#000000"
    });

    var time = canvas.display.text({
        x: screen.width / 2,
        y: screen.height / 2 - 15,
        origin: { x: "center", y: "center" },
        family: "7Segments",
        font: "30px 7Segments",
        fill: "#ffffff"
    });

    screen.addChild(time);
    canvas.addChild(screen);

    canvas.setLoop(function () {
        var d = new Date();
        time.text = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    });
    
    canvas.timeline.start();
    
}