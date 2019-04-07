function build_health_template(canvas, screen, active) {
	var links = [];
	var colors = [ white, white, white ];

	colors[active] = '#e85151';

	screen.sos_bar = canvas.display.rectangle({
		x: 0,
		y: -0.9 * screen.height / 3,
		origin: { x: 'center', y: 'center' },
		width: screen.width / 4,
		height: screen.width / 7,
		borderRadius: 0,
		fill: colors[1]
	});
	screen.sos_bar_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 16),
		text: health['sos'],
		fill: black
	});

	screen.health_bar = canvas.display.rectangle({
		x: screen.width / 4,
		y: -0.9 * screen.height / 3,
		origin: { x: 'center', y: 'center' },
		width: screen.width / 4,
		height: screen.width / 7,
		borderRadius: 0,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		fill: colors[2]
	});
	screen.health_bar_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 14),
		text: health['health'],
		fill: black,
		align: 'center'
	});

	screen.fitness_bar = canvas.display.rectangle({
		x: -screen.width / 4,
		y: -0.9 * screen.height / 3,
		origin: { x: 'center', y: 'center' },
		width: screen.width / 4,
		height: screen.width / 7,
		borderRadius: 0,
		fill: colors[0],
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	});
	screen.fitness_bar_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 14),
		text: health['fitness'],
		fill: black,
		align: 'center'
	});

	links.push(screen.sos_bar);
	screen.addChild(screen.sos_bar);
	screen.sos_bar.addChild(screen.sos_bar_text);
	links.push(screen.health_bar);
	screen.addChild(screen.health_bar);
	screen.health_bar.addChild(screen.health_bar_text);
	links.push(screen.fitness_bar);
	screen.addChild(screen.fitness_bar);
	screen.fitness_bar.addChild(screen.fitness_bar_text);

	if (active != 0) {
		screen.fitness_bar
			.bind('click tap', function() {
				changeScreen(canvas, build_fitness_screen(canvas));
			})
			.bind('mouseenter', function() {
				canvas.mouse.cursor('pointer');
			})
			.bind('mouseleave', function() {
				canvas.mouse.cursor('default');
			});
	}
	if (active != 1) {
		screen.sos_bar
			.bind('click tap', function() {
				changeScreen(canvas, build_sos_screen(canvas));
			})
			.bind('mouseenter', function() {
				canvas.mouse.cursor('pointer');
			})
			.bind('mouseleave', function() {
				canvas.mouse.cursor('default');
			});
	}
	if (active != 2) {
		screen.health_bar
			.bind('click tap', function() {
				changeScreen(canvas, build_health_screen(canvas));
			})
			.bind('mouseenter', function() {
				canvas.mouse.cursor('pointer');
			})
			.bind('mouseleave', function() {
				canvas.mouse.cursor('default');
			});
	}
}

