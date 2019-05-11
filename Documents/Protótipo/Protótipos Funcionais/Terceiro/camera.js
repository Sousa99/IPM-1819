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
	
    var background = build_image(canvas, undefined, [SIZE_SCREEN + 1, SIZE_SCREEN + 1], undefined, MATERIALS_DIR + '/Fake View.png')
	
	photo_screen.addChild(background)
	
    photo_screen.box_text = build_ellipse(canvas, [0, photo_screen.height / 8], 90, white)
    photo_screen.box_text.opacity = 0.65
    photo_screen.text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 15), camera['tap_camera_photo'], '#000000')
    photo_screen.box_text.addChild(photo_screen.text)
    photo_screen.addChild(photo_screen.box_text)
	
	build_camera_template(canvas, photo_screen, 0)
	
	var path_img_flash = MATERIALS_DIR + camera_information.paths_img_flash[camera_information.flash]
	var path_img_timer
	if (camera_information.timer == 0 ) path_img_timer = MATERIALS_DIR + camera_information.paths_img_timer[0]
	else path_img_timer = MATERIALS_DIR + camera_information.paths_img_timer[1]
	
	photo_screen.bubble_timer = build_ellipse(canvas, [ -2.75 *photo_screen.width /8, 3.25* photo_screen.height/8], photo_screen.width / 13, white)
	photo_screen.timer  = build_image(canvas, undefined, [photo_screen.width /9, photo_screen.height/9], undefined, path_img_timer)
	
	photo_screen.bubble_flash = build_ellipse(canvas, [ 2.75*photo_screen.width /8, 3.25* photo_screen.height/8], photo_screen.width / 13, white)
	photo_screen.flash  = build_image(canvas, undefined, [photo_screen.width /9, photo_screen.height/9], undefined, path_img_flash)
    
    object_clickable(canvas, photo_screen.bubble_flash)
    photo_screen.bubble_flash.bind('click tap', function() {
		camera_information.flash = (camera_information.flash + 1) % camera_information.paths_img_flash.length
        changeScreen(canvas, build_photo_screen(canvas))
	})
	
    object_clickable(canvas, photo_screen.bubble_timer)
    photo_screen.bubble_timer.bind('click tap', function() {
		camera_information.timer = (camera_information.timer + 1) % camera_information.timers.length
        changeScreen(canvas, build_photo_screen(canvas))
    })
	
	photo_screen.bubble_timer.opacity = 0.65
	photo_screen.bubble_flash.opacity = 0.65

	photo_screen.bubble_timer.addChild(photo_screen.timer)
	photo_screen.addChild(photo_screen.bubble_timer)
	photo_screen.bubble_flash.addChild(photo_screen.flash)
	photo_screen.addChild(photo_screen.bubble_flash)

	if (camera_information.timer != 0) {
		photo_screen.timer_text  = build_text(canvas, [0, photo_screen.height / 80], undefined, undefined, 'bold ' + get_size_px(10), camera_information.timers[camera_information.timer], black)
		photo_screen.bubble_timer.addChild(photo_screen.timer_text)
	}

    return photo_screen
}

function build_video_screen(canvas){
    var video_screen = build_screen(canvas, descriptions['camera_video'], false, false)
    
    var background = build_image(canvas, undefined, [SIZE_SCREEN + 1, SIZE_SCREEN + 1], undefined, MATERIALS_DIR + '/Fake View.png')
	
	video_screen.addChild(background)

    video_screen.box_text = build_ellipse(canvas, [0, video_screen.height / 8], 90, white)
    video_screen.box_text.opacity = 0.65
    video_screen.text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 15), camera['tap_camera_video'], '#000000')
    video_screen.box_text.addChild(video_screen.text)
	video_screen.addChild(video_screen.box_text)
	
	build_camera_template(canvas, video_screen, 2)
	
	var path_img_flash = MATERIALS_DIR + camera_information.paths_img_flash[camera_information.flash]
	var path_img_timer
	if (camera_information.timer == 0 ) path_img_timer = MATERIALS_DIR + camera_information.paths_img_timer[0]
	else path_img_timer = MATERIALS_DIR + camera_information.paths_img_timer[1]
	
	video_screen.bubble_timer = build_ellipse(canvas, [ -2.75 *video_screen.width /8, 3.25* video_screen.height/8], video_screen.width / 13, white)
	video_screen.timer  = build_image(canvas, undefined, [video_screen.width /9, video_screen.height/9], undefined, path_img_timer)
	
	video_screen.bubble_flash = build_ellipse(canvas, [ 2.75*video_screen.width /8, 3.25* video_screen.height/8], video_screen.width / 13, white)
	video_screen.flash  = build_image(canvas, undefined, [video_screen.width /9, video_screen.height/9], undefined, path_img_flash)
    
    object_clickable(canvas, video_screen.bubble_flash)
    video_screen.bubble_flash.bind('click tap', function() {
		camera_information.flash = (camera_information.flash + 1) % camera_information.paths_img_flash.length
        changeScreen(canvas, build_video_screen(canvas))
	})
	
    object_clickable(canvas, video_screen.bubble_timer)
    video_screen.bubble_timer.bind('click tap', function() {
		camera_information.timer = (camera_information.timer + 1) % camera_information.timers.length
        changeScreen(canvas, build_video_screen(canvas))
    })
	
	video_screen.bubble_timer.opacity = 0.65
	video_screen.bubble_flash.opacity = 0.65

	video_screen.bubble_timer.addChild(video_screen.timer)
	video_screen.addChild(video_screen.bubble_timer)
	video_screen.bubble_flash.addChild(video_screen.flash)
	video_screen.addChild(video_screen.bubble_flash)

	if (camera_information.timer != 0) {
		video_screen.timer_text  = build_text(canvas, [0, video_screen.height / 80], undefined, undefined, 'bold ' + get_size_px(10), camera_information.timers[camera_information.timer], black)
		video_screen.bubble_timer.addChild(video_screen.timer_text)
	}

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