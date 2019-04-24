function build_text(canvas, [x, y] = [0, 0], [x_origin, y_origin] = ['center', 'center'], align = 'center', font = get_size_px(canvas, 15), text = '', fill = black) {
    var text = canvas.display.text({
        x: x,
        y: y,
        origin: {x: x_origin, y: y_origin},
        font: font,
        text: text,
        fill: fill
    })

    return text
}

function build_rectangle(canvas, [x, y] = [0, 0], [width, height] = [5, 5], [x_origin, y_origin] = ['center', 'center'], fill = white, borders) {
    if (borders == undefined) [borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius] = [0, 0, 0, 0]
    else [borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius] = borders
    
    var rectangle = canvas.display.rectangle({
        x: x,
        y: y,
        width: width,
        height: height,
        origin: {x: x_origin, y: y_origin},
        fill: fill,
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius,
        borderBottomRightRadius: borderBottomRightRadius,
    })

    return rectangle
}

function build_ellipse(canvas, [x, y] = [0, 0], radius = 2, fill = black) {
    var ellipse = canvas.display.ellipse({
		x: x,
		y: y,
		radius: radius,
		fill: fill
    })
    
    return ellipse
}

function build_image(canvas, [x, y] = [0, 0], [width, height] = 'TODO', [x_origin, y_origin] = ['center', 'center'], path) {
    var image = canvas.display.image({
        x: x,
        y: y,
        width: width,
        height: height,
        origin: {x: x_origin, y: y_origin },
        image: path
    })

    return image
}

function build_screen(canvas, description = 'None', description_show = true, template = false, [width, height] = [SIZE_SCREEN, SIZE_SCREEN], fill = black) {
    var screen = build_rectangle(canvas, [canvas.width / 2, canvas.height / 2], [width, height], undefined, fill, [20, 20, 20, 20])
    screen.description = description
    screen.description_show = description_show
    screen.template = template
    
    return screen
}

function object_clickable(canvas, object) {
    object.bind('mouseenter', function() {
        canvas.mouse.cursor('pointer')
    }).bind('mouseleave', function() {
        canvas.mouse.cursor('default')
    })
}