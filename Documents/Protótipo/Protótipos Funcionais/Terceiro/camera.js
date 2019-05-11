function build_camera_template(canvas, screen, active) {
	var links = []
	var colors = [ white, white, white ]
	var colors_text = [ black, black, black ]

	colors[active] = '#a52121'
	colors_text[active] = white

	screen.camera_photo = build_rectangle(canvas, [0, - 3 / 10 * screen.height], [screen.width / 4, screen.height / 7], undefined, colors[0])
	screen.camera_stream = build_rectangle(canvas, [screen.width / 4, - 3 / 10 * screen.height], [screen.width / 4, screen.height / 7], undefined, colors[1], [0, 5, 0, 5])
	screen.camera_video = build_rectangle(canvas, [- screen.width / 4, - 3 / 10 * screen.height], [screen.width / 4, screen.height / 7], undefined, colors[2], [5, 0, 5, 0])
	
	screen.camera_photo_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 14), camera['camera_photo'], colors_text[0])
	screen.camera_stream_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 14), camera['camera_stream'], colors_text[1])
	screen.camera_video_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 14), camera['camera_video'], colors_text[2])

	links.push(screen.camera_photo)
	screen.addChild(screen.camera_photo)
	screen.camera_photo.addChild(screen.camera_photo_text)
	links.push(screen.camera_stream)
	screen.addChild(screen.camera_stream)
	screen.camera_stream.addChild(screen.camera_stream_text)
	links.push(screen.camera_video)
	screen.addChild(screen.camera_video)
	screen.camera_video.addChild(screen.camera_video_text)

	if (active != 0) {
		object_clickable(canvas, screen.camera_photo)
		screen.camera_photo.bind('click tap', function() {
			changeScreen(canvas, build_photo_screen(canvas))
		})
	}
	if (active != 1) {
		object_clickable(canvas, screen.camera_stream)
		screen.camera_stream.bind('click tap', function() {
			changeScreen(canvas, build_stream_screen(canvas))
		})
	}
	if (active != 2) {
		object_clickable(canvas, screen.camera_video)
		screen.camera_video.bind('click tap', function() {
			changeScreen(canvas, build_video_screen(canvas))
		})
	}
}

function build_photo_screen(canvas){
    var photo_screen = build_screen(canvas, descriptions['camera_photo'], false, false)
	var camera = camera_information.actual_camera
	
    var background = build_image(canvas, undefined, [SIZE_SCREEN + 1, SIZE_SCREEN + 1], undefined, MATERIALS_DIR + '/Fake View.png')
	
	photo_screen.timer  = build_image(canvas, [ -3.5 *photo_screen.width /8, 3.25* photo_screen.height/8], [photo_screen. width /8, photo_screen.height/8], undefined, MATERIALS_DIR + '/Timer.png')
 	photo_screen.flash  = build_image(canvas, [-2.25*photo_screen.width /8, 3.25* photo_screen.height/8], [photo_screen. width /10, photo_screen.height/10], undefined, MATERIALS_DIR + '/Automatic-flash.png')
	
	photo_screen.addChild(background)
	photo_screen.addChild(photo_screen.timer)
	photo_screen.addChild(photo_screen.flash)

    photo_screen.box_text = build_ellipse(canvas, [0, photo_screen.height / 8], 90, white)
    photo_screen.box_text.opacity = 0.65
    photo_screen.text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 15), camera['tap_camera_photo'], '#000000')
    photo_screen.box_text.addChild(photo_screen.text)
    photo_screen.addChild(photo_screen.box_text)

	build_camera_template(canvas, photo_screen, 0)

	var button_charactheristics_photo_flash
    if (photo.flash_on) button_charactheristics_photo_flash = {text: camera.flash_off, colour: 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')'}
    else button_charactheristics_photo_flash = {text: camera.flash_on, colour: 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')'}

    photo_screen.button = build_rectangle(canvas, [0, 25 / 64 * photo_screen.height], [7 / 12 * photo_screen.width, photo_screen.width / 7], undefined, button_charactheristics_photo_flash.colour, [5, 5, 5, 5])
	photo_screen.button_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), button_charactheristics_photo_flash.text, white)
	photo_screen.button.addChild(photo_screen.button_text)
    photo_screen.addChild(photo_screen.button)
    
    object_clickable(canvas, photo_screen.button)
    photo_screen.button.bind('click tap', function() {
        if (photo.flash_on) changeScreen(canvas, build_main_screen(canvas))
        else changeScreen(canvas, build_photo_screen(canvas))
    })

    return photo_screen
}

function build_video_screen(canvas){
    var video_screen = build_screen(canvas, descriptions['camera_video'], false, false)
    
    var background = build_image(canvas, undefined, [SIZE_SCREEN + 1, SIZE_SCREEN + 1], undefined, MATERIALS_DIR + '/Fake View.png')
 	video_screen.timer  = build_image(canvas, [ -3.5 *video_screen.width /8, 3.25* video_screen.height/8], [video_screen. width /8, video_screen.height/8], undefined, MATERIALS_DIR + '/Timer.png')
 	video_screen.flash  = build_image(canvas, [-2.25*video_screen.width /8, 3.25* video_screen.height/8], [video_screen. width /10, video_screen.height/10], undefined, MATERIALS_DIR + '/Automatic-flash.png')
	
	video_screen.addChild(background)
	video_screen.addChild(video_screen.timer)
	video_screen.addChild(video_screen.flash)

    video_screen.box_text = build_ellipse(canvas, [0, video_screen.height / 8], 90, white)
    video_screen.box_text.opacity = 0.65
    video_screen.text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 15), camera['tap_camera_video'], '#000000')
    video_screen.box_text.addChild(video_screen.text)
	video_screen.addChild(video_screen.box_text)
	
    
    build_camera_template(canvas, video_screen, 2)

    return video_screen
}

function build_stream_screen(canvas){
    var stream_screen = build_screen(canvas, descriptions['camera_stream'], false, false)
    
    var background = build_image(canvas, undefined, [SIZE_SCREEN + 1, SIZE_SCREEN + 1], undefined, MATERIALS_DIR + '/Fake View.png')
    stream_screen.addChild(background)

    stream_screen.box_text = build_ellipse(canvas, [0, stream_screen.height / 8], 90, white)
    stream_screen.box_text.opacity = 0.65
    stream_screen.text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 14), camera['tap_camera_stream'], '#000000')
    stream_screen.box_text.addChild(stream_screen.text)
    stream_screen.addChild(stream_screen.box_text)

    build_camera_template(canvas, stream_screen, 1)

    return stream_screen
}