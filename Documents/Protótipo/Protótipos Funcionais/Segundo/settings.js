var build_lock_screen = build_lock_screen_none;
var lock_screen_type = 'none';
var code = '1234';

function build_settings_screen(canvas) {
	var settings_screen = canvas.display.rectangle({
		description: descriptions['settings'],
		description_show: true,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	var options = [ settings['lock_protection'], settings['language'] ];
	var link = [ 'link_arrow', 'link_arrow' ];
	var links = add_lines(canvas, settings_screen, -2, options, link);

	links[0].bind('click tap', function() {
		changeScreen(canvas, build_lock_settings_screen(canvas));
	});
	links[1].bind('click tap', function() {
		changeScreen(canvas, build_language_settings_screen(canvas));
	});

	return settings_screen;
}

function build_language_settings_screen(canvas) {
	var language_settings_screen = canvas.display.rectangle({
		description: descriptions['language_settings'],
		description_show: true,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	var options = [ settings['portuguese'], settings['english'] ];
	var link = [ 'link_option', 'link_option' ];

	if (language == 'pt') link[0] = 'link_option_active';
	else if (language == 'en') link[1] = 'link_option_active';

	var links = add_lines(canvas, language_settings_screen, -2, options, link);

	links[0].bind('click tap', function() {
		if (!links[0].active) {
			change_language('pt');
			changeScreen(canvas, build_changed_language_screen(canvas));
			setTimeout(function() {
				changeScreen(canvas, build_language_settings_screen(canvas));
			}, 1500);
		}
	});
	links[1].bind('click tap', function() {
		if (!links[1].active) {
			change_language('en');
			changeScreen(canvas, build_changed_language_screen(canvas));
			setTimeout(function() {
				changeScreen(canvas, build_language_settings_screen(canvas));
			}, 1500);
		}
	});

	return language_settings_screen;
}

function build_changed_language_screen(canvas) {
	var changed_language_screen = canvas.display.rectangle({
		description: descriptions['changed_language'],
		description_show: true,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	var message = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		align: 'center',
		text: settings['message_changed_language'],
		font: get_size_px(canvas, 19),
		fill: white
	});

	changed_language_screen.addChild(message);

	return changed_language_screen;
}

function build_lock_settings_screen(canvas) {
	var lock_settings_screen = canvas.display.rectangle({
		description: descriptions['lock_settings'],
		description_show: true,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	var options = [ settings['none'], settings['pin'], settings['pattern'], settings['fingerprint'] ];
	var link = [ 'link_option', 'link_option', 'link_option', 'link_option' ];

	if (lock_screen_type == 'none') link[0] = 'link_option_active';
	else if (lock_screen_type == 'pin') link[1] = 'link_option_active';
	else if (lock_screen_type == 'pattern') link[2] = 'link_option_active';
	else if (lock_screen_type == 'fingerprint') link[3] = 'link_option_active';

	var links = add_lines(canvas, lock_settings_screen, -2, options, link);

	links[0].bind('click tap', function() {
		if (!links[0].active) {
			lock_screen_type = 'none';
			build_lock_screen = build_lock_screen_none;
			changeScreen(canvas, build_changed_lock_screen(canvas));
			setTimeout(function() {
				changeScreen(canvas, build_lock_settings_screen(canvas));
			}, 1500);
		}
	});
	links[1].bind('click tap', function() {
		if (!links[1].active) {
			lock_screen_type = 'pin';
			build_lock_screen = build_lock_screen_pin;
			changeScreen(canvas, build_changed_lock_screen(canvas));
			setTimeout(function() {
				changeScreen(canvas, build_lock_settings_screen(canvas));
			}, 1500);
		}
	});
	links[2].bind('click tap', function() {
		if (!links[2].active) {
			lock_screen_type = 'pattern';
			build_lock_screen = build_lock_screen_pattern;
			changeScreen(canvas, build_changed_lock_screen(canvas));
			setTimeout(function() {
				changeScreen(canvas, build_lock_settings_screen(canvas));
			}, 1500);
		}
	});
	links[3].bind('click tap', function() {
		if (!links[3].active) {
			lock_screen_type = 'fingerprint';
			build_lock_screen = build_lock_screen_fingerprint;
			changeScreen(canvas, build_changed_lock_screen(canvas));
			setTimeout(function() {
				changeScreen(canvas, build_lock_settings_screen(canvas));
			}, 1500);
		}
	});

	return lock_settings_screen;
}

function build_changed_lock_screen(canvas) {
	var changed_lock_screen = canvas.display.rectangle({
		description: descriptions['changed_lock'],
		description_show: true,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	var message = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		align: 'center',
		text: settings['message_changed_lock'],
		font: get_size_px(canvas, 19),
		fill: white
	});

	changed_lock_screen.addChild(message);

	return changed_lock_screen;
}

function build_lock_screen_none(canvas) {
	var lock_screen = canvas.display.rectangle({
		description: descriptions['no_lock'],
		description_show: false,
		template: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	for (i = 2; i < 6; i++) {
		var circle = canvas.display.ellipse({
			x: 0,
			y: 0,
			radius: 1.25 * lock_screen.width / Math.pow(2, i),
			stroke: lock_screen.width / 100 + ' ' + white
		});
		lock_screen.addChild(circle);
	}

	lock_screen.text = canvas.display.text({
		x: 0,
		y: +lock_screen.height / 2 - lock_screen.height / 15,
		origin: { x: 'center', y: 'center' },
		text: settings['touch_screen_to_unlock'],
		font: get_size_px(canvas, 16),
		fill: white
	});
	lock_screen.addChild(lock_screen.text);

	lock_screen
		.bind('click tap', function() {
			changeScreen(canvas, build_menu_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	return lock_screen;
}

function build_lock_screen_pin(canvas) {
	var lock_screen = canvas.display.rectangle({
		description: descriptions['pin_lock'],
		description_show: true,
		template: false,
		attempt: '',
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	var links = [];
	var x, y, color;
	for (i = 0; i < 12; i++) {
		if (i == 0) {
			x = 0;
			y = 2 * lock_screen.height / 6;
			color = white;
		} else if (i == 10) {
			x = -lock_screen.height / 4;
			y = 2 * lock_screen.height / 6;
			color = '#c10f0f';
		} else if (i == 11) {
			x = +lock_screen.height / 4;
			y = 2 * lock_screen.height / 6;
			color = '#0fc10f';
		} else {
			x = ((i - 1) % 3 - 1) * lock_screen.height / 4;
			y = (Math.floor((i - 1) / 3) - 1) * lock_screen.height / 6;
			color = white;
		}

		var button = canvas.display.rectangle({
			x: x,
			y: y,
			origin: { x: 'center', y: 'center' },
			width: 0.9 * lock_screen.width / 4,
			height: lock_screen.width / 7,
			borderRadius: 3,
			fill: 'radial-gradient(' + color + ', ' + black + ')'
		});

		if (i < 10) {
			var text = canvas.display.text({
				x: 0,
				y: 0,
				origin: { x: 'center', y: 'center' },
				text: i,
				fill: black
			});

			button.addChild(text);
		}

		button
			.bind('mouseenter', function() {
				canvas.mouse.cursor('pointer');
			})
			.bind('mouseleave', function() {
				canvas.mouse.cursor('default');
			});

		links.push(button);
		lock_screen.addChild(button);
	}

	var circles = [];
	for (i = 0; i < 4; i++) {
		var circle = canvas.display.ellipse({
			x: (i - 1.5) * lock_screen.width / 10,
			y: -0.6 * lock_screen.width / 2,
			radius: lock_screen.width / 40,
			fill: gray_frame
		});

		circles.push(circle);
		lock_screen.addChild(circle);
	}

	links[0].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 0;
		}
	});
	links[1].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 1;
		}
	});
	links[2].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 2;
		}
	});
	links[3].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 3;
		}
	});
	links[4].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 4;
		}
	});
	links[5].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 5;
		}
	});
	links[6].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 6;
		}
	});
	links[7].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 7;
		}
	});
	links[8].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 8;
		}
	});
	links[9].bind('click tap', function() {
		if (lock_screen.attempt.length < 4) {
			circles[lock_screen.attempt.length].fill = white;
			lock_screen.attempt += 9;
		}
	});
	links[10].bind('click tap', function() {
		lock_screen.attempt = '';
		for (i = 0; i < 4; i++) circles[i].fill = gray_frame;
	});
	links[11].bind('click tap', function() {
		if (lock_screen.attempt == code) {
			changeScreen(canvas, build_menu_screen(canvas));
		} else {
			lock_screen.attempt = '';
			for (i = 0; i < 4; i++) circles[i].fill = gray_frame;
		}
	});

	return lock_screen;
}

