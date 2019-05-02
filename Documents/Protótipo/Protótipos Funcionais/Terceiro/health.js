function build_health_template(canvas, screen, active) {
	var links = []
	var colors = [ white, white, white ]

	colors[active] = '#e85151'

	screen.sos_bar = build_rectangle(canvas, [0, - 3 / 10 * screen.height], [screen.width / 4, screen.height / 7], undefined, colors[1])
	screen.health_bar = build_rectangle(canvas, [screen.width / 4, - 3 / 10 * screen.height], [screen.width / 4, screen.height / 7], undefined, colors[2], [0, 5, 0, 5])
	screen.fitness_bar = build_rectangle(canvas, [- screen.width / 4, - 3 / 10 * screen.height], [screen.width / 4, screen.height / 7], undefined, colors[0], [5, 0, 5, 0])
	
	screen.sos_bar_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), health['sos'], black)
	screen.health_bar_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 14), health['health'], black)
	screen.fitness_bar_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 14), health['fitness'], black)

	links.push(screen.sos_bar)
	screen.addChild(screen.sos_bar)
	screen.sos_bar.addChild(screen.sos_bar_text)
	links.push(screen.health_bar)
	screen.addChild(screen.health_bar)
	screen.health_bar.addChild(screen.health_bar_text)
	links.push(screen.fitness_bar)
	screen.addChild(screen.fitness_bar)
	screen.fitness_bar.addChild(screen.fitness_bar_text)

	if (active != 0) {
		object_clickable(canvas, screen.fitness_bar)
		screen.fitness_bar.bind('click tap', function() {
			changeScreen(canvas, build_fitness_screen(canvas))
		})
	}
	if (active != 1) {
		object_clickable(canvas, screen.sos_bar)
		screen.sos_bar.bind('click tap', function() {
			changeScreen(canvas, build_sos_screen(canvas))
		})
	}
	if (active != 2) {
		object_clickable(canvas, screen.health_bar)
		screen.health_bar.bind('click tap', function() {
			changeScreen(canvas, build_health_screen(canvas))
		})
	}
}

function build_health_screen(canvas) {
	var health_screen = build_screen(canvas, descriptions['health'], false, true)

	health_screen.health_help_button = build_image(canvas, [2 / 5 * health_screen.width, 2 / 5 * health_screen.height], [health_screen.width / 10, health_screen.height / 10], undefined, MATERIALS_DIR + '/Help.png')
	health_screen.circle_help_button = build_ellipse(canvas, [2 / 5 * health_screen.width, 2 / 5 * health_screen.height], health_screen.width / 15, black)

	health_screen.message = build_rectangle(canvas, [0, 3 / 8 * health_screen.height], [5 / 6 * health_screen.width, health_screen.height / 6], undefined, 'radial-gradient(' + white + ', ' + '#AAAAAA' + ')', [5, 5, 5, 5])
	health_screen.message_text = build_text(canvas, [0, - 3 / 100 * health_screen.height], undefined, 'left', get_size_px(canvas, 14), health['weekly_health_report'], black)
	health_screen.message_result = build_text(canvas, [0, 3 / 100 * health_screen.height], undefined, 'left', get_size_px(canvas, 15), health['good'], black)

	object_clickable(canvas, health_screen.health_help_button)
	health_screen.health_help_button.bind('click tap', function() {
		changeScreen(canvas, build_health_help_screen(canvas))
	})

	var options = [ health['heart_rate'], health['blood_pressure'], health['blood_oxygen'], health['sleep_time'] ]
	var link = [ 'link_arrow', 'link_arrow', 'link_arrow', 'link_arrow' ]
	var images = [ 'Heart Rate.png', 'Blood Pressure.png', 'Blood Oxygen.png', 'Sleep Time.png' ]

	links = add_lines(canvas, health_screen, -1, options, link, images)

	health_screen.message.addChild(health_screen.message_text)
	health_screen.message.addChild(health_screen.message_result)
	health_screen.addChild(health_screen.message)
	health_screen.addChild(health_screen.circle_help_button)

	links[0].bind('click tap', function() {
		changeScreen(canvas, build_heart_rate_screen(canvas))
	})
	links[1].bind('click tap', function() {
		changeScreen(canvas, build_blood_pressure_screen(canvas))
	})
	links[2].bind('click tap', function() {
		changeScreen(canvas, build_blood_oxygen_screen(canvas))
	})
	links[3].bind('click tap', function() {
		changeScreen(canvas, build_sleep_time_screen(canvas))
	})

	build_health_template(canvas, health_screen, 2)
	health_screen.addChild(health_screen.health_help_button)

	return health_screen
}

