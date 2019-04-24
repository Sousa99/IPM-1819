var build_lock_screen = build_lock_screen_none
var lock_screen_type = 'none'
var code = '1234'

function build_settings_screen(canvas) {
	var settings_screen = build_screen(canvas, descriptions['settings'], true, true)

	var options = [ settings['lock_protection'], settings['language'] ]
	var link = [ 'link_arrow', 'link_arrow', 'link_pub', 'link_pub' ]
	var links = add_lines(canvas, settings_screen, -2, options, link)

	links[0].bind('click tap', function() {
		changeScreen(canvas, build_lock_settings_screen(canvas))
	})
	links[1].bind('click tap', function() {
		changeScreen(canvas, build_language_settings_screen(canvas))
	})

	return settings_screen
}

function build_language_settings_screen(canvas) {
	var language_settings_screen = build_screen(canvas, descriptions['language_settings'], true, true)

	var options = [ settings['portuguese'], settings['english'] ]
	var link = [ 'link_option', 'link_option' ]

	if (language == 'pt') link[0] = 'link_option_active'
	else if (language == 'en') link[1] = 'link_option_active'

	var links = add_lines(canvas, language_settings_screen, -2, options, link)

	links[0].bind('click tap', function() {
		if (!links[0].active) {
			change_language('pt')
			changeScreen(canvas, build_changed_language_screen(canvas))
			setTimeout(function() {
				changeScreen(canvas, build_language_settings_screen(canvas))
			}, 1500);
		}
	});
	links[1].bind('click tap', function() {
		if (!links[1].active) {
			change_language('en')
			changeScreen(canvas, build_changed_language_screen(canvas))
			setTimeout(function() {
				changeScreen(canvas, build_language_settings_screen(canvas))
			}, 1500)
		}
	})

	return language_settings_screen
}

function build_changed_language_screen(canvas) {
	var changed_language_screen = build_screen(canvas, descriptions['changed_language'], true, true)

	var message = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 19), settings['message_changed_language'], white)
	changed_language_screen.addChild(message)

	return changed_language_screen
}

function build_lock_settings_screen(canvas) {
	var lock_settings_screen = build_screen(canvas, descriptions['lock_settings'], true, true)

	var options = [ settings['none'], settings['pin'], settings['pattern'], settings['fingerprint'] ]
	var link = [ 'link_option', 'link_option', 'link_option', 'link_option' ]

	if (lock_screen_type == 'none') link[0] = 'link_option_active'
	else if (lock_screen_type == 'pin') link[1] = 'link_option_active'
	else if (lock_screen_type == 'pattern') link[2] = 'link_option_active'
	else if (lock_screen_type == 'fingerprint') link[3] = 'link_option_active'

	var links = add_lines(canvas, lock_settings_screen, -2, options, link)

	links[0].bind('click tap', function() {
		if (!links[0].active) {
			lock_screen_type = 'none'
			build_lock_screen = build_lock_screen_none
			changeScreen(canvas, build_changed_lock_screen(canvas))
			setTimeout(function() {
				changeScreen(canvas, build_lock_settings_screen(canvas))
			}, 1500)
		}
	});
	links[1].bind('click tap', function() {
		if (!links[1].active) {
			lock_screen_type = 'pin'
			build_lock_screen = build_lock_screen_pin
			changeScreen(canvas, build_changed_lock_screen(canvas))
			setTimeout(function() {
				changeScreen(canvas, build_lock_settings_screen(canvas))
			}, 1500)
		}
	});
	links[2].bind('click tap', function() {
		if (!links[2].active) {
			lock_screen_type = 'pattern'
			build_lock_screen = build_lock_screen_pattern
			changeScreen(canvas, build_changed_lock_screen(canvas))
			setTimeout(function() {
				changeScreen(canvas, build_lock_settings_screen(canvas))
			}, 1500)
		}
	});
	links[3].bind('click tap', function() {
		if (!links[3].active) {
			lock_screen_type = 'fingerprint'
			build_lock_screen = build_lock_screen_fingerprint
			changeScreen(canvas, build_changed_lock_screen(canvas))
			setTimeout(function() {
				changeScreen(canvas, build_lock_settings_screen(canvas))
			}, 1500)
		}
	})

	return lock_settings_screen
}

function build_changed_lock_screen(canvas) {
	var changed_lock_screen = build_screen(canvas, descriptions['changed_lock'], true, true)

	var message = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 19), settings['message_changed_lock'], white)
	changed_lock_screen.addChild(message)

	return changed_lock_screen
}

function build_lock_screen_none(canvas) {
	var lock_screen = build_screen(canvas, descriptions['no_lock'], false, false)

	for (i = 2; i < 6; i++) {
		var circle = build_ellipse(canvas, undefined, 1.25 * lock_screen.width / Math.pow(2, i), '', lock_screen.width / 100 + ' ' + white)
		lock_screen.addChild(circle)
	}

	lock_screen.text = build_text(canvas, [0, 13 / 30 * lock_screen.height], undefined, undefined, get_size_px(canvas, 16), settings['touch_screen_to_unlock'], white)
	lock_screen.addChild(lock_screen.text)

	object_clickable(canvas, lock_screen)
	lock_screen.bind('click tap', function() {
		changeScreen(canvas, build_menu_screen(canvas))
	})

	return lock_screen
}

