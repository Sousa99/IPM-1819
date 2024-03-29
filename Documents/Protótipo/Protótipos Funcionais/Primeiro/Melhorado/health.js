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

	var options = [ health['heart_rate'], health['blood_pressure'], health['blood_oxygen'], health['sleep_time'] ];
	var link = [ 'link_arrow', 'link_arrow', 'link_arrow', 'link_arrow' ];
	var images = [ 'Heart Rate.png', 'Blood Pressure.png', 'Blood Oxygen.png', 'Sleep Time.png' ];

	links = add_lines(canvas, health_screen, -1, options, link, images);

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
		x: -0.9 * health_help_screen.width / 2,
		y: 0.95 * health_help_screen.height / 22,
		origin: { x: 'left', y: 'center' },
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

	heart_rate_screen.message = canvas.display.rectangle({
		x: 0,
		y: 0.9 * heart_rate_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		width: 1.25 * heart_rate_screen.width / 2,
		height: heart_rate_screen.height / 4,
		borderRadius: 5,
		fill: white
	});

	var options = [ health['at_the_moment'], health['today'], health['week'] ];
	var link = [ 'text', 'text', 'text', 'text' ];
	var info = get_health_info(heart_rate_screen.description);

	links = add_lines(canvas, heart_rate_screen, -1.5, options, link, null, info);

	heart_rate_screen.message_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
		align: 'center',
		font: get_size_px(canvas, 17),
		text: get_qualitative_heart_rate(health_information.at_the_moment.heart_rate),
		fill: black
	});

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

	blood_pressure_screen.message = canvas.display.rectangle({
		x: 0,
		y: 0.9 * blood_pressure_screen.height / 3,
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

	var options = [ health['systolic'], health['diastolic'], health['report'] ];
	var link = [ 'text', 'text', 'text', 'text' ];
	var info = get_health_info(blood_pressure_screen.description);
	links = add_lines(canvas, blood_pressure_screen, -1.5, options, link, null, info);

	blood_pressure_screen.message.addChild(blood_pressure_screen.message_text);
	blood_pressure_screen.addChild(blood_pressure_screen.message);

	blood_pressure_screen.message
		.bind('click tap', function() {
			changeScreen(canvas, build_new_measurement_screen(canvas, 'blood_pressure'));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

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

	blood_oxygen_screen.message = canvas.display.rectangle({
		x: 0,
		y: 0.9 * blood_oxygen_screen.height / 3,
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

	var options = [ health['today'], health['week'], health['report'] ];
	var link = [ 'text', 'text', 'text', 'text' ];
	var info = get_health_info(blood_oxygen_screen.description);
	links = add_lines(canvas, blood_oxygen_screen, -1.5, options, link, null, info);

	blood_oxygen_screen.message.addChild(blood_oxygen_screen.message_text);
	blood_oxygen_screen.addChild(blood_oxygen_screen.message);

	blood_oxygen_screen.message
		.bind('click tap', function() {
			changeScreen(canvas, build_new_measurement_screen(canvas, 'blood_oxygen'));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

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

	switch (language) {
		case 'pt':
			sleep_time_screen.graphic = canvas.display.image({
				x: 0,
				y: 1.2 * sleep_time_screen.height / 4,
				origin: { x: 'center', y: 'center' },
				width: sleep_time_screen.width / 1.4,
				height: 1.1 * sleep_time_screen.width / 3,
				image: MATERIALS_DIR + '/sleep_graph_pt.png'
			});
			break;
		case 'en':
			sleep_time_screen.graphic = canvas.display.image({
				x: 0,
				y: 1.2 * sleep_time_screen.height / 4,
				origin: { x: 'center', y: 'center' },
				width: sleep_time_screen.width / 1.4,
				height: 1.1 * sleep_time_screen.width / 3,
				image: MATERIALS_DIR + '/sleep_graph_en.png'
			});
			break;
	}

	var options = [ health['today'], health['week'], health['report'] ];
	var link = [ 'text', 'text', 'text', 'text' ];
	var info = get_health_info(sleep_time_screen.description);
	links = add_lines(canvas, sleep_time_screen, -1.5, options, link, null, info);

	sleep_time_screen.addChild(sleep_time_screen.graphic);

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

	var options = [ health['live_monitoring'], health['emergency_delay'] ];
	var link = [ 'link', 'link' ];
	links = add_lines(canvas, sos_screen, -1, options, link);

	sos_screen.sos_live_box = canvas.display.ellipse({
		x: sos_screen.width / 2 - 1 * sos_screen.width / 10,
		y: 0,
		radius: sos_screen.height / 30,
		stroke: '2px ' + white
	});
	links[0].addChild(sos_screen.sos_live_box);

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
		y: 0,
		origin: { x: 'center', y: 'center' },
		width: sos_screen.height / 7,
		height: sos_screen.height / 13,
		borderRadius: 5,
		stroke: '2px ' + white
	});
	links[1].addChild(sos_screen.time_delay_box);

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

	links[0]
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

	links[1]
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
		x: -0.9 * sos_help_screen.width / 2,
		y: 0.95 * sos_help_screen.height / 22,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: others['help_sos'],
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

	switch (language) {
		case 'pt':
			fitness_screen.fitness_graphic = canvas.display.image({
				x: 0,
				y: 1.3 * fitness_screen.height / 4,
				origin: { x: 'center', y: 'center' },
				width: fitness_screen.width / 1.5,
				height: 0.75 * fitness_screen.width / 3,
				image: MATERIALS_DIR + '/ftpt.png'
			});
			break;
		case 'en':
			fitness_screen.fitness_graphic = canvas.display.image({
				x: 0,
				y: 1.3 * fitness_screen.height / 4,
				origin: { x: 'center', y: 'center' },
				width: fitness_screen.width / 1.5,
				height: 0.75 * fitness_screen.width / 3,
				image: MATERIALS_DIR + '/ften.png'
			});
			break;
	}

	var options = [ health['energy'], health['activity'], health['nutrition'] ];
	var link = [ 'link_arrow', 'link_arrow', 'link_arrow' ];
	var images = [ 'Energy.png', 'Activity.png', 'Nutrition.png' ];
	links = add_lines(canvas, fitness_screen, -1, options, link, images);

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
		x: -0.9 * fitness_help_screen.width / 2,
		y: 0.95 * fitness_help_screen.height / 22,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: others['help_fitness'],
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

	switch (language) {
		case 'pt':
			energy_screen.energy_graphic = canvas.display.image({
				x: 0,
				y: 1.2 * energy_screen.height / 4,
				origin: { x: 'center', y: 'center' },
				width: energy_screen.width / 1.4,
				height: 1.1 * energy_screen.width / 3,
				image: MATERIALS_DIR + '/egpt.png'
			});
			break;
		case 'en':
			energy_screen.energy_graphic = canvas.display.image({
				x: 0,
				y: 1.2 * energy_screen.height / 4,
				origin: { x: 'center', y: 'center' },
				width: energy_screen.width / 1.4,
				height: 1.1 * energy_screen.width / 3,
				image: MATERIALS_DIR + '/egen.png'
			});
			break;
	}

	var options = [ health['today'], health['week'] ];
	var link = [ 'text', 'text' ];
	var info = get_health_info(energy_screen.description);
	links = add_lines(canvas, energy_screen, -1.5, options, link, null, info);

	energy_screen.addChild(energy_screen.energy_graphic);
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

	var options = [ health['distance'], health['steps'], health['elevation'] ];
	var link = [ 'text', 'text', 'text' ];
	var info = get_health_info(activity_screen.description);
	links = add_lines(canvas, activity_screen, -1.5, options, link, null, info);

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

	var options = [ health['vitamins'], health['proteins'], health['water'], health['fat'], health['calcium'] ];
	var link = [ 'text', 'text', 'text', 'text', 'text' ];
	var info = get_health_info(nutrition_screen.description);
	links = add_lines(canvas, nutrition_screen, -1.5, options, link, null, info);

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

	choose_activity_screen.circle_help_button = canvas.display.ellipse({
		x: choose_activity_screen.width / 2.5,
		y: choose_activity_screen.height / 2.5,
		radius: choose_activity_screen.height / 15,
		fill: black
	});

	choose_activity_screen.choose_activity_help_button = canvas.display.image({
		x: choose_activity_screen.width / 2.5,
		y: choose_activity_screen.height / 2.5,
		width: choose_activity_screen.width / 10,
		height: choose_activity_screen.height / 10,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Help.png'
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

	choose_activity_screen.choose_activity_help_button
		.bind('click tap', function() {
			changeScreen(canvas, build_choose_activity_help_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

	choose_activity_screen.addChild(choose_activity_screen.circle_help_button);
	choose_activity_screen.addChild(choose_activity_screen.choose_activity_help_button);

	return choose_activity_screen;
}

function build_choose_activity_help_screen(canvas) {
	var choose_activity_help_screen = canvas.display.rectangle({
		description: descriptions['choose_activity_help'],
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

	choose_activity_help_screen.help_text = canvas.display.text({
		x: -0.9 * choose_activity_help_screen.width / 2,
		y: 0.95 * choose_activity_help_screen.height / 22,
		origin: { x: 'left', y: 'center' },
		font: get_size_px(canvas, 17),
		text: others['help_choose_activity'],
		fill: white
	});

	choose_activity_help_screen.addChild(choose_activity_help_screen.help_text);

	return choose_activity_help_screen;
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

	var info = [];
	info.push(activity_screen.description);
	if (activity_screen.description == descriptions['activity_gym']) info.push(fitness.calories + ' ' + health['cal']);
	else info.push(fitness.distance.toFixed(3) + ' ' + health['km']);
	info.push(Math.floor(fitness.duration) + ' ' + health['minutes']);
	info.push('none');

	var options = [ health['type'], health['distance'], health['duration'], health['share'] ];
	if (activity_screen.description == descriptions['activity_gym']) options[1] = health['energy'];
	var link = [ 'text', 'text', 'text', 'link' ];
	links = add_lines(canvas, activity_screen, -2.5, options, link, null, info);

	activity_screen.sharing_box = canvas.display.ellipse({
		x: activity_screen.width / 2 - 1 * activity_screen.width / 10,
		y: 0,
		radius: activity_screen.height / 30,
		stroke: '2px ' + white
	});
	links[0].addChild(activity_screen.sharing_box);

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
		height: 0.6 * activity_screen.width / 3,
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
		x: -0.41 * activity_screen.width / 2,
		y: 1.25 * activity_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.8 * activity_screen.width / 2,
		height: 0.6 * activity_screen.width / 3,
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,
		fill: 'radial-gradient(' + white + ', ' + '#cccccc' + ')'
	});
	activity_screen.stop_button = canvas.display.rectangle({
		x: 0.41 * activity_screen.width / 2,
		y: 1.25 * activity_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.8 * activity_screen.width / 2,
		height: 0.6 * activity_screen.width / 3,
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

	links[0]
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
		x: +0.41 * cancel_screen.width / 2,
		y: 1.25 * cancel_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.8 * cancel_screen.width / 4,
		height: 0.6 * cancel_screen.width / 6,
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
		x: -0.41 * cancel_screen.width / 2,
		y: 1.25 * cancel_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.8 * cancel_screen.width / 4,
		height: 0.6 * cancel_screen.width / 6,
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
		x: +0.41 * stop_screen.width / 2,
		y: 1.25 * stop_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.8 * stop_screen.width / 4,
		height: 0.6 * stop_screen.width / 6,
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
		x: -0.41 * stop_screen.width / 2,
		y: 1.25 * stop_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.8 * stop_screen.width / 4,
		height: 0.6 * stop_screen.width / 6,
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

function build_new_measurement_screen(canvas, type) {
	var new_measurement_screen = canvas.display.rectangle({
		description: descriptions['new_measurement'],
		description_show: true,
		template: true,
		back_page: type,
		done: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
	});

	new_measurement_screen.type_text = canvas.display.text({
		x: 0,
		y: -0.6 * new_measurement_screen.height / 2,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 17),
		text: health[type],
		fill: white
	});

	var image_link;
	switch (type) {
		case 'blood_pressure':
			image_link = MATERIALS_DIR + '/Blood Pressure.png';
			break;
		case 'blood_oxygen':
			image_link = MATERIALS_DIR + '/Blood Oxygen.png';
			break;
	}

	new_measurement_screen.image = canvas.display.image({
		x: 0,
		y: new_measurement_screen.height / 10,
		width: new_measurement_screen.width / 3,
		height: new_measurement_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		image: image_link
	});

	new_measurement_screen.circle = canvas.display.arc({
		x: 0,
		y: new_measurement_screen.height / 10,
		radius: 10 * new_measurement_screen.width / 36,
		start: 0,
		end: 0,
		stroke: '10px #AA5555'
	});

	new_measurement_screen.done_text = canvas.display.text({
		x: 0,
		y: 0.9 * new_measurement_screen.height / 2,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 19),
		text: health['done'],
		fill: white
	});

	new_measurement_screen.addChild(new_measurement_screen.type_text);
	new_measurement_screen.addChild(new_measurement_screen.image);
	new_measurement_screen.addChild(new_measurement_screen.circle);

	return new_measurement_screen;
}