function build_health_help_screen(canvas) {
	var health_help_screen = build_screen(canvas, descriptions['health_help'], true, true)

	health_help_screen.help_text = build_text(canvas, [- 9 / 20 * health_help_screen.width, 19 / 440 * health_help_screen.height], ['left', 'center'], 'left', get_size_px(canvas, 17), others['help_health'], white)
	health_help_screen.addChild(health_help_screen.help_text)

	return health_help_screen
}

function build_heart_rate_screen(canvas) {
	var heart_rate_screen = build_screen(canvas, descriptions['heart_rate'], true, true)

	heart_rate_screen.message = build_rectangle(canvas, [0, 3 / 10 * heart_rate_screen.height], [5 / 10 * heart_rate_screen.width, heart_rate_screen.height / 4], undefined, white, [5, 5, 5, 5])

	var options = [ health['at_the_moment'], health['today'], health['week'] ]
	var link = [ 'text', 'text', 'text', 'text' ]
	var info = get_health_info(heart_rate_screen.description)

	links = add_lines(canvas, heart_rate_screen, -1.5, options, link, null, info)

	heart_rate_screen.message_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 15), get_qualitative_heart_rate(health_information.at_the_moment.heart_rate))
	heart_rate_screen.message.addChild(heart_rate_screen.message_text)
	heart_rate_screen.addChild(heart_rate_screen.message)

	return heart_rate_screen
}

function build_blood_pressure_screen(canvas) {
	var blood_pressure_screen = build_screen(canvas, descriptions['blood_pressure'], true, true)

	blood_pressure_screen.message = build_rectangle(canvas, [0, 3 / 10 * blood_pressure_screen.height], [5 / 8 * blood_pressure_screen.width, blood_pressure_screen.height / 4], undefined, white, [5, 5, 5, 5])
	blood_pressure_screen.message_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), health['new_measurement'], black)

	var options = [ health['systolic'], health['diastolic'], health['report'] ]
	var link = [ 'text', 'text', 'text', 'text' ]
	var info = get_health_info(blood_pressure_screen.description)
	links = add_lines(canvas, blood_pressure_screen, -1.5, options, link, null, info)

	blood_pressure_screen.message.addChild(blood_pressure_screen.message_text)
	blood_pressure_screen.addChild(blood_pressure_screen.message)

	object_clickable(canvas, blood_pressure_screen.message)
	blood_pressure_screen.message.bind('click tap', function() {
		changeScreen(canvas, build_new_measurement_screen(canvas, 'blood_pressure'))
	})

	return blood_pressure_screen
}

function build_blood_oxygen_screen(canvas) {
	var blood_oxygen_screen = build_screen(canvas, descriptions['blood_oxygen'], true, true)

	blood_oxygen_screen.message = build_rectangle(canvas, [0, 3 / 10 * blood_oxygen_screen.height], [5 / 8 * blood_oxygen_screen.width, blood_oxygen_screen.height / 4], undefined, white, [5, 5, 5, 5])
	blood_oxygen_screen.message_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), health['new_measurement'], black)

	var options = [ health['today'], health['week'], health['report'] ]
	var link = [ 'text', 'text', 'text', 'text' ]
	var info = get_health_info(blood_oxygen_screen.description)
	links = add_lines(canvas, blood_oxygen_screen, -1.5, options, link, null, info)

	blood_oxygen_screen.message.addChild(blood_oxygen_screen.message_text)
	blood_oxygen_screen.addChild(blood_oxygen_screen.message)

	object_clickable(canvas, blood_oxygen_screen.message)
	blood_oxygen_screen.message.bind('click tap', function() {
		changeScreen(canvas, build_new_measurement_screen(canvas, 'blood_oxygen'))
	})

	return blood_oxygen_screen
}

