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
    }).add();

    var time = canvas.display.text({
        x: canvas.width / 2,
        y: canvas.height / 2 - 10,
        origin: { x: "center", y: "center" },
        font: "bold 30px 7Segments",
        fill: "#ffffff"
    }).add();

    canvas.setLoop(function () {
        var d = new Date();
        time.text = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    });
    
    canvas.timeline.start();
    
}