function build_lock_screen_pin(canvas) {
	var lock_screen = build_screen(canvas, descriptions['pin_lock'], true, false)
	lock_screen.attempt = ''

	var links = []
	var x, y, color
	for (i = 0; i < 12; i++) {
		if (i == 0) {
			x = 0
			y = 2 * lock_screen.height / 6
			color = white
		} else if (i == 10) {
			x = -lock_screen.height / 4
			y = 2 * lock_screen.height / 6
			color = '#c10f0f'
		} else if (i == 11) {
			x = +lock_screen.height / 4
			y = 2 * lock_screen.height / 6
			color = '#0fc10f'
		} else {
			x = ((i - 1) % 3 - 1) * lock_screen.height / 4
			y = (Math.floor((i - 1) / 3) - 1) * lock_screen.height / 6
			color = white
		}

		var button = build_rectangle(canvas, [x, y], [ 9 / 40 * lock_screen.width, lock_screen.height / 7], undefined, 'radial-gradient(' + color + ', ' + black + ')', [3, 3, 3, 3])

		if (i < 10) {
			var text = build_text(canvas, undefined, undefined, undefined, undefined, i)
			button.addChild(text)
		}

		object_clickable(canvas, button)
		links.push(button)
		lock_screen.addChild(button)
	}

	var circles = []
	for (i = 0; i < 4; i++) {
		var circle = build_ellipse(canvas, [(i - 1.5) * lock_screen.width / 10, - 3 * lock_screen.width / 10], lock_screen.width / 40, gray_frame)
		circles.push(circle)
		lock_screen.addChild(circle)
	}

	for (var i = 0; i < 9; i++) {
		const value = i;
		links[value].bind('click tap', function() {
			if (lock_screen.attempt.length < 4) {
				circles[lock_screen.attempt.length].fill = white
				lock_screen.attempt += value
			}
		})
	}

	links[10].bind('click tap', function() {
		lock_screen.attempt = ''
		for (i = 0; i < 4; i++) circles[i].fill = gray_frame
	})
	links[11].bind('click tap', function() {
		if (lock_screen.attempt == code) {
			changeScreen(canvas, build_menu_screen(canvas))
		} else {
			lock_screen.attempt = ''
			for (i = 0; i < 4; i++) circles[i].fill = gray_frame
		}
	})

	return lock_screen
}

function build_lock_screen_pattern(canvas) {
	var lock_screen = build_screen(canvas, descriptions['pattern_lock'], true, false)
	lock_screen.attempt = ''
	lock_screen.active = false

	var links = []
	var circles = []
	for (i = 0; i < 9; i++) {
		var button = build_ellipse(canvas, [(i % 3 - 1) * lock_screen.width / 4, (Math.floor(i / 3) - 0.75) * lock_screen.height / 4], lock_screen.width / 15, '', lock_screen.width / 100 + ' ' + white)
		button.active = false
		object_clickable(canvas, button)

		var circle = build_ellipse(canvas, undefined, lock_screen.width / 70, white)

		links.push(button)
		circles.push(circle)
		button.addChild(circle)
		lock_screen.addChild(button)
	}

	color = '#4593c6'
	for (var i = 0; i < 9; i++) {
		const value = i;
		links[i].bind('mousemove touchmove', function() {
			if (lock_screen.active && !links[value].active) {
				links[value].active = true
				circles[value].fill = color
				lock_screen.attempt += value + 1
			}
		})
	}

	return lock_screen
}

function build_lock_screen_fingerprint(canvas) {
	var lock_screen = build_screen(canvas, descriptions['fingerprint_lock'], true, false)

	lock_screen.finger = build_image(canvas, undefined, [7 * lock_screen.width / 18, 7 * lock_screen.height / 18], undefined, MATERIALS_DIR + '/Fingerprint.png')

	lock_screen.progress_circle_fingerprint = build_arc(canvas, undefined, lock_screen.width / 4, [0, 0], get_size_px(canvas, 10) + ' #00AAAA')
	lock_screen.progress_circle_fingerprint.touching = 0

	lock_screen.addChild(lock_screen.finger)
	lock_screen.addChild(lock_screen.progress_circle_fingerprint)

	object_clickable(canvas, lock_screen.finger)
	lock_screen.finger.bind('mousedown touchstart', function() {
		lock_screen.progress_circle_fingerprint.touching = 7
	}).bind('mouseup touchend', function() {
		lock_screen.progress_circle_fingerprint.touching = 0
		lock_screen.progress_circle_fingerprint.end = 0
	})

	return lock_screen
}