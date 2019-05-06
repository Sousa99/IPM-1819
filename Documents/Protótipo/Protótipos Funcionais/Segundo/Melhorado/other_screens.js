function build_frame(canvas) {
	var frame = build_screen(canvas, undefined, false, false, [SIZE_SCREEN + SIZE_FRAME, SIZE_SCREEN + SIZE_FRAME], gray_frame)
	frame.emergency = 5
	
	frame.camera = build_ellipse(canvas, [0, - 73 / 150 * frame.height], frame.height / 85, 'radial-gradient(' + white + ', ' + black + ')')
	frame.button_plus = build_rectangle(canvas, [- 37 / 70 * frame.width, - 4 / 10 * frame.height], [1/ 25 * frame.width, 3 / 20 * frame.height], ['left', 'top'], gray_frame, [10, 0, 0, 0])
	frame.symbol_plus = build_text(canvas, [2, 2], ['left', 'top'], undefined, get_size_px(canvas, 16), '+')
	frame.button_minus = build_rectangle(canvas, [- 37 / 70 * frame.width, - 6 / 25 * frame.height], [1/ 25 * frame.width, 3 / 20 * frame.height], ['left', 'top'], gray_frame, [0, 0, 10, 0])
	frame.symbol_minus = build_text(canvas, [2, frame.button_minus.height - 2], ['left', 'bottom'], undefined, get_size_px(canvas, 16), '-')
	frame.button_back = build_rectangle(canvas, [frame.width / 2 - 1, - 2 / 5 * frame.height], [frame.width / 25, 3 / 20 * frame.height], ['left', 'top'], gray_frame, [0, 10, 0, 10])
	frame.button_lock = build_rectangle(canvas, [frame.width / 2 - 1, 1 / 4 * frame.height], [frame.width / 25, 3 / 20 * frame.height], ['left', 'top'], gray_frame, [0, 10, 0, 10])
	
	frame.button_back.bind('click tap', function() {
		switch (actual_screen.description) {
			case descriptions['menu']:
			changeScreen(canvas, build_main_screen(canvas))
			break
			case descriptions['settings']:
			changeScreen(canvas, build_menu_screen(canvas))
			break
			case descriptions['language_settings']:
			changeScreen(canvas, build_settings_screen(canvas))
			break
			case descriptions['lock_settings']:
			changeScreen(canvas, build_settings_screen(canvas))
			break
			case descriptions['no_lock']:
			changeScreen(canvas, build_main_screen(canvas))
			break
			case descriptions['pin_lock']:
			changeScreen(canvas, build_main_screen(canvas))
			break
			case descriptions['pattern_lock']:
			changeScreen(canvas, build_main_screen(canvas))
			break
			case descriptions['fingerprint_lock']:
			changeScreen(canvas, build_main_screen(canvas))
			break
			case descriptions['health']:
			changeScreen(canvas, build_menu_screen(canvas))
			break
			case descriptions['health_help']:
			changeScreen(canvas, build_health_screen(canvas))
			break
			case descriptions['heart_rate']:
			changeScreen(canvas, build_health_screen(canvas))
			break
			case descriptions['blood_pressure']:
			changeScreen(canvas, build_health_screen(canvas))
			break
			case descriptions['blood_oxygen']:
			changeScreen(canvas, build_health_screen(canvas))
			break
			case descriptions['sleep_time']:
			changeScreen(canvas, build_health_screen(canvas))
			break
			case descriptions['sos']:
			changeScreen(canvas, build_menu_screen(canvas))
			break
			case descriptions['sos_help']:
			changeScreen(canvas, build_sos_screen(canvas))
			break
			case descriptions['fitness']:
			changeScreen(canvas, build_menu_screen(canvas))
			break
			case descriptions['fitness_help']:
			changeScreen(canvas, build_fitness_screen(canvas))
			break
			case descriptions['energy']:
			changeScreen(canvas, build_fitness_screen(canvas))
			break
			case descriptions['activity']:
			changeScreen(canvas, build_fitness_screen(canvas))
			break
			case descriptions['nutrition']:
			changeScreen(canvas, build_fitness_screen(canvas))
			break
			case descriptions['choose_activity']:
			changeScreen(canvas, build_activity_screen(canvas))
			break
			case descriptions['choose_activity_help']:
			changeScreen(canvas, build_choose_activity_screen(canvas))
			break
			case descriptions['activity_walk']:
			if (fitness.started) changeScreen(canvas, build_activity_screen(canvas))
			else changeScreen(canvas, build_choose_activity_screen(canvas))
			break
			case descriptions['activity_run']:
			if (fitness.started) changeScreen(canvas, build_activity_screen(canvas))
			else changeScreen(canvas, build_choose_activity_screen(canvas))
			break
			case descriptions['activity_gym']:
			if (fitness.started) changeScreen(canvas, build_activity_screen(canvas))
			else changeScreen(canvas, build_choose_activity_screen(canvas))
			break
			case descriptions['activity_bike']:
			if (fitness.started) changeScreen(canvas, build_activity_screen(canvas))
			else changeScreen(canvas, build_choose_activity_screen(canvas))
			break
			case descriptions['cancel_activity']:
			changeScreen(canvas, build_start_activity_screen(canvas))
			break
			case descriptions['stop_activity']:
			changeScreen(canvas, build_start_activity_screen(canvas))
			break
			case descriptions['new_measurement']:
			switch (actual_screen.back_page) {
				case 'heart_rate':
				changeScreen(canvas, build_heart_rate_screen(canvas))
				break
				case 'blood_pressure':
				changeScreen(canvas, build_blood_pressure_screen(canvas))
				break
				case 'blood_oxygen':
				changeScreen(canvas, build_blood_oxygen_screen(canvas))
				break
			}
			break
			case descriptions['map_type_selection']:
			changeScreen(canvas, build_menu_screen(canvas))
			break
			case descriptions['map']:
			var map_html = document.getElementById('mapid')
			map_html.style.display = 'none'
			map_initialized.remove()
			
			if (map_information.showing_route) {
				map_information.showing_route = false
				changeScreen(canvas, build_my_travel_route_screen(canvas))
			} else if (map_information.info_place == null) {
				map_information.type_selected = null
				changeScreen(canvas, build_map_type_selection_screen(canvas))
			} else changeScreen(canvas, build_place_information_screen(canvas))

			break
			
			case descriptions['places_list']:
			if (map_information.type_selected = null) changeScreen(canvas, build_my_travel_route_screen(canvas))
			changeScreen(canvas, build_map_screen(canvas))
			break
			case descriptions['place_information']:
			map_information.info_place = null
			if (map_information.back_to_map) changeScreen(canvas, build_map_screen(canvas))
			else changeScreen(canvas, build_places_list_screen(canvas))
			break
			case descriptions['route_plan']:
			changeScreen(canvas, build_map_type_selection_screen(canvas))
			break
			case descriptions['my_travel_route']:
			changeScreen(canvas, build_map_type_selection_screen(canvas))
			break
			case descriptions['places_help']:
			changeScreen(canvas, build_places_list_screen(canvas))
			break
			case descriptions['places_history']:
			changeScreen(canvas, build_my_travel_route_screen(canvas))
			break
			case descriptions['map_help']:
			changeScreen(canvas, build_map_screen(canvas))
			break
			case descriptions['map_world']:
			var map_html = document.getElementById('mapid')
			map_html.style.display = 'none'
			map_initialized.remove()

			changeScreen(canvas, build_history_screen(canvas))
			break
			
		}
	})
	
	frame.button_back.bind('mousedown touchstart', function() {
		var check = function() {
			if (canvas.mouse.buttonState == 'down' || canvas.touch.touchState == 'down') {
				if (frame.emergency == 1) {
					canvas.mouse.cancel()
					canvas.touch.cancel()
					sos_screen = build_sos_screen(canvas)
					changeScreen(canvas, sos_screen)
					call_cancel_sos(sos_screen)
				}
				
				frame.emergency -= 1
			}
		}
		
		setTimeout(check, 1000)
		setTimeout(check, 2000)
		setTimeout(check, 3000)
		setTimeout(check, 4000)
		setTimeout(check, 5000)
	})
	
	var non_lockables = [ descriptions['main'], descriptions['changed_language'], descriptions['changed_lock'] ]
	frame.button_lock.bind('click tap', function() {
		if (actual_screen.description == descriptions['map']) {
			var map_html = document.getElementById('mapid')
			map_html.style.display = 'none'
			
			map_information.type_selected = null
			map_initialized.remove()
		}
		
		if (!non_lockables.includes(actual_screen.description)) changeScreen(canvas, build_main_screen(canvas))
	})
	
	object_clickable(canvas, frame.button_minus)
	frame.button_minus.bind('click tap', function() {
		if (actual_screen.description == descriptions['map'] || actual_screen.description == descriptions['map_world'])
		map_initialized.zoomOut()
	})
	
	object_clickable(canvas, frame.button_plus)
	frame.button_plus.bind('click tap', function() {
		if (actual_screen.description == descriptions['map'] || actual_screen.description == descriptions['map_world'])
		map_initialized.zoomIn()
	})
	
	object_clickable(canvas, frame.button_back)
	object_clickable(canvas, frame.button_lock)
	
	frame.addChild(frame.camera)
	frame.button_plus.addChild(frame.symbol_plus)
	frame.button_minus.addChild(frame.symbol_minus)
	frame.addChild(frame.button_plus)
	frame.addChild(frame.button_minus)
	frame.addChild(frame.button_back)
	frame.addChild(frame.button_lock)
	
	return frame
}

