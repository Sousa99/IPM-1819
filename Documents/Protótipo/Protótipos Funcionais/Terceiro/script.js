var actual_screen
var template
var frame
var description_bar

const fps = 60
var counter = 0

function changeScreen(canvas, new_screen) {
	canvas.removeChild(actual_screen)
	actual_screen = new_screen
	canvas.addChild(new_screen)

	canvas.removeChild(description_bar)
	description_bar.text = new_screen.description
	if (new_screen.description_show) {
		canvas.addChild(description_bar)
	}

	canvas.removeChild(template)
	if (new_screen.template) {
		canvas.addChild(template)
	}

	if ([descriptions['contacts'], descriptions['group_add']].includes(actual_screen.description)) {
		actual_screen.bind('mousedown', function() {
			contacts_information.positon = canvas.mouse.y
		})
		actual_screen.bind('touchstart', function() {
			contacts_information.positon = canvas.touch.y
		})

		actual_screen.bind('mouseup', function() {
			var final_position = canvas.mouse.y
			const variation = final_position - contacts_information.positon
			contacts_information.positon = undefined

			if (Math.abs(variation) > actual_screen.height / 10) {
				contacts_information.index -= Math.floor(variation / (actual_screen.height / 10))
				canvas.mouse.cancel()

				if (actual_screen.description == descriptions['contacts'])
					changeScreen(canvas, build_contacts_screen(canvas))
				else if (actual_screen.description == descriptions['group_add'])
					changeScreen(canvas, build_add_contact_group_screen(canvas))
			}
		})

		actual_screen.bind('touchend', function() {
			var final_position = canvas.touch.y
			const variation = final_position - contacts_information.positon
			contacts_information.positon = undefined

			if (Math.abs(variation) > actual_screen.height / 10) {
				contacts_information.index -= Math.floor(variation / (actual_screen.height / 10))
				canvas.touch.cancel()

				if (actual_screen.description == descriptions['contacts'])
					changeScreen(canvas, build_contacts_screen(canvas))
				else if (actual_screen.description == descriptions['group_add'])
					changeScreen(canvas, build_add_contact_group_screen(canvas))
			}
		})
	}
}

