function build_rectangle(canvas, [x = 0, y = 0], [width  = 5, height = 5], fill = white, borderRadius = 0, borders) {
    var [borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius] = borders

    if (borderTopLeftRadius == null) borderTopLeftRadius = 0
    if (borderTopRightRadius == null) borderTopRightRadius = 0
    if (borderBottomLeftRadius == null) borderBottomLeftRadius = 0
    if (borderBottomRightRadius == null) borderBottomRightRadius = 0
    
    var rectangle = canvas.display.rectangle({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: fill,
        borderRadius: borderRadius,
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius,
        borderBottomRightRadius: borderBottomRightRadius,
    })

    return rectangle
}

function build_ellipse(canvas, [x = 0 , y = 0], radius = 2, fill = black) {
    var ellipse = canvas.display.ellipse({
		x: x,
		y: y,
		radius: radius,
		fill: fill
    })
    
    return ellipse
}

function build_screen() {

}