function build_sleep_time_screen(canvas) {
	var sleep_time_screen = build_screen(canvas, descriptions['sleep_time'], true, true)

	switch (language) {
		case 'pt':
			graphic = MATERIALS_DIR + '/sleep_graph_pt.png'
			break
		case 'en':
			graphic = MATERIALS_DIR + '/sleep_graph_en.png'
			break
	}

	sleep_time_screen.graphic = build_image(canvas, [0, 5 / 16 * sleep_time_screen.height], [5 / 7 * sleep_time_screen.width, 11 / 30 * sleep_time_screen.width], undefined, graphic)

	var options = [ health['today'], health['week'], health['report'] ]
	var link = [ 'text', 'text', 'text', 'text' ]
	var info = get_health_info(sleep_time_screen.description)
	links = add_lines(canvas, sleep_time_screen, -1.5, options, link, null, info)

	sleep_time_screen.addChild(sleep_time_screen.graphic)

	return sleep_time_screen
}

function build_sos_screen(canvas) {
	var sos_screen = build_screen(canvas, descriptions['sos'], false, true)

	sos_screen.circle_help_button = build_ellipse(canvas, [2 / 5 * sos_screen.width, 2 / 5 * sos_screen.height], sos_screen.width / 15, black)
	sos_screen.message = build_rectangle(canvas, [0, 11 / 40 * sos_screen.height], [5 / 6 * sos_screen.width, 1 / 4 * sos_screen.width], undefined, 'radial-gradient(' + white + ', ' + '#AAAAAA' + ')', [5, 5, 5, 5])
	sos_screen.message_text = build_text(canvas, [0, - 7 / 200 * sos_screen.height], undefined, undefined, get_size_px(canvas, 17), health['call_emergency'], black)
	sos_screen.message_hold = build_text(canvas, [0, 7 / 200 * sos_screen.height], undefined, undefined, get_size_px(canvas, 17), health['press_3_seconds'], black)
	sos_screen.sos_help_button = build_image(canvas, [2 / 5 * sos_screen.width, 2 / 5 * sos_screen.height], [sos_screen.width / 10, sos_screen.height / 10], undefined, MATERIALS_DIR + '/Help.png')

	var options = [ health['live_monitoring'], health['emergency_delay'] ]
	var link = [ 'link', 'link' ]
	links = add_lines(canvas, sos_screen, -1, options, link)

	sos_screen.sos_live_box = build_ellipse(canvas, [2 / 5 * sos_screen.width, 0], sos_screen.width / 30, '', get_size_px(canvas, 2) + ' ' + white)
	links[0].addChild(sos_screen.sos_live_box)

	sos_screen.sos_live_box_tick = build_image(canvas, [sos_screen.width / 40, - sos_screen.height / 40], [sos_screen.width / 10, sos_screen.height / 10], undefined, MATERIALS_DIR + '/Tick.png')
	if (sos.live_monitoring) sos_screen.sos_live_box.addChild(sos_screen.sos_live_box_tick)

	sos_screen.time_delay_box = build_rectangle(canvas, [37 / 100 * sos_screen.width, 0], [sos_screen.width / 7, sos_screen.height / 13], undefined, '', [5, 5, 5, 5], get_size_px(canvas, 2) + ' ' + white)
	links[1].addChild(sos_screen.time_delay_box)

	sos_screen.time_delay = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 15), sos.time_delays[sos.time_delay_option] + ' ' + health['seconds'], white)
	sos_screen.time_delay_box.addChild(sos_screen.time_delay)

	sos_screen.message.addChild(sos_screen.message_text)
	sos_screen.message.addChild(sos_screen.message_hold)
	sos_screen.addChild(sos_screen.message)

	build_health_template(canvas, sos_screen, 1)
	sos_screen.addChild(sos_screen.circle_help_button)
	sos_screen.addChild(sos_screen.sos_help_button)

	object_clickable(canvas, sos_screen.sos_help_button)
	sos_screen.sos_help_button.bind('click tap', function() {
		changeScreen(canvas, build_sos_help_screen(canvas))
	})

	object_clickable(canvas, links[0])
	links[0].bind('click tap', function() {
		sos.live_monitoring = !sos.live_monitoring
		if (sos.live_monitoring) sos_screen.sos_live_box.addChild(sos_screen.sos_live_box_tick)
		else sos_screen.sos_live_box.removeChild(sos_screen.sos_live_box_tick)
	})

	object_clickable(canvas, links[1])
	links[1].bind('click tap', function() {
		sos.time_delay_option = (sos.time_delay_option + 1) % sos.time_delays.length
		sos_screen.time_delay.text = sos.time_delays[sos.time_delay_option] + ' ' + health['seconds']
	})

	if (sos.active) {
		sos.active = false
		call_cancel_sos(sos_screen)
	}

	sos_screen.message.bind('mousedown touchstart', function() {
		var check = function() {
			if (canvas.mouse.buttonState == 'down' || canvas.touch.touchState == 'down') {
				if (sos_screen.message_hold.text.indexOf('1') != -1) {
					call_cancel_sos(sos_screen)
				}

				sos_screen.message_hold.text = sos_screen.message_hold.text.replace('2', '1')
				sos_screen.message_hold.text = sos_screen.message_hold.text.replace('3', '2')
				sos_screen.message_hold.text = sos_screen.message_hold.text.replace('4', '3')
				sos_screen.message_hold.text = sos_screen.message_hold.text.replace('5', '4')
			}
		}

		setTimeout(check, 1000)
		setTimeout(check, 2000)
		setTimeout(check, 3000)
		setTimeout(check, 4000)
		setTimeout(check, 5000)
	})

	return sos_screen
}