function build_health_screen(canvas) {
	var health_screen = canvas.display.rectangle({
		description: descriptions['health'],
		description_show: false,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	health_screen.health_help_button = canvas.display.image({
		x: health_screen.width / 2.5,
		y: health_screen.height / 2.5,
		width: health_screen.width / 10,
		height: health_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Help.png'
	});

	health_screen.heart_rate = canvas.display.text({
		x: -health_screen.width / 2 + 1.6 * health_screen.width / 10,
		y: -1 * health_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['heart_rate'],
		fill: white
	});
	health_screen.blood_pressure = canvas.display.text({
		x: -health_screen.width / 2 + 1.6 * health_screen.width / 10,
		y: -0 * health_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['blood_pressure'],
		fill: white
	});
	health_screen.blood_oxygen = canvas.display.text({
		x: -health_screen.width / 2 + 1.6 * health_screen.width / 10,
		y: +1 * health_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['blood_oxygen'],
		fill: white
	});
	health_screen.sleep_time = canvas.display.text({
		x: -health_screen.width / 2 + 1.6 * health_screen.width / 10,
		y: +2 * health_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['sleep_time'],
		fill: white
	});

	health_screen.circle_help_button = canvas.display.ellipse({
		x: health_screen.width / 2.5,
		y: health_screen.height / 2.5,
		radius: health_screen.height / 15,
		fill: black
	});

	health_screen.message = canvas.display.rectangle({
		x: 0,
		y: 1.5 * health_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: health_screen.width / 1.2,
		height: 0.5 * health_screen.width / 3,
		borderRadius: 5,
		fill: 'radial-gradient(' + white + ', ' + '#AAAAAA' + ')'
	});

	health_screen.message_text = canvas.display.text({
		x: 0,
		y: -0.3 * health_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		align: 'left',
		font: get_size_px(canvas, 14),
		text: health['weekly_health_report'],
		fill: black
	});

	health_screen.message_result = canvas.display.text({
		x: 0,
		y: 0.3 * health_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		align: 'left',
		font: get_size_px(canvas, 15),
		text: health['good'],
		fill: black
	});

	health_screen.health_help_button
		.bind('click tap', function() {
			changeScreen(canvas, build_health_help_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	var images = [ 'Heart Rate.png', 'Blood Pressure.png', 'Blood Oxygen.png', 'Sleep Time.png' ];
	health_screen.addChild(health_screen.heart_rate);
	health_screen.addChild(health_screen.blood_pressure);
	health_screen.addChild(health_screen.blood_oxygen);
	health_screen.addChild(health_screen.sleep_time);

	links = add_lines(canvas, health_screen, -1, 0, images);

	health_screen.message.addChild(health_screen.message_text);
	health_screen.message.addChild(health_screen.message_result);
	health_screen.addChild(health_screen.message);
	health_screen.addChild(health_screen.circle_help_button);

	links[0].bind('click tap', function() {
		changeScreen(canvas, build_heart_rate_screen(canvas));
	});
	links[1].bind('click tap', function() {
		changeScreen(canvas, build_blood_pressure_screen(canvas));
	});
	links[2].bind('click tap', function() {
		changeScreen(canvas, build_blood_oxygen_screen(canvas));
	});
	links[3].bind('click tap', function() {
		changeScreen(canvas, build_sleep_time_screen(canvas));
	});

	build_health_template(canvas, health_screen, 2);
	health_screen.addChild(health_screen.health_help_button);

	return health_screen;
}

function build_health_help_screen(canvas) {
	var health_help_screen = canvas.display.rectangle({
		description: descriptions['health_help'],
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

	health_help_screen.help_text = canvas.display.text({
		x: 0,
		y: 1 * health_help_screen.height / 22,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: others['help_health'],
		fill: white
	});

	health_help_screen.addChild(health_help_screen.help_text);

	return health_help_screen;
}

function build_heart_rate_screen(canvas) {
	var heart_rate_screen = canvas.display.rectangle({
		description: descriptions['heart_rate'],
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

	heart_rate_screen.live = canvas.display.text({
		x: -heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
		y: -1.5 * heart_rate_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['at_the_moment'],
		fill: white
	});

	heart_rate_screen.today = canvas.display.text({
		x: -heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
		y: -0.5 * heart_rate_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['today'],
		fill: white
	});

	heart_rate_screen.weekly = canvas.display.text({
		x: -heart_rate_screen.width / 2 + heart_rate_screen.width / 10,
		y: +0.5 * heart_rate_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['week'],
		fill: white
	});

	heart_rate_screen.message = canvas.display.rectangle({
		x: 0,
		y: heart_rate_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		width: heart_rate_screen.width / 4,
		height: heart_rate_screen.width / 4,
		borderRadius: 5,
		fill: white
	});

	heart_rate_screen.message_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['good'],
		fill: black
	});

	heart_rate_screen.addChild(heart_rate_screen.live);
	heart_rate_screen.addChild(heart_rate_screen.today);
	heart_rate_screen.addChild(heart_rate_screen.weekly);

	var health_info = get_health_info(heart_rate_screen.description);
	links = add_lines(canvas, heart_rate_screen, -1.5, 2, null, health_info);

	heart_rate_screen.message.addChild(heart_rate_screen.message_text);
	heart_rate_screen.addChild(heart_rate_screen.message);

	return heart_rate_screen;
}

function build_blood_pressure_screen(canvas) {
	var blood_pressure_screen = canvas.display.rectangle({
		description: descriptions['blood_pressure'],
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

	blood_pressure_screen.systolic = canvas.display.text({
		x: -blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
		y: -1.5 * blood_pressure_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['systolic'],
		fill: white
	});

	blood_pressure_screen.diastolic = canvas.display.text({
		x: -blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
		y: -0.5 * blood_pressure_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['diastolic'],
		fill: white
	});

	blood_pressure_screen.report = canvas.display.text({
		x: -blood_pressure_screen.width / 2 + blood_pressure_screen.width / 10,
		y: +0.5 * blood_pressure_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['report'],
		fill: white
	});

	blood_pressure_screen.message = canvas.display.rectangle({
		x: 0,
		y: blood_pressure_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		width: 1.25 * blood_pressure_screen.width / 2,
		height: blood_pressure_screen.height / 4,
		borderRadius: 5,
		fill: white
	});

	blood_pressure_screen.message_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['new_measurement'],
		fill: black
	});

	blood_pressure_screen.addChild(blood_pressure_screen.systolic);
	blood_pressure_screen.addChild(blood_pressure_screen.diastolic);
	blood_pressure_screen.addChild(blood_pressure_screen.report);

	var health_info = get_health_info(blood_pressure_screen.description);
	links = add_lines(canvas, blood_pressure_screen, -1.5, 2, null, health_info);

	blood_pressure_screen.message.addChild(blood_pressure_screen.message_text);
	blood_pressure_screen.addChild(blood_pressure_screen.message);

	return blood_pressure_screen;
}

function build_blood_oxygen_screen(canvas) {
	var blood_oxygen_screen = canvas.display.rectangle({
		description: descriptions['blood_oxygen'],
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

	blood_oxygen_screen.today = canvas.display.text({
		x: -blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
		y: -1.5 * blood_oxygen_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['today'],
		fill: white
	});

	blood_oxygen_screen.weekly = canvas.display.text({
		x: -blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
		y: -0.5 * blood_oxygen_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['week'],
		fill: white
	});

	blood_oxygen_screen.report = canvas.display.text({
		x: -blood_oxygen_screen.width / 2 + blood_oxygen_screen.width / 10,
		y: +0.5 * blood_oxygen_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['report'],
		fill: white
	});

	blood_oxygen_screen.message = canvas.display.rectangle({
		x: 0,
		y: blood_oxygen_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		width: 1.25 * blood_oxygen_screen.width / 2,
		height: blood_oxygen_screen.height / 4,
		borderRadius: 5,
		fill: white
	});

	blood_oxygen_screen.message_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['new_measurement'],
		fill: black
	});

	blood_oxygen_screen.addChild(blood_oxygen_screen.today);
	blood_oxygen_screen.addChild(blood_oxygen_screen.weekly);
	blood_oxygen_screen.addChild(blood_oxygen_screen.report);

	var health_info = get_health_info(blood_oxygen_screen.description);
	links = add_lines(canvas, blood_oxygen_screen, -1.5, 2, null, health_info);

	blood_oxygen_screen.message.addChild(blood_oxygen_screen.message_text);
	blood_oxygen_screen.addChild(blood_oxygen_screen.message);

	return blood_oxygen_screen;
}

function build_sleep_time_screen(canvas) {
	var sleep_time_screen = canvas.display.rectangle({
		description: descriptions['sleep_time'],
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

	sleep_time_screen.today = canvas.display.text({
		x: -sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
		y: -1.5 * sleep_time_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['today'],
		fill: white
	});

	sleep_time_screen.weekly = canvas.display.text({
		x: -sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
		y: -0.5 * sleep_time_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['week'],
		fill: white
	});

	sleep_time_screen.report = canvas.display.text({
		x: -sleep_time_screen.width / 2 + sleep_time_screen.width / 10,
		y: +0.5 * sleep_time_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['report'],
		fill: white
	});

	sleep_time_screen.addChild(sleep_time_screen.today);
	sleep_time_screen.addChild(sleep_time_screen.weekly);
	sleep_time_screen.addChild(sleep_time_screen.report);

	var health_info = get_health_info(sleep_time_screen.description);
	links = add_lines(canvas, sleep_time_screen, -1.5, 2, null, health_info);

	return sleep_time_screen;
}

function build_sos_screen(canvas) {
	var sos_screen = canvas.display.rectangle({
		description: descriptions['sos'],
		description_show: false,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	sos_screen.live_monitoring = canvas.display.text({
		x: -sos_screen.width / 2 + sos_screen.width / 10,
		y: -1 * sos_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['live_monitoring'],
		fill: white
	});

	sos_screen.emergency_delay = canvas.display.text({
		x: -sos_screen.width / 2 + sos_screen.width / 10,
		y: -0 * sos_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['emergency_delay'],
		fill: white
	});

	sos_screen.circle_help_button = canvas.display.ellipse({
		x: sos_screen.width / 2.5,
		y: sos_screen.height / 2.5,
		radius: sos_screen.height / 15,
		fill: black
	});

	sos_screen.message = canvas.display.rectangle({
		x: 0,
		y: 1.1 * sos_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: sos_screen.width / 1.2,
		height: 0.75 * sos_screen.width / 3,
		borderRadius: 5,
		fill: 'radial-gradient(' + white + ', ' + '#AAAAAA' + ')'
	});

	sos_screen.message_text = canvas.display.text({
		x: 0,
		y: -0.35 * sos_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		align: 'center',
		font: get_size_px(canvas, 17),
		text: health['call_emergency'],
		fill: black
	});
	sos_screen.message_hold = canvas.display.text({
		x: 0,
		y: 0.35 * sos_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		align: 'center',
		font: get_size_px(canvas, 17),
		text: health['press_3_seconds'],
		fill: black
	});

	sos_screen.sos_help_button = canvas.display.image({
		x: sos_screen.width / 2.5,
		y: sos_screen.height / 2.5,
		width: sos_screen.width / 10,
		height: sos_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Help.png'
	});

	sos_screen.addChild(sos_screen.live_monitoring);
	sos_screen.addChild(sos_screen.emergency_delay);
	links = add_lines(canvas, sos_screen, -1, -1);

	sos_screen.sos_live_box = canvas.display.ellipse({
		x: sos_screen.width / 2 - 1 * sos_screen.width / 10,
		y: -1 * sos_screen.height / 10,
		radius: sos_screen.height / 30,
		stroke: '2px ' + white
	});
	sos_screen.addChild(sos_screen.sos_live_box);

	sos_screen.sos_live_box_tick = canvas.display.image({
		x: +sos_screen.height / 40,
		y: -sos_screen.height / 40,
		origin: { x: 'center', y: 'center' },
		width: sos_screen.height / 10,
		height: sos_screen.height / 10,
		image: MATERIALS_DIR + '/Tick.png'
	});
	if (sos.live_monitoring) sos_screen.sos_live_box.addChild(sos_screen.sos_live_box_tick);

	sos_screen.time_delay_box = canvas.display.rectangle({
		x: sos_screen.width / 2 - 1.3 * sos_screen.width / 10,
		y: 0 * sos_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		width: sos_screen.height / 7,
		height: sos_screen.height / 13,
		borderRadius: 5,
		stroke: '2px ' + white
	});
	sos_screen.addChild(sos_screen.time_delay_box);

	sos_screen.time_delay = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 15),
		text: sos.time_delays[sos.time_delay_option] + ' ' + health['seconds'],
		fill: white
	});
	sos_screen.time_delay_box.addChild(sos_screen.time_delay);

	sos_screen.message.addChild(sos_screen.message_text);
	sos_screen.message.addChild(sos_screen.message_hold);
	sos_screen.addChild(sos_screen.message);

	build_health_template(canvas, sos_screen, 1);
	sos_screen.addChild(sos_screen.circle_help_button);
	sos_screen.addChild(sos_screen.sos_help_button);

	sos_screen.sos_help_button
		.bind('click tap', function() {
			changeScreen(canvas, build_sos_help_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	sos_screen.sos_live_box
		.bind('click tap', function() {
			sos.live_monitoring = !sos.live_monitoring;
			if (sos.live_monitoring) sos_screen.sos_live_box.addChild(sos_screen.sos_live_box_tick);
			else sos_screen.sos_live_box.removeChild(sos_screen.sos_live_box_tick);
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	sos_screen.time_delay_box
		.bind('click tap', function() {
			sos.time_delay_option = (sos.time_delay_option + 1) % sos.time_delays.length;
			sos_screen.time_delay.text = sos.time_delays[sos.time_delay_option] + ' ' + health['seconds'];
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	if (sos.active) {
		sos.active = false;
		call_cancel_sos(sos_screen);
	}

	sos_screen.message.bind('mousedown touchstart', function() {
		var check = function() {
			if (canvas.mouse.buttonState == 'down' || canvas.touch.touchState == 'down') {
				if (sos_screen.message_hold.text.indexOf('1') != -1) {
					call_cancel_sos(sos_screen);
				}

				sos_screen.message_hold.text = sos_screen.message_hold.text.replace('2', '1');
				sos_screen.message_hold.text = sos_screen.message_hold.text.replace('3', '2');
				sos_screen.message_hold.text = sos_screen.message_hold.text.replace('4', '3');
				sos_screen.message_hold.text = sos_screen.message_hold.text.replace('5', '4');
			}
		};

		setTimeout(check, 1000);
		setTimeout(check, 2000);
		setTimeout(check, 3000);
		setTimeout(check, 4000);
		setTimeout(check, 5000);
	});

	sos_screen.message.bind('mouseup', function() {});

	return sos_screen;
}

function build_sos_help_screen(canvas) {
	var sos_help_screen = canvas.display.rectangle({
		description: descriptions['sos_help'],
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

	sos_help_screen.help_text = canvas.display.text({
		x: 0,
		y: -2 * sos_help_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 19),
		text: others['help'],
		fill: white
	});

	sos_help_screen.addChild(sos_help_screen.help_text);

	return sos_help_screen;
}

function build_fitness_screen(canvas) {
	var fitness_screen = canvas.display.rectangle({
		description: descriptions['fitness'],
		description_show: false,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	fitness_screen.energy = canvas.display.text({
		x: -fitness_screen.width / 2 + 1.6 * fitness_screen.width / 10,
		y: -1 * fitness_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['energy'],
		fill: white
	});

	fitness_screen.activity = canvas.display.text({
		x: -fitness_screen.width / 2 + 1.6 * fitness_screen.width / 10,
		y: -0 * fitness_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['activity'],
		fill: white
	});

	fitness_screen.nutrition = canvas.display.text({
		x: -fitness_screen.width / 2 + 1.6 * fitness_screen.width / 10,
		y: 1 * fitness_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['nutrition'],
		fill: white
	});

	fitness_screen.circle_help_button = canvas.display.ellipse({
		x: fitness_screen.width / 2.5,
		y: fitness_screen.height / 2.5,
		radius: fitness_screen.height / 15,
		fill: black
	});

	fitness_screen.fitness_help_button = canvas.display.image({
		x: fitness_screen.width / 2.5,
		y: fitness_screen.height / 2.5,
		width: fitness_screen.width / 10,
		height: fitness_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Help.png'
	});

	fitness_screen.fitness_graphic = canvas.display.image({
		x: 0,
		y: 1.3 * fitness_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: fitness_screen.width / 1.2,
		height: 0.75 * fitness_screen.width / 3,
		image: MATERIALS_DIR + '/Fitness_graphic_en.png'
	});

	var images = [ 'Energy.png', 'Activity.png', 'Nutrition.png' ];
	fitness_screen.addChild(fitness_screen.energy);
	fitness_screen.addChild(fitness_screen.activity);
	fitness_screen.addChild(fitness_screen.nutrition);
	links = add_lines(canvas, fitness_screen, -1, 0, images);

	links[0]
		.bind('click tap', function() {
			changeScreen(canvas, build_energy_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	links[1]
		.bind('click tap', function() {
			changeScreen(canvas, build_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	links[2]
		.bind('click tap', function() {
			changeScreen(canvas, build_nutrition_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	build_health_template(canvas, fitness_screen, 0);
	fitness_screen.addChild(fitness_screen.fitness_graphic);
	fitness_screen.addChild(fitness_screen.circle_help_button);
	fitness_screen.addChild(fitness_screen.fitness_help_button);

	fitness_screen.fitness_help_button
		.bind('click tap', function() {
			changeScreen(canvas, build_fitness_help_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	return fitness_screen;
}

function build_fitness_help_screen(canvas) {
	var fitness_help_screen = canvas.display.rectangle({
		description: descriptions['fitness_help'],
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

	fitness_help_screen.help_text = canvas.display.text({
		x: 0,
		y: -2 * fitness_help_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 19),
		text: others['help'],
		fill: white
	});

	fitness_help_screen.addChild(fitness_help_screen.help_text);

	return fitness_help_screen;
}

function build_energy_screen(canvas) {
	var energy_screen = canvas.display.rectangle({
		description: descriptions['energy'],
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

	energy_screen.today = canvas.display.text({
		x: -energy_screen.width / 2 + energy_screen.width / 10,
		y: -1.5 * energy_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['today'],
		fill: white
	});

	energy_screen.weekly = canvas.display.text({
		x: -energy_screen.width / 2 + energy_screen.width / 10,
		y: -0.5 * energy_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['week'],
		fill: white
	});

	energy_screen.units = canvas.display.text({
		x: -energy_screen.width / 2 + energy_screen.width / 10,
		y: +0.5 * energy_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['units'],
		fill: white
	});

	energy_screen.addChild(energy_screen.today);
	energy_screen.addChild(energy_screen.weekly);
	energy_screen.addChild(energy_screen.units);

	var health_info = get_health_info(energy_screen.description);
	links = add_lines(canvas, energy_screen, -1.5, 2, null, health_info);

	return energy_screen;
}

function build_activity_screen(canvas) {
	var activity_screen = canvas.display.rectangle({
		description: descriptions['activity'],
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

	activity_screen.distance = canvas.display.text({
		x: -activity_screen.width / 2 + activity_screen.width / 10,
		y: -1.5 * activity_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['distance'],
		fill: white
	});

	activity_screen.steps = canvas.display.text({
		x: -activity_screen.width / 2 + activity_screen.width / 10,
		y: -0.5 * activity_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['steps'],
		fill: white
	});

	activity_screen.elevation = canvas.display.text({
		x: -activity_screen.width / 2 + activity_screen.width / 10,
		y: +0.5 * activity_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['elevation'],
		fill: white
	});

	activity_screen.message = canvas.display.rectangle({
		x: 0,
		y: 1.1 * activity_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: activity_screen.width / 1.2,
		height: 0.75 * activity_screen.width / 3,
		borderRadius: 5,
		fill: 'radial-gradient(' + white + ', ' + '#AAAAAA' + ')'
	});

	activity_screen.message_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['start_activity'],
		fill: black
	});

	activity_screen.addChild(activity_screen.distance);
	activity_screen.addChild(activity_screen.steps);
	activity_screen.addChild(activity_screen.elevation);

	var health_info = get_health_info(activity_screen.description);
	links = add_lines(canvas, activity_screen, -1.5, 2, null, health_info);

	activity_screen.message.addChild(activity_screen.message_text);
	activity_screen.addChild(activity_screen.message);

	activity_screen.message
		.bind('click tap', function() {
			if (fitness.started) changeScreen(canvas, build_start_activity_screen(canvas));
			else changeScreen(canvas, build_choose_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	return activity_screen;
}

function build_nutrition_screen(canvas) {
	var nutrition_screen = canvas.display.rectangle({
		description: descriptions['nutrition'],
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

	nutrition_screen.vitamins = canvas.display.text({
		x: -nutrition_screen.width / 2 + nutrition_screen.width / 10,
		y: -1.5 * nutrition_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['vitamins'],
		fill: white
	});

	nutrition_screen.proteins = canvas.display.text({
		x: -nutrition_screen.width / 2 + nutrition_screen.width / 10,
		y: -0.5 * nutrition_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['proteins'],
		fill: white
	});

	nutrition_screen.water = canvas.display.text({
		x: -nutrition_screen.width / 2 + nutrition_screen.width / 10,
		y: +0.5 * nutrition_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['water'],
		fill: white
	});

	nutrition_screen.fat = canvas.display.text({
		x: -nutrition_screen.width / 2 + nutrition_screen.width / 10,
		y: +1.5 * nutrition_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['fat'],
		fill: white
	});

	nutrition_screen.calcium = canvas.display.text({
		x: -nutrition_screen.width / 2 + nutrition_screen.width / 10,
		y: +2.5 * nutrition_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['calcium'],
		fill: white
	});

	nutrition_screen.addChild(nutrition_screen.vitamins);
	nutrition_screen.addChild(nutrition_screen.proteins);
	nutrition_screen.addChild(nutrition_screen.water);
	nutrition_screen.addChild(nutrition_screen.fat);
	nutrition_screen.addChild(nutrition_screen.calcium);

	var health_info = get_health_info(nutrition_screen.description);
	links = add_lines(canvas, nutrition_screen, -1.5, 2, null, health_info);

	return nutrition_screen;
}

function build_choose_activity_screen(canvas) {
	var choose_activity_screen = canvas.display.rectangle({
		description: descriptions['choose_activity'],
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

	var line_separating = canvas.display.line({
		start: { x: -0.55 * choose_activity_screen.width / 2, y: 0.2 * choose_activity_screen.height / 2 },
		end: { x: 0.55 * choose_activity_screen.width / 2, y: 0.2 * choose_activity_screen.height / 2 },
		stroke: '2px ' + white,
		cap: 'round'
	});
	choose_activity_screen.addChild(line_separating);

	var line_separating = canvas.display.line({
		start: { x: 0, y: (0.2 - 0.55) * choose_activity_screen.height / 2 },
		end: { x: 0, y: (0.2 + 0.55) * choose_activity_screen.height / 2 },
		stroke: '2px ' + white,
		cap: 'round'
	});
	choose_activity_screen.addChild(line_separating);

	choose_activity_screen.walk_button = canvas.display.image({
		x: -choose_activity_screen.width / 7,
		y: -choose_activity_screen.height / 4.75 + 0.3 * choose_activity_screen.height / 2,
		width: choose_activity_screen.width / 4.75,
		height: choose_activity_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Activity-Walk.png'
	});
	choose_activity_screen.run_button = canvas.display.image({
		x: +choose_activity_screen.width / 6,
		y: -choose_activity_screen.height / 4.75 + 0.3 * choose_activity_screen.height / 2,
		width: choose_activity_screen.width / 4.75,
		height: choose_activity_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Activity-Run.png'
	});
	choose_activity_screen.bike_button = canvas.display.image({
		x: -choose_activity_screen.width / 6,
		y: +choose_activity_screen.height / 4.75 + 0.1 * choose_activity_screen.height / 2,
		width: choose_activity_screen.width / 4.75,
		height: choose_activity_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Activity-Bike.png'
	});
	choose_activity_screen.gym_button = canvas.display.image({
		x: +choose_activity_screen.width / 6,
		y: +choose_activity_screen.height / 4.75 + 0.1 * choose_activity_screen.height / 2,
		width: choose_activity_screen.width / 4.75,
		height: choose_activity_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Activity-Gym.png'
	});

	choose_activity_screen.addChild(choose_activity_screen.walk_button);
	choose_activity_screen.addChild(choose_activity_screen.run_button);
	choose_activity_screen.addChild(choose_activity_screen.bike_button);
	choose_activity_screen.addChild(choose_activity_screen.gym_button);

	choose_activity_screen.walk_button
		.bind('click tap', function() {
			fitness.type = 'activity_walk';
			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	choose_activity_screen.run_button
		.bind('click tap', function() {
			fitness.type = 'activity_run';
			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	choose_activity_screen.gym_button
		.bind('click tap', function() {
			fitness.type = 'activity_gym';
			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	choose_activity_screen.bike_button
		.bind('click tap', function() {
			fitness.type = 'activity_bike';
			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	return choose_activity_screen;
}

function build_start_activity_screen(canvas) {
	var activity_screen = canvas.display.rectangle({
		description: descriptions[fitness.type],
		description_show: false,
		template: true,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	activity_screen.type = canvas.display.text({
		x: -activity_screen.width / 2 + activity_screen.width / 10,
		y: -2.5 * activity_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['type'],
		fill: white
	});

	activity_screen.distance = canvas.display.text({
		x: -activity_screen.width / 2 + activity_screen.width / 10,
		y: -1.5 * activity_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['distance'],
		fill: white
	});
	
	activity_screen.calories = canvas.display.text({
		x: -activity_screen.width / 2 + activity_screen.width / 10,
		y: -1.5 * activity_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['energy'],
		fill: white
	});

	activity_screen.time = canvas.display.text({
		x: -activity_screen.width / 2 + activity_screen.width / 10,
		y: -0.5 * activity_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['duration'],
		fill: white
	});

	activity_screen.sharing = canvas.display.text({
		x: -activity_screen.width / 2 + activity_screen.width / 10,
		y: 0.5 * activity_screen.height / 10,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['share'],
		fill: white
	});

	var info = [];
	activity_screen.addChild(activity_screen.type);
	info.push(activity_screen.description);

	if (activity_screen.description == descriptions['activity_gym']) {
		activity_screen.addChild(activity_screen.calories);
		info.push(fitness.calories + ' ' + health['cal'])
	} else {
		activity_screen.addChild(activity_screen.distance);
		info.push((fitness.distance).toFixed(3) + ' ' + health['km']);
	}

	activity_screen.addChild(activity_screen.time);
	info.push(Math.floor(fitness.duration) + ' ' + health['minutes']);

	activity_screen.addChild(activity_screen.sharing);
	info.push('none');

	activity_screen.links = add_lines(canvas, activity_screen, -2.5, 2, null, info);

	activity_screen.sharing_box = canvas.display.ellipse({
		x: activity_screen.width / 2 - 1 * activity_screen.width / 10,
		y: 0.5 * activity_screen.height / 10,
		radius: activity_screen.height / 30,
		stroke: '2px ' + white
	});
	activity_screen.addChild(activity_screen.sharing_box);

	activity_screen.sharing_tick = canvas.display.image({
		x: +activity_screen.height / 40,
		y: -activity_screen.height / 40,
		origin: { x: 'center', y: 'center' },
		width: activity_screen.height / 10,
		height: activity_screen.height / 10,
		image: MATERIALS_DIR + '/Tick.png'
	});
	if (fitness.sharing) activity_screen.sharing_box.addChild(activity_screen.sharing_tick);

	activity_screen.start_button = canvas.display.rectangle({
		x: 0,
		y: 1.25 * activity_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: activity_screen.width / 1.2,
		height: 0.60 * activity_screen.width / 3,
		borderRadius: 5,
		fill: 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')'
	});
	activity_screen.start_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['start'],
		fill: white
	});
	activity_screen.start_button.addChild(activity_screen.start_text);

	activity_screen.cancel_button = canvas.display.rectangle({
		x: - 0.41 * activity_screen.width / 2,
		y: 1.25 * activity_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.80 * activity_screen.width / 2,
		height: 0.60 * activity_screen.width / 3,
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,
		fill: 'radial-gradient(' + white + ', ' + '#cccccc' + ')'
	});
	activity_screen.stop_button = canvas.display.rectangle({
		x: 0.41 * activity_screen.width / 2,
		y: 1.25 * activity_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.80 * activity_screen.width / 2,
		height: 0.60 * activity_screen.width / 3,
		borderBottomRightRadius: 5,
		borderTopRightRadius: 5,
		fill: 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')'
	});

	activity_screen.cancel_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['cancel'],
		fill: '#AA5555'
	});
	activity_screen.stop_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['stop'],
		fill: white
	});

	activity_screen.cancel_button.addChild(activity_screen.cancel_text);
	activity_screen.stop_button.addChild(activity_screen.stop_text);

	if (fitness.started) {
		activity_screen.addChild(activity_screen.cancel_button);
		activity_screen.addChild(activity_screen.stop_button);
	} else {
		activity_screen.addChild(activity_screen.start_button);
	}

	activity_screen.sharing_box
		.bind('click tap', function() {
			fitness.sharing = !fitness.sharing;
			if (fitness.sharing) activity_screen.sharing_box.addChild(activity_screen.sharing_tick);
			else activity_screen.sharing_box.removeChild(activity_screen.sharing_tick);
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	activity_screen.start_button
		.bind('click tap', function() {
			fitness.started = true;
			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	activity_screen.cancel_button
		.bind('click tap', function() {
			changeScreen(canvas, build_cancel_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});
	
	activity_screen.stop_button
		.bind('click tap', function() {
			changeScreen(canvas, build_stop_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	return activity_screen;
}

function build_cancel_activity_screen(canvas) {
	var cancel_screen = canvas.display.rectangle({
		description: descriptions['cancel_activity'],
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

	cancel_screen.message = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		align: 'center',
		font: get_size_px(canvas, 17),
		text: health['cancel_activity'],
		fill: white
	});

	cancel_screen.yes_button = canvas.display.rectangle({
		x: + 0.41 * cancel_screen.width / 2,
		y: 1.25 * cancel_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.80 * cancel_screen.width / 4,
		height: 0.60 * cancel_screen.width / 6,
		borderRadius: 5,
		fill: 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')'
	});
	cancel_screen.yes_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['yes'],
		fill: black
	});

	cancel_screen.no_button = canvas.display.rectangle({
		x: - 0.41 * cancel_screen.width / 2,
		y: 1.25 * cancel_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.80 * cancel_screen.width / 4,
		height: 0.60 * cancel_screen.width / 6,
		borderRadius: 5,
		borderTopLeftRadius: 5,
		fill: 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')'
	});
	cancel_screen.no_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['no'],
		fill: black
	});

	cancel_screen.yes_button.addChild(cancel_screen.yes_text);
	cancel_screen.no_button.addChild(cancel_screen.no_text);
	cancel_screen.addChild(cancel_screen.yes_button);
	cancel_screen.addChild(cancel_screen.no_button);
	cancel_screen.addChild(cancel_screen.message);
	
	cancel_screen.yes_button
		.bind('click tap', function() {
			fitness.started = false;
			fitness.distance = 0;
			fitness.calories = 0;
			fitness.duration = 0;

			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	cancel_screen.no_button
		.bind('click tap', function() {
			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	return cancel_screen;
}

function build_stop_activity_screen(canvas) {
	var stop_screen = canvas.display.rectangle({
		description: descriptions['stop_activity'],
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

	stop_screen.message = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		align: 'center',
		font: get_size_px(canvas, 17),
		text: health['stop_activity'],
		fill: white
	});

	stop_screen.yes_button = canvas.display.rectangle({
		x: + 0.41 * stop_screen.width / 2,
		y: 1.25 * stop_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.80 * stop_screen.width / 4,
		height: 0.60 * stop_screen.width / 6,
		borderRadius: 5,
		fill: 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')'
	});
	stop_screen.yes_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['yes'],
		fill: black
	});

	stop_screen.no_button = canvas.display.rectangle({
		x: - 0.41 * stop_screen.width / 2,
		y: 1.25 * stop_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.80 * stop_screen.width / 4,
		height: 0.60 * stop_screen.width / 6,
		borderRadius: 5,
		borderTopLeftRadius: 5,
		fill: 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')'
	});
	stop_screen.no_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health['no'],
		fill: black
	});

	stop_screen.yes_button.addChild(stop_screen.yes_text);
	stop_screen.no_button.addChild(stop_screen.no_text);
	stop_screen.addChild(stop_screen.yes_button);
	stop_screen.addChild(stop_screen.no_button);
	stop_screen.addChild(stop_screen.message);
	
	stop_screen.yes_button
		.bind('click tap', function() {
			health_information.today.distance += fitness.distance;
			health_information.today.calories += fitness.calories;
			health_information.today.steps += fitness.steps;

			fitness.started = false;
			fitness.distance = 0;
			fitness.calories = 0;
			fitness.steps = 0;
			fitness.duration = 0;

			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	stop_screen.no_button
		.bind('click tap', function() {
			changeScreen(canvas, build_start_activity_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	return stop_screen;
}