function build_template(canvas) {
	var template = build_rectangle(canvas, [canvas.width / 2, canvas.height / 2 - 9 / 20 * SIZE_SCREEN], [SIZE_SCREEN, 20], undefined, '')
	template.description = descriptions['template']
	template.description_show = false

	template.time = build_text(canvas, [ 2 / 5 * template.width, 0], undefined, undefined, get_size_px(canvas, 12), undefined, white)
	template.battery = build_image(canvas, [ - 5 / 12 * template.width + 30, 0], [20, 20], undefined, MATERIALS_DIR + '/Battery.png')
	template.wifi = build_image(canvas, [ - 5 / 12 * template.width, 0], [20, 20], undefined, MATERIALS_DIR + '/Wifi.png')

	template.addChild(template.time)
	template.addChild(template.battery)
	template.addChild(template.wifi)

	return template
}

function build_main_screen(canvas) {
	var main_screen = build_screen(canvas, descriptions['main'], false, false, undefined, undefined)

	main_screen.date = build_text(canvas, [0, - 2 / 5 * main_screen.height], undefined, undefined, get_size_px(canvas, 16), undefined, white)
	main_screen.time = build_text(canvas , undefined, undefined, undefined, get_size_px(canvas, 50), undefined, white)
	main_screen.number_friends = build_text(canvas, [0, 3 / 8 * main_screen.height], undefined, undefined, get_size_px(canvas, 20), friendsgroup.length, white)
	main_screen.friends = build_text(canvas, [0, 9 / 20 * main_screen.height], undefined, undefined, get_size_px(canvas, 10), others['friends_group'], white)

	main_screen.addChild(main_screen.date)
	main_screen.addChild(main_screen.time)
	main_screen.addChild(main_screen.number_friends)
	main_screen.addChild(main_screen.friends)

	object_clickable(canvas, main_screen)
	main_screen.bind('click tap', function() {
		changeScreen(canvas, build_lock_screen(canvas))
	})

	return main_screen
}