function build_sos_help_screen(canvas) {
	var sos_help_screen = build_screen(canvas, descriptions['sos_help'], true, true)

	sos_help_screen.help_text = build_text(canvas, [- 9 / 20 * sos_help_screen.width, 19 / 440 * sos_help_screen.height], ['left', 'center'], 'left', get_size_px(canvas, 17), others['help_sos'], white)
	sos_help_screen.addChild(sos_help_screen.help_text)

	return sos_help_screen
}

function build_fitness_screen(canvas) {
	var fitness_screen = build_screen(canvas, descriptions['fitness'], false, true)

	fitness_screen.circle_help_button = build_ellipse(canvas, [2 / 5 * fitness_screen.width, 2 / 5 * fitness_screen.height], fitness_screen.height / 15, black)
	fitness_screen.fitness_help_button = build_image(canvas, [2 / 5 * fitness_screen.width, 2 / 5 * fitness_screen.height], [fitness_screen.width / 10, fitness_screen.height / 10], undefined, MATERIALS_DIR + '/Help.png')

	switch (language) {
		case 'pt':
			graphic = MATERIALS_DIR + '/ftpt.png'
			break
		case 'en':
			graphic = MATERIALS_DIR + '/ften.png'
			break
	}

	fitness_screen.fitness_graphic = build_image(canvas, [0, 13 / 40 * fitness_screen.height], [2 / 3 * fitness_screen.width, 1 / 4 * fitness_screen.height], undefined, graphic)

	var options = [ health['energy'], health['activity'], health['nutrition'] ]
	var link = [ 'link_arrow', 'link_arrow', 'link_arrow' ]
	var images = [ 'Energy.png', 'Activity.png', 'Nutrition.png' ]
	links = add_lines(canvas, fitness_screen, -1, options, link, images)

	object_clickable(canvas, links[0])
	links[0].bind('click tap', function() {
		changeScreen(canvas, build_energy_screen(canvas))
	})
	
	object_clickable(canvas, links[1])
	links[1].bind('click tap', function() {
		changeScreen(canvas, build_activity_screen(canvas))
	})
	
	object_clickable(canvas, links[2])
	links[2].bind('click tap', function() {
		changeScreen(canvas, build_nutrition_screen(canvas))
	})

	build_health_template(canvas, fitness_screen, 0)
	fitness_screen.addChild(fitness_screen.fitness_graphic)
	fitness_screen.addChild(fitness_screen.circle_help_button)
	fitness_screen.addChild(fitness_screen.fitness_help_button)

	object_clickable(canvas, fitness_screen.fitness_help_button)
	fitness_screen.fitness_help_button.bind('click tap', function() {
		changeScreen(canvas, build_fitness_help_screen(canvas))
	})

	return fitness_screen
}