function loadCanvas() {
	canvas = document.getElementById('workzone')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	var canvas = oCanvas.create({
		canvas: '#workzone',
		fps: fps
	})
	
	var center = build_ellipse(canvas, [canvas.width / 2, canvas.height / 2], RADIUS_WORKZONE, white)
	canvas.addChild(center)

	description_bar = build_text(canvas, [canvas.width / 2, canvas.height / 2 - 3 / 8 * SIZE_SCREEN], undefined, undefined, get_size_px(canvas, 19), '', white)
	canvas.addChild(description_bar)

	// ------------------------------------------------ Logic and Canvas --------------------------------

	frame = build_frame(canvas)
	template = build_template(canvas)
	actual_screen = build_main_screen(canvas)

	canvas.addChild(frame)
	canvas.addChild(actual_screen)
	canvas.addChild(description_bar)

	canvas.setLoop(function() {
		var d = new Date()
		counter ++

		switch (actual_screen.description) {
			case descriptions['main']:
				actual_screen.date.text =
					('0' + d.getDate()).slice(-2) +
					' / ' +
					('0' + (d.getMonth() + 1)).slice(-2) +
					' / ' +
					d.getFullYear() +
					'\n'
				actual_screen.time.text = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
				break

			case descriptions['pattern_lock']:
				if (canvas.mouse.buttonState == 'down' || canvas.touch.touchState == 'down')
					actual_screen.active = true
				else if (canvas.mouse.buttonState == 'up' || canvas.touch.touchState == 'up') {
					changeScreen(canvas, build_lock_screen(canvas))
				}
				
				if (actual_screen.attempt == code) changeScreen(canvas, build_menu_screen(canvas))
				break

			case descriptions['fingerprint_lock']:
				actual_screen.progress_circle_fingerprint.rotation++
				actual_screen.progress_circle_fingerprint.end += actual_screen.progress_circle_fingerprint.touching

				if (actual_screen.progress_circle_fingerprint.end >= 360) {
					actual_screen.progress_circle_fingerprint.touching = 0
					actual_screen.progress_circle_fingerprint.end = 0
					changeScreen(canvas, build_menu_screen(canvas))
				}

				break

			case descriptions['new_measurement']:
				actual_screen.circle.rotation++
				actual_screen.circle.end += 2

				if (actual_screen.circle.end >= 360 && !actual_screen.done) {
					actual_screen.circle.stroke = '10px #55AA55'
					actual_screen.done = true
					actual_screen.addChild(actual_screen.done_text)

					switch (actual_screen.back_page) {
						case 'blood_pressure':
							health_information.today.systolic =
								MIN_SYSTOLIC_DAY + Math.floor(Math.random() * (MAX_SYSTOLIC_DAY - MIN_SYSTOLIC_DAY))
							health_information.today.diastolic =
								MIN_DIASTOLIC_DAY + Math.floor(Math.random() * (MAX_DIASTOLIC_DAY - MIN_DIASTOLIC_DAY))
							break
						case 'blood_oxygen':
							health_information.today.blood_oxygen = Math.random() / 2 + 0.5
							break
					}
				}

				break

			case descriptions['sos']:
				if (!sos.active && (canvas.mouse.buttonState == 'up' && canvas.touch.touchState == 'up')) {
					actual_screen.message_hold.text = health['press_3_seconds']
				} else if (sos.active && (canvas.mouse.buttonState == 'up' && canvas.touch.touchState == 'up')) {
					actual_screen.message_hold.text = health['press_5_seconds_cancel']
				}

			case descriptions['map']:
				if (clicked) {
					var map_html = document.getElementById('mapid')
					map_html.style.display = 'none'
					map_initialized.remove()
					
					map_information.back_to_map = false
					changeScreen(canvas, build_places_list_screen(canvas))
				}
				if (clicked_help) {
					var map_html = document.getElementById('mapid')
					map_html.style.display = 'none'
					map_initialized.remove()
					
					map_information.back_to_map = false
					changeScreen(canvas, build_map_help_screen(canvas))
				}
				
				break

			case descriptions['group']:
				for (people_index in actual_screen.people){
					var people = actual_screen.people[people_index]
					people.angle += 0
					people.x = actual_screen.radius * Math.cos(people.angle)
					people.y = actual_screen.radius * Math.sin(people.angle)
				}
				break
			
			case descriptions['camera_stream']:
				if (counter % (fps * 15) == 0 && camera_information.on_progress && camera_information.streaming && contacts_information.group.length > 0) {
					const contact_group_index = Math.floor(Math.random() * contacts_information.group.length)
					const contact = contacts_information.group[contact_group_index]

					const message_index = Math.floor(Math.random() * contacts_information.messages.length)
					const message = contacts_information.messages[message_index]

					if (camera_information.streaming_messages.length < 5) {
						const index = camera_information.streaming_messages.length

						var box = build_rectangle(canvas, [- actual_screen.width / 2 - 1, (index - 2) * actual_screen.height / 10], [actual_screen.width * 2 / 3, actual_screen.height / 10], ['left', 'center'], '#AAAAAA', [0, 20, 0, 20], 'outside ' + get_size_px(canvas, 1) + ' ' + black)
						box.opacity = 0.50

						var text = build_text(canvas, [- actual_screen.width / 2 + 35, (index - 2) * actual_screen.height / 10], ['left', 'center'], undefined, get_size_px(canvas, 15), message, black)
						var image = build_image(canvas, [- actual_screen.width / 2 + 15, (index - 2) * actual_screen.height / 10], [25, 25], undefined, MATERIALS_DIR + contact.image)

						camera_information.streaming_messages.push([image, text])
						actual_screen.addChild(box)
						actual_screen.addChild(text)
						actual_screen.addChild(image)
					} else {
						for (var comments_index = 0; comments_index < 5; comments_index++) {
							actual_screen.removeChild(camera_information.streaming_messages[comments_index][0])
							actual_screen.removeChild(camera_information.streaming_messages[comments_index][1])
						}

						camera_information.streaming_messages.shift()

						var text = build_text(canvas, undefined, ['left', 'center'], undefined, get_size_px(canvas, 15), message, black)
						var image = build_image(canvas, undefined, [25, 25], undefined, MATERIALS_DIR + contact.image)
						camera_information.streaming_messages[4] = [image, text]

						for (var comments_index = 0; comments_index < 5; comments_index++) {
							camera_information.streaming_messages[comments_index][0].x = - actual_screen.width / 2 + 15
							camera_information.streaming_messages[comments_index][0].y = (comments_index - 2) * actual_screen.height / 10

							camera_information.streaming_messages[comments_index][1].x = - actual_screen.width / 2 + 35
							camera_information.streaming_messages[comments_index][1].y = (comments_index - 2) * actual_screen.height / 10

							actual_screen.addChild(camera_information.streaming_messages[comments_index][0])
							actual_screen.addChild(camera_information.streaming_messages[comments_index][1])
						}
					}
				}
		}

		if (fitness.started) {
			if (fitness.type == 'activity_walk') {
				if (counter % fps == 0) {
					fitness.distance += 0.001
					fitness.calories += 5
					fitness.steps += 1
					fitness.duration += 1 / 60
				}
			} else if (fitness.type == 'activity_run') {
				if (counter % fps  == 0) {
					fitness.distance += 0.002
					fitness.calories += 8
					fitness.steps += 4
					fitness.duration += 1 / 60
				}
			} else if (fitness.type == 'activity_gym') {
				if (counter % fps  == 0) {
					fitness.distance += 0.001
					fitness.calories += 10
					fitness.steps += 6
					fitness.duration += 1 / 60
				}
			} else if (fitness.type == 'activity_bike') {
				if (counter % fps  == 0) {
					fitness.distance += 0.005
					fitness.calories += 10
					fitness.steps += 0
					fitness.duration += 1 / 60
				}
			}

			descriptions_valid = [
				descriptions['activity_walk'],
				descriptions['activity_run'],
				descriptions['activity_gym'],
				descriptions['activity_bike']
			]

			if (counter % fps  == 0 && descriptions_valid.includes(actual_screen.description))
				changeScreen(canvas, build_start_activity_screen(canvas))
		}

		if (sos.active) sos.audio_emergency.play()
		else sos.audio_emergency.pause()

		if (actual_screen.template)
			template.time.text = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)

		if (canvas.mouse.buttonState == 'up') frame.emergency = 5
	})

	canvas.timeline.start()

	var canvas_element = document.getElementById('workzone');

	canvas_element.addEventListener("wheel", event => {
		const delta = Math.sign(event.deltaY)
		var last_index = contacts_information.index
		contacts_information.index += delta * 0.25

		
		if (actual_screen.description == descriptions['contacts']) {
			if(contacts_information.index < 0){
				contacts_information.index = 0
			} else if(contacts_information.index > contacts_information.contacts_list.length - actual_screen.max_shown){
				contacts_information.index = contacts_information.contacts_list.length - actual_screen.max_shown
			}

			if (Math.floor(contacts_information.index) != Math.floor(last_index))
				changeScreen(canvas, build_contacts_screen(canvas))
			
		}

		if (actual_screen.description == descriptions['group_add']) {
			if(contacts_information.index < 0){
				contacts_information.index = 0
			} else if(contacts_information.index > (contacts_information.contacts_list.length - contacts_information.group.length) - actual_screen.max_shown){
				contacts_information.index = (contacts_information.contacts_list.length - contacts_information.group.length) - actual_screen.max_shown
			}

			if (Math.floor(contacts_information.index) != Math.floor(last_index))
				changeScreen(canvas, build_add_contact_group_screen(canvas))
			
		}
	})
}