function build_menu_screen(canvas) {
	var menu_screen = build_screen(canvas, descriptions['menu'], false, true, undefined)

	menu_screen.contacts_menu_button = build_image(canvas, [ - 5 / 18 * menu_screen.width, - 5 / 18 * menu_screen.height + 10], [menu_screen.width / 5, menu_screen.height / 5], undefined, MATERIALS_DIR + '/Contacts.png')
	menu_screen.gallery_menu_button = build_image(canvas, [ 0, - 5 / 18 * menu_screen.height + 10], [menu_screen.width / 5, menu_screen.height / 5], undefined, MATERIALS_DIR + '/Gallery.png')
	menu_screen.group_menu_button = build_image(canvas, [ 5 / 18 * menu_screen.width, - 5 / 18 * menu_screen.height + 10], [menu_screen.width / 5, menu_screen.height / 5], undefined, MATERIALS_DIR + '/Group.png')
	menu_screen.maps_menu_button = build_image(canvas, [ - 5 / 18 * menu_screen.width, 10], [menu_screen.width / 5, menu_screen.height / 5], undefined, MATERIALS_DIR + '/Maps.png')
	menu_screen.camera_menu_button = build_image(canvas, [ 0, 10], [menu_screen.width / 5, menu_screen.height / 5], undefined, MATERIALS_DIR + '/Camera.png')
	menu_screen.health_menu_button = build_image(canvas, [ 5 / 18 * menu_screen.width, 10], [menu_screen.width / 5, menu_screen.height / 5], undefined, MATERIALS_DIR + '/Health.png')
	menu_screen.settings_menu_button = build_image(canvas, [ 0, 5 / 18 * menu_screen.height + 10], [menu_screen.width / 5, menu_screen.height / 5], undefined, MATERIALS_DIR + '/Settings.png')

	menu_screen.addChild(menu_screen.contacts_menu_button)
	menu_screen.addChild(menu_screen.gallery_menu_button)
	menu_screen.addChild(menu_screen.group_menu_button)
	menu_screen.addChild(menu_screen.maps_menu_button)
	menu_screen.addChild(menu_screen.camera_menu_button)
	menu_screen.addChild(menu_screen.health_menu_button)
	menu_screen.addChild(menu_screen.settings_menu_button)

	object_clickable(canvas, menu_screen.settings_menu_button)
	menu_screen.settings_menu_button.bind('click tap', function() {
		changeScreen(canvas, build_settings_screen(canvas))
	})

	object_clickable(canvas, menu_screen.health_menu_button)
	menu_screen.health_menu_button.bind('click tap', function() {
		changeScreen(canvas, build_health_screen(canvas))
	})

	object_clickable(canvas, menu_screen.maps_menu_button)
	menu_screen.maps_menu_button.bind('click tap', function() {
		changeScreen(canvas, build_map_type_selection_screen(canvas))
	})

	return menu_screen
}