function build_fitness_help_screen(canvas) {
	var fitness_help_screen = build_screen(canvas, descriptions['fitness_help'], true, true)

	fitness_help_screen.help_text = build_text(canvas, [- 9 / 20 * fitness_help_screen.width, 19 / 440 * fitness_help_screen.height], ['left', 'center'], 'left', get_size_px(canvas, 17), others['help_fitness'], white)
	fitness_help_screen.addChild(fitness_help_screen.help_text)

	return fitness_help_screen
}

function build_energy_screen(canvas) {
	var energy_screen = build_screen(canvas, descriptions['energy'], true, true)

	switch (language) {
		case 'pt':
			graphic = MATERIALS_DIR + '/egpt.png'
			break
		case 'en':
			graphic = MATERIALS_DIR + '/egen.png'
			break
	}

	energy_screen.energy_graphic = build_image(canvas, [0, 13 / 40 * energy_screen.height], [2 / 3 * energy_screen.width, 1 / 4 * energy_screen.height], undefined, graphic)

	var options = [ health['today'], health['week'] ]
	var link = [ 'text', 'text' ]
	var info = get_health_info(energy_screen.description)
	links = add_lines(canvas, energy_screen, -1.5, options, link, null, info)

	energy_screen.addChild(energy_screen.energy_graphic)
	return energy_screen
}

function build_activity_screen(canvas) {
	var activity_screen = build_screen(canvas, descriptions['activity'], true, true)

	activity_screen.message = build_rectangle(canvas, [0, 11 / 40 * activity_screen.height], [5 / 6 * activity_screen.width, 1 / 4 * activity_screen.height], undefined, 'radial-gradient(' + white + ', ' + '#AAAAAA' + ')', [5, 5, 5, 5])
	activity_screen.message_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), health['start_activity'], black)

	var options = [ health['distance'], health['steps'], health['elevation'] ]
	var link = [ 'text', 'text', 'text' ]
	var info = get_health_info(activity_screen.description)
	links = add_lines(canvas, activity_screen, -1.5, options, link, null, info)

	activity_screen.message.addChild(activity_screen.message_text)
	activity_screen.addChild(activity_screen.message)

	object_clickable(canvas, activity_screen.message)
	activity_screen.message.bind('click tap', function() {
		if (fitness.started) changeScreen(canvas, build_start_activity_screen(canvas))
		else changeScreen(canvas, build_choose_activity_screen(canvas))
	})

	return activity_screen
}

function build_nutrition_screen(canvas) {
	var nutrition_screen = build_screen(canvas, descriptions['nutrition'], true, true)

	var options = [ health['vitamins'], health['proteins'], health['water'], health['fat'], health['calcium'] ]
	var link = [ 'text', 'text', 'text', 'text', 'text' ]
	var info = get_health_info(nutrition_screen.description)
	links = add_lines(canvas, nutrition_screen, -1.5, options, link, null, info)

	return nutrition_screen
}

