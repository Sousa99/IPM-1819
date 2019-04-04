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
		y: -2 * health_help_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 19),
		text: others['help'],
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

	blood_pressure_screen.addChild(blood_pressure_screen.systolic);
	blood_pressure_screen.addChild(blood_pressure_screen.diastolic);
	blood_pressure_screen.addChild(blood_pressure_screen.report);

	links = add_lines(canvas, blood_pressure_screen, -1.5, 0);

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

	blood_oxygen_screen.addChild(blood_oxygen_screen.today);
	blood_oxygen_screen.addChild(blood_oxygen_screen.weekly);
	blood_oxygen_screen.addChild(blood_oxygen_screen.report);

	links = add_lines(canvas, blood_oxygen_screen, -1.5, 0);

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
	health_info.push('link');
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
		text: health['live'],
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
		y: - 0.35 * sos_screen.height / 10,
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

	// TODO: Add button

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

	if (sos.active) {
		sos.active = false;
		call_cancel_sos(sos_screen);
	}

	sos_screen.message.bind('mousedown touchstart', function() {
		var check = function() {
			if (canvas.mouse.buttonState == 'down') {
				if (sos_screen.message_hold.text.indexOf('1') != -1) {
					call_cancel_sos(sos_screen)
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

	fitness_screen.fitness_help_button = canvas.display.image({
		x: fitness_screen.width / 2.5,
		y: fitness_screen.height / 2.5,
		width: fitness_screen.width / 10,
		height: fitness_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Help.png'
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
			changeScreen(canvas, build_choose_activity_screen(canvas));
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
		x: -choose_activity_screen.width / 4.75,
		y: -choose_activity_screen.height / 4.75 + 0.2 * choose_activity_screen.height / 2,
		width: choose_activity_screen.width / 4.75,
		height: choose_activity_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Activity-Walk.png'
	});
	choose_activity_screen.run_button = canvas.display.image({
		x: +choose_activity_screen.width / 4.75,
		y: -choose_activity_screen.height / 4.75 + 0.2 * choose_activity_screen.height / 2,
		width: choose_activity_screen.width / 4.75,
		height: choose_activity_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Activity-Run.png'
	});
	choose_activity_screen.cycle_button = canvas.display.image({
		x: -choose_activity_screen.width / 4.75,
		y: +choose_activity_screen.height / 4.75 + 0.2 * choose_activity_screen.height / 2,
		width: choose_activity_screen.width / 4.75,
		height: choose_activity_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Activity-Bike.png'
	});
	choose_activity_screen.gym_button = canvas.display.image({
		x: +choose_activity_screen.width / 4.75,
		y: +choose_activity_screen.height / 4.75 + 0.2 * choose_activity_screen.height / 2,
		width: choose_activity_screen.width / 4.75,
		height: choose_activity_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Activity-Gym.png'
	});

	choose_activity_screen.addChild(choose_activity_screen.walk_button);
	choose_activity_screen.addChild(choose_activity_screen.run_button);
	choose_activity_screen.addChild(choose_activity_screen.cycle_button);
	choose_activity_screen.addChild(choose_activity_screen.gym_button);

	return choose_activity_screen;
}
