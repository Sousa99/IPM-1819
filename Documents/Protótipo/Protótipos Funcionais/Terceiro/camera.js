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

	return links
}

function build_photo_screen(canvas){
    var photo_screen = build_screen(canvas, descriptions['camera_photo'], false, false)
	
    var background = build_image(canvas, undefined, [SIZE_SCREEN + 1, SIZE_SCREEN + 1], undefined, MATERIALS_DIR + '/Fake View.png')
	var fake_flash = build_screen(canvas, '', false, false, undefined, white)
	fake_flash.x = 0
	fake_flash.y = 0
	
	photo_screen.addChild(background)
	
    photo_screen.box_text = build_ellipse(canvas, [0, photo_screen.height / 8], 90, white)
    photo_screen.box_text.opacity = 0.65
    photo_screen.text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 15), camera['tap_camera_photo'], '#000000')
    photo_screen.box_text.addChild(photo_screen.text)
    photo_screen.addChild(photo_screen.box_text)
	
	var links = build_camera_template(canvas, photo_screen, 0)
	
	var path_img_flash = MATERIALS_DIR + camera_information.paths_img_flash[camera_information.flash]
	var path_img_timer
	if (camera_information.timer == 0 ) path_img_timer = MATERIALS_DIR + camera_information.paths_img_timer[0]
	else path_img_timer = MATERIALS_DIR + camera_information.paths_img_timer[1]
	
	photo_screen.bubble_timer = build_ellipse(canvas, [ -2.75 *photo_screen.width /8, 3.25* photo_screen.height/8], photo_screen.width / 13, white)
	photo_screen.timer  = build_image(canvas, undefined, [photo_screen.width /9, photo_screen.height/9], undefined, path_img_timer)
	
	photo_screen.bubble_flash = build_ellipse(canvas, [ 2.75*photo_screen.width /8, 3.25* photo_screen.height/8], photo_screen.width / 13, white)
	photo_screen.flash  = build_image(canvas, undefined, [photo_screen.width /10, photo_screen.height/10], undefined, path_img_flash)
    
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
		photo_screen.timer_text  = build_text(canvas, [0, photo_screen.height / 80], undefined, undefined, 'bold ' + get_size_px(canvas, 15), camera_information.timers[camera_information.timer], black)
		photo_screen.bubble_timer.addChild(photo_screen.timer_text)
	}

	object_clickable(canvas, photo_screen.box_text)
	photo_screen.box_text.bind('click tap', function() {
		photo_screen.removeChild(links[0])
		photo_screen.removeChild(links[1])
		photo_screen.removeChild(links[2])

		photo_screen.removeChild(photo_screen.bubble_timer)
		photo_screen.removeChild(photo_screen.bubble_flash)

		photo_screen.box_text.x = 0
		photo_screen.box_text.y = 0
		photo_screen.text.text = ''

		camera_information.on_progress = true

		function decrease_timer(time) {
			if (time > 0) {
				photo_screen.text.text = time
				photo_screen.text.font = 'bold ' + get_size_px(canvas, 90)
				decrease_timer_timeout(time - 1)
			} else if (time == 0) {
				photo_screen.removeChild(photo_screen.box_text)

				if (camera_information.flash == 2) {
					photo_screen.removeChild(background)
					photo_screen.addChild(fake_flash)
				}

				decrease_timer_timeout(time - 1)
			} else {
				changeScreen(canvas, build_photo_screen(canvas))
				camera_information.on_progress = false
				gallery_information.gallery.images.push('/Fake View.png')
			}
		}

		function decrease_timer_timeout(time) {
			setTimeout(function() {
				decrease_timer(time)
			}, 1000)
		}

		decrease_timer(camera_information.timers[camera_information.timer])
	})

    return photo_screen
}

