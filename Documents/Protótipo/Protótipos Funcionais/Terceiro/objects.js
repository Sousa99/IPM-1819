function build_text(canvas, [x, y] = [0, 0], [x_origin, y_origin] = ['center', 'center'], align = 'center', font = get_size_px(canvas, 15), text = '', fill = black) {
    var text = canvas.display.text({
        x: x,
        y: y,
        origin: {x: x_origin, y: y_origin},
        align: align,
        font: font,
        text: text,
        fill: fill
    })

    return text
}

function build_line(canvas, [x_start, y_start] = [0, 0], [x_end, y_end] = [400, 400], stroke = get_size_px(canvas, 1) + ' ' + white, cap = 'round') {
    var line = canvas.display.line({
        start: { x: x_start, y: y_start },
        end: { x: x_end, y: y_end },
        stroke: stroke,
        cap: cap
    })

    return line
}

function build_rectangle(canvas, [x, y] = [0, 0], [width, height] = [5, 5], [x_origin, y_origin] = ['center', 'center'], fill = white, borders, stroke = '') {
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
        stroke: stroke
    })

    return rectangle
}

function build_ellipse(canvas, [x, y] = [0, 0], radius = 2, fill = black, stroke = '') {
    var ellipse = canvas.display.ellipse({
		x: x,
		y: y,
		radius: radius,
        fill: fill,
        stroke: stroke
    })
    
    return ellipse
}

function build_arc(canvas, [x, y] = [0, 0], radius = 2, [start, end] = [0, 180], stroke) {
    var arc = canvas.display.arc({
		x: x,
		y: y,
		radius: radius,
		start: start,
		end: end,
		stroke: stroke
    })
    
    return arc
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

function build_screen(canvas, description = 'None', description_show = true, template = true, [width, height] = [SIZE_SCREEN, SIZE_SCREEN], fill = black) {
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

function object_non_clickable(canvas, object) {
    object.bind('mouseenter', function() {
        canvas.mouse.cursor('default')
    }).bind('mouseleave', function() {
        canvas.mouse.cursor('default')
    })
}