function build_choose_activity_screen(canvas) {
	var choose_activity_screen = build_screen(canvas, descriptions['choose_activity'], true, true)
	
	var line_separating = build_line(canvas, [- 11 / 40 * choose_activity_screen.width, 1 / 10 * choose_activity_screen.height], [11 / 40 * choose_activity_screen.width, 1 / 10 * choose_activity_screen.height], get_size_px(canvas, 2) + ' ' + white)
	choose_activity_screen.addChild(line_separating)
	
	var line_separating = build_line(canvas, [0, - 7 / 40 * choose_activity_screen.height], [0, 3 / 8 * choose_activity_screen.height], get_size_px(canvas, 2) + ' ' + white)
	choose_activity_screen.addChild(line_separating)

	choose_activity_screen.walk_button = build_image(canvas, [- choose_activity_screen.width / 7, - 23 / 380 * choose_activity_screen.height], [4 / 19 * choose_activity_screen.width, 4 / 19 * choose_activity_screen.height], undefined, MATERIALS_DIR + '/Activity-Walk.png')
	choose_activity_screen.run_button = build_image(canvas, [choose_activity_screen.width / 6, - 23 / 380 * choose_activity_screen.height], [4 / 19 * choose_activity_screen.width, 4 / 19 * choose_activity_screen.height], undefined, MATERIALS_DIR + '/Activity-Run.png')
	choose_activity_screen.bike_button = build_image(canvas, [- choose_activity_screen.width / 6, 99 / 380 * choose_activity_screen.height], [4 / 19 * choose_activity_screen.width, 4 / 19 * choose_activity_screen.height], undefined, MATERIALS_DIR + '/Activity-Bike.png')
	choose_activity_screen.gym_button = build_image(canvas, [choose_activity_screen.width / 6, 99 / 380 * choose_activity_screen.height], [4 / 19 * choose_activity_screen.width, 4 / 19 * choose_activity_screen.height], undefined, MATERIALS_DIR + '/Activity-Gym.png')

	choose_activity_screen.circle_help_button = build_ellipse(canvas, [2 / 5 * choose_activity_screen.width, 2 / 5 * choose_activity_screen.height], choose_activity_screen.height / 15, black)
	choose_activity_screen.choose_activity_help_button = build_image(canvas, [2 / 5 * choose_activity_screen.width, 2 / 5 * choose_activity_screen.height], [choose_activity_screen.width / 10, choose_activity_screen.height / 10], undefined, MATERIALS_DIR + '/Help.png')

	choose_activity_screen.addChild(choose_activity_screen.walk_button)
	choose_activity_screen.addChild(choose_activity_screen.run_button)
	choose_activity_screen.addChild(choose_activity_screen.bike_button)
	choose_activity_screen.addChild(choose_activity_screen.gym_button)

	object_clickable(canvas, choose_activity_screen.walk_button)
	choose_activity_screen.walk_button.bind('click tap', function() {
		fitness.type = 'activity_walk'
		changeScreen(canvas, build_start_activity_screen(canvas))
	})
	
	object_clickable(canvas, choose_activity_screen.run_button)
	choose_activity_screen.run_button.bind('click tap', function() {
		fitness.type = 'activity_run'
		changeScreen(canvas, build_start_activity_screen(canvas))
	})
	
	object_clickable(canvas, choose_activity_screen.gym_button)
	choose_activity_screen.gym_button.bind('click tap', function() {
		fitness.type = 'activity_gym'
		changeScreen(canvas, build_start_activity_screen(canvas))
	})
	
	object_clickable(canvas, choose_activity_screen.bike_button)
	choose_activity_screen.bike_button.bind('click tap', function() {
		fitness.type = 'activity_bike'
		changeScreen(canvas, build_start_activity_screen(canvas))
	})
	
	object_clickable(canvas, choose_activity_screen.choose_activity_help_button)
	choose_activity_screen.choose_activity_help_button.bind('click tap', function() {
		changeScreen(canvas, build_choose_activity_help_screen(canvas))
	})

	choose_activity_screen.addChild(choose_activity_screen.circle_help_button)
	choose_activity_screen.addChild(choose_activity_screen.choose_activity_help_button)

	return choose_activity_screen
}

function build_choose_activity_help_screen(canvas) {
	var choose_activity_help_screen = build_screen(canvas, descriptions['choose_activity_help'], true, true)

	choose_activity_help_screen.help_text = build_text(canvas, [- 9 / 20 * choose_activity_help_screen.width, 19 / 440 * choose_activity_help_screen.height], ['left', 'center'], 'left', get_size_px(canvas, 17), others['help_choose_activity'], white)
	choose_activity_help_screen.addChild(choose_activity_help_screen.help_text)

	return choose_activity_help_screen
}