function build_video_screen(canvas) {
    var video_screen = build_screen(canvas, descriptions['camera_video'], false, false)
    
	var background = build_image(canvas, undefined, [SIZE_SCREEN + 1, SIZE_SCREEN + 1], undefined, MATERIALS_DIR + '/Fake View.png')
	var fake_flash = build_screen(canvas, '', false, false, undefined, white)
	fake_flash.x = 0
	fake_flash.y = 0
	
	video_screen.addChild(background)

    video_screen.box_text = build_ellipse(canvas, [0, video_screen.height / 8], 90, white)
    video_screen.box_text.opacity = 0.65
    video_screen.text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 15), camera['tap_camera_video'], '#000000')
    video_screen.box_text.addChild(video_screen.text)
	video_screen.addChild(video_screen.box_text)
	
	var links = build_camera_template(canvas, video_screen, 2)
	
	var path_img_flash = MATERIALS_DIR + camera_information.paths_img_flash[camera_information.flash]
	var path_img_timer
	if (camera_information.timer == 0 ) path_img_timer = MATERIALS_DIR + camera_information.paths_img_timer[0]
	else path_img_timer = MATERIALS_DIR + camera_information.paths_img_timer[1]
	
	video_screen.bubble_timer = build_ellipse(canvas, [ -2.75 *video_screen.width /8, 3.25* video_screen.height/8], video_screen.width / 13, white)
	video_screen.timer  = build_image(canvas, undefined, [video_screen.width /9, video_screen.height/9], undefined, path_img_timer)
	
	video_screen.bubble_flash = build_ellipse(canvas, [ 2.75*video_screen.width /8, 3.25* video_screen.height/8], video_screen.width / 13, white)
	video_screen.flash  = build_image(canvas, undefined, [video_screen.width /10, video_screen.height/10], undefined, path_img_flash)
    
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

	video_screen.stop_button = build_image(canvas, [0, video_screen.height / 2 - 30], [video_screen.width / 5, video_screen.height / 5], undefined, MATERIALS_DIR + '/Stop Recording.png')

	object_clickable(canvas, video_screen.box_text)
	video_screen.box_text.bind('click tap', function() {
		video_screen.removeChild(links[0])
		video_screen.removeChild(links[1])
		video_screen.removeChild(links[2])

		video_screen.removeChild(video_screen.bubble_timer)
		video_screen.removeChild(video_screen.bubble_flash)

		video_screen.box_text.x = 0
		video_screen.box_text.y = 0
		video_screen.text.text = ''

		camera_information.on_progress = true

		function decrease_timer(time) {
			if (time > 0) {
				video_screen.text.text = time
				video_screen.text.font = 'bold ' + get_size_px(canvas, 90)
				decrease_timer_timeout(time - 1)
			} else if (time == 0) {
				video_screen.removeChild(video_screen.box_text)

				if (camera_information.flash == 2) {
					video_screen.removeChild(background)
					video_screen.addChild(fake_flash)
				}

				video_screen.addChild(video_screen.stop_button)
			}
		}

		function decrease_timer_timeout(time) {
			setTimeout(function() {
				decrease_timer(time)
			}, 1000)
		}

		decrease_timer(camera_information.timers[camera_information.timer])
	})

	object_clickable(canvas, video_screen.stop_button)
	video_screen.stop_button.bind('click tap', function() {
		camera_information.on_progress = false
		gallery_information.gallery.images.push('/Fake View.png')
		changeScreen(canvas, build_video_screen(canvas))
	})
	
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

	var links = build_camera_template(canvas, stream_screen, 1)
	
	stream_screen.stop_button = build_image(canvas, [0, stream_screen.height / 2 - 30], [stream_screen.width / 5, stream_screen.height / 5], undefined, MATERIALS_DIR + '/Stop Recording.png')

	object_clickable(canvas, stream_screen.box_text)
	stream_screen.box_text.bind('click tap', function() {
		stream_screen.removeChild(links[0])
		stream_screen.removeChild(links[1])
		stream_screen.removeChild(links[2])

		stream_screen.box_text.x = 0
		stream_screen.box_text.y = 0
		stream_screen.text.text = ''

		camera_information.on_progress = true
		
		function timer(time) {
			if (time > 0) {
				stream_screen.text.text = time
				stream_screen.text.font = 'bold ' + get_size_px(canvas, 90)
				timer_timeout(time - 1)
			} else if (time == 0) {
				stream_screen.removeChild(stream_screen.box_text)
				stream_screen.addChild(stream_screen.stop_button)

				camera_information.streaming = true
			}
		}

		function timer_timeout(time) {
			setTimeout(function() {
				timer(time)
			}, 1000)
		}

		timer(5)
	})

	object_clickable(canvas, stream_screen.stop_button)
	stream_screen.stop_button.bind('click tap', function() {
		camera_information.on_progress = false
		camera_information.streaming = false
		camera_information.streaming_messages = []
		changeScreen(canvas, build_stream_screen(canvas))
	})

    return stream_screen
}

function build_camera_screen(canvas){
	// Grab elements, create settings, etc.
	var video = document.getElementById('video');

	// Get access to the camera!
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		// Not adding `{ audio: true }` since we only want video now
		navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
			//video.src = window.URL.createObjectURL(stream);
			video.srcObject = stream;
       		video.play();
	});
	 
	// Elements for taking the snapshot
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');

	// Trigger photo take
	document.getElementById("snap").addEventListener("click", function() {
		context.drawImage(video, 0, 0, 640, 480);
	});
}

}