function build_lock_screen_pattern(canvas) {
	var lock_screen = canvas.display.rectangle({
		description: descriptions['pattern_lock'],
		description_show: true,
		template: false,
		attempt: '',
		active: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	var links = [];
	var circles = [];
	for (i = 0; i < 9; i++) {
		var button = canvas.display.ellipse({
			active: false,
			x: (i % 3 - 1) * lock_screen.width / 4,
			y: (Math.floor(i / 3) - 0.75) * lock_screen.height / 4,
			origin: { x: 'center', y: 'center' },
			radius: lock_screen.width / 15,
			stroke: lock_screen.width / 100 + ' ' + white
		});

		var circle = canvas.display.ellipse({
			x: 0,
			y: 0,
			origin: { x: 'center', y: 'center' },
			radius: lock_screen.width / 70,
			fill: white
		});

		button
			.bind('mouseenter', function() {
				canvas.mouse.cursor('pointer');
			})
			.bind('mouseleave', function() {
				canvas.mouse.cursor('default');
			});

		links.push(button);
		circles.push(circle);
		button.addChild(circle);
		lock_screen.addChild(button);
	}

	color = '#4593c6';
	links[0].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[0].active) {
			links[0].active = true;
			circles[0].fill = color;
			lock_screen.attempt += 1;
		}
	});
	links[1].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[1].active) {
			links[1].active = true;
			circles[1].fill = color;
			lock_screen.attempt += 2;
		}
	});
	links[2].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[2].active) {
			links[2].active = true;
			circles[2].fill = color;
			lock_screen.attempt += 3;
		}
	});
	links[3].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[3].active) {
			links[3].active = true;
			circles[3].fill = color;
			lock_screen.attempt += 4;
		}
	});
	links[4].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[4].active) {
			links[4].active = true;
			circles[4].fill = color;
			lock_screen.attempt += 5;
		}
	});
	links[5].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[5].active) {
			links[5].active = true;
			circles[5].fill = color;
			lock_screen.attempt += 6;
		}
	});
	links[6].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[6].active) {
			links[6].active = true;
			circles[6].fill = color;
			lock_screen.attempt += 7;
		}
	});
	links[7].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[7].active) {
			links[7].active = true;
			circles[7].fill = color;
			lock_screen.attempt += 8;
		}
	});
	links[8].bind('mousemove touchmove', function() {
		if (lock_screen.active && !links[8].active) {
			links[8].active = true;
			circles[8].fill = color;
			lock_screen.attempt += 9;
		}
	});

	return lock_screen;
}

function build_lock_screen_fingerprint(canvas) {
	var lock_screen = canvas.display.rectangle({
		description: descriptions['fingerprint_lock'],
		description_show: true,
		template: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	lock_screen.finger = canvas.display.image({
		x: 0,
		y: 0,
		width: 7 * lock_screen.width / 18,
		height: 7 * lock_screen.width / 18,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Fingerprint.png'
	});

	lock_screen.progress_circle_fingerprint = canvas.display.arc({
		x: 0,
		y: 0,
		radius: 9 * lock_screen.width / 36,
		start: 0,
		end: 0,
		stroke: '10px #0aa',
		touching: 0
	});

	lock_screen.addChild(lock_screen.finger);
	lock_screen.addChild(lock_screen.progress_circle_fingerprint);

	lock_screen.finger
		.bind('mousedown touchstart', function() {
			lock_screen.progress_circle_fingerprint.touching = 7;
		})
		.bind('mouseup touchend', function() {
			lock_screen.progress_circle_fingerprint.touching = 0;
			lock_screen.progress_circle_fingerprint.end = 0;
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	return lock_screen;
}