function build_start_activity_screen(canvas) {
	var activity_screen = build_screen(canvas, descriptions[fitness.type], false, true)

	var info = []
	info.push(activity_screen.description)
	if (activity_screen.description == descriptions['activity_gym']) info.push(fitness.calories + ' ' + health['cal'])
	else info.push(fitness.distance.toFixed(3) + ' ' + health['km'])
	info.push(Math.floor(fitness.duration) + ' ' + health['minutes'])
	info.push('none')

	var options = [ health['type'], health['distance'], health['duration'], health['share'] ]
	if (activity_screen.description == descriptions['activity_gym']) options[1] = health['energy']
	var link = [ 'text', 'text', 'text', 'link' ]
	links = add_lines(canvas, activity_screen, -2.5, options, link, null, info)

	activity_screen.sharing_box = build_ellipse(canvas, [2 / 5 * activity_screen.width, 0], activity_screen.height / 30, undefined, get_size_px(canvas, 2) + ' ' + white)
	links[0].addChild(activity_screen.sharing_box)

	activity_screen.sharing_tick = build_image(canvas, [activity_screen.width / 40, - activity_screen.height / 40], [activity_screen.width / 10, activity_screen.height / 10], undefined, MATERIALS_DIR + '/Tick.png')
	if (fitness.sharing) activity_screen.sharing_box.addChild(activity_screen.sharing_tick)

	activity_screen.start_button = build_rectangle(canvas, [0, 5 / 16 * activity_screen.height], [5 / 6 * activity_screen.width, activity_screen.width / 5], undefined, 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', [5, 5, 5, 5])
	activity_screen.start_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), health['start'], white)
	activity_screen.start_button.addChild(activity_screen.start_text)

	activity_screen.cancel_button = build_rectangle(canvas, [- 41 / 200 * activity_screen.width, 5 / 16 * activity_screen.height], [2 / 5 * activity_screen.width, 1 / 5 * activity_screen.height], undefined, 'radial-gradient(' + white + ', ' + '#cccccc' + ')', [5, 0, 5, 0])
	activity_screen.stop_button = build_rectangle(canvas, [41 / 200 * activity_screen.width, 5 / 16 * activity_screen.height], [2 / 5 * activity_screen.width, 1 / 5 * activity_screen.height], undefined, 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')', [0, 5, 0, 5])

	activity_screen.cancel_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), health['cancel'], '#AA5555')
	activity_screen.stop_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), health['stop'], white)

	activity_screen.cancel_button.addChild(activity_screen.cancel_text)
	activity_screen.stop_button.addChild(activity_screen.stop_text)

	if (fitness.started) {
		activity_screen.addChild(activity_screen.cancel_button)
		activity_screen.addChild(activity_screen.stop_button)
	} else {
		activity_screen.addChild(activity_screen.start_button)
	}

	object_clickable(canvas, links[0])
	links[0].bind('click tap', function() {
		fitness.sharing = !fitness.sharing
		if (fitness.sharing) activity_screen.sharing_box.addChild(activity_screen.sharing_tick)
		else activity_screen.sharing_box.removeChild(activity_screen.sharing_tick)
	})
	
	object_clickable(canvas, activity_screen.start_button)
	activity_screen.start_button.bind('click tap', function() {
		fitness.started = true
		changeScreen(canvas, build_start_activity_screen(canvas))
	})
	
	object_clickable(canvas, activity_screen.cancel_button)
	activity_screen.cancel_button.bind('click tap', function() {
		changeScreen(canvas, build_cancel_activity_screen(canvas))
	})
	
	object_clickable(canvas, activity_screen.stop_button)
	activity_screen.stop_button.bind('click tap', function() {
		changeScreen(canvas, build_stop_activity_screen(canvas))
	})

	return activity_screen
}

function build_cancel_activity_screen(canvas) {
	var cancel_screen = build_screen(canvas, descriptions['cancel_activity'], true, true)

	cancel_screen.message = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), health['cancel_activity'], white)
	
	cancel_screen.yes_button = build_rectangle(canvas, [41 / 200 * cancel_screen.width, 5 / 16 * cancel_screen.height], [cancel_screen.width / 5, cancel_screen.height / 10], undefined, 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', [5, 5, 5, 5])
	cancel_screen.yes_text = build_text(canvas, [0, 0], undefined, undefined, get_size_px(canvas, 17), health['yes'], black)
	
	cancel_screen.no_button = build_rectangle(canvas, [- 41 / 200 * cancel_screen.width, 5 / 16 * cancel_screen.height], [cancel_screen.width / 5, cancel_screen.height / 10], undefined, 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')', [5, 5, 5, 5])
	cancel_screen.no_text = build_text(canvas, [0, 0], undefined, undefined, get_size_px(canvas, 17), health['no'], black)

	cancel_screen.yes_button.addChild(cancel_screen.yes_text)
	cancel_screen.no_button.addChild(cancel_screen.no_text)
	cancel_screen.addChild(cancel_screen.yes_button)
	cancel_screen.addChild(cancel_screen.no_button)
	cancel_screen.addChild(cancel_screen.message)

	object_clickable(canvas, cancel_screen.yes_button)
	cancel_screen.yes_button.bind('click tap', function() {
		fitness.started = false
		fitness.distance = 0
		fitness.calories = 0
		fitness.duration = 0

		changeScreen(canvas, build_start_activity_screen(canvas))
	})

	object_clickable(canvas, cancel_screen.no_button)
	cancel_screen.no_button.bind('click tap', function() {
		changeScreen(canvas, build_start_activity_screen(canvas))
	})

	return cancel_screen
}

function build_stop_activity_screen(canvas) {
	var stop_screen = build_screen(canvas, descriptions['stop_activity'], true, true)

	stop_screen.message = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), health['stop_activity'], white)
	
	stop_screen.yes_button = build_rectangle(canvas, [41 / 200 * stop_screen.width, 5 / 16 * stop_screen.height], [stop_screen.width / 5, stop_screen.height / 10], undefined, 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', [5, 5, 5, 5])
	stop_screen.yes_text = build_text(canvas, [0, 0], undefined, undefined, get_size_px(canvas, 17), health['yes'], black)
	
	stop_screen.no_button = build_rectangle(canvas, [- 41 / 200 * stop_screen.width, 5 / 16 * stop_screen.height], [stop_screen.width / 5, stop_screen.height / 10], undefined, 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')', [5, 5, 5, 5])
	stop_screen.no_text = build_text(canvas, [0, 0], undefined, undefined, get_size_px(canvas, 17), health['no'], black)

	stop_screen.yes_button.addChild(stop_screen.yes_text)
	stop_screen.no_button.addChild(stop_screen.no_text)
	stop_screen.addChild(stop_screen.yes_button)
	stop_screen.addChild(stop_screen.no_button)
	stop_screen.addChild(stop_screen.message)

	object_clickable(canvas, stop_screen.yes_button)
	stop_screen.yes_button.bind('click tap', function() {
		health_information.today.distance += fitness.distance
		health_information.today.calories += fitness.calories
		health_information.today.steps += fitness.steps

		fitness.started = false
		fitness.distance = 0
		fitness.calories = 0
		fitness.steps = 0
		fitness.duration = 0

		changeScreen(canvas, build_start_activity_screen(canvas))
	})

	object_clickable(canvas, stop_screen.no_button)
	stop_screen.no_button.bind('click tap', function() {
		changeScreen(canvas, build_start_activity_screen(canvas))
	})

	return stop_screen
}

function build_new_measurement_screen(canvas, type) {
	var new_measurement_screen = build_screen(canvas, descriptions['new_measurement'], true, true)
	new_measurement_screen.back_page = type
	new_measurement_screen.done = false
	
	new_measurement_screen.type_text = build_text(canvas, [0, - 3 / 10 * new_measurement_screen.height], undefined, undefined, get_size_px(canvas, 17), health[type], white)

	var image_link
	switch (type) {
		case 'blood_pressure':
			image_link = MATERIALS_DIR + '/Blood Pressure.png'
			break
		case 'blood_oxygen':
			image_link = MATERIALS_DIR + '/Blood Oxygen.png'
			break
	}

	new_measurement_screen.image = build_image(canvas, [0, new_measurement_screen.height / 10], [new_measurement_screen.width / 3, new_measurement_screen.height / 3], undefined, image_link)
	new_measurement_screen.circle = build_arc(canvas, [0, new_measurement_screen.height / 10], 5 / 18 * new_measurement_screen.width, [0, 0], get_size_px(canvas, 10) + ' #AA5555')
	new_measurement_screen.done_text = build_text(canvas, [0, 9 / 20 * new_measurement_screen.height], undefined, undefined, get_size_px(canvas, 19), health['done'], white)

	new_measurement_screen.addChild(new_measurement_screen.type_text)
	new_measurement_screen.addChild(new_measurement_screen.image)
	new_measurement_screen.addChild(new_measurement_screen.circle)

	return new_measurement_screen
}
