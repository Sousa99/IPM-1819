const white = '#FFFFFF'
const black = '#000000'
const gray_frame = '#7F7F7F'

const MATERIALS_DIR = '../../../../Materials'

const RADIUS_WORKZONE = 320
const SIZE_FRAME = 15
const SIZE_SCREEN = 270

const MAX_DISTANCE_INPUT_DAY = 5000
const MAX_STEPS_INPUT_DAY = 6500
const MAX_ELEVATION_INPUT_DAY = 7
const MAX_CALORIES_BURNED_DAY = 5000
const MAX_CALORIES_BURNED_WEEK = 30000
const MIN_HEART_RATE_AT_THE_MOMENT = 45
const MAX_HEART_RATE_AT_THE_MOMENT = 90
const MIN_SYSTOLIC_DAY = 120
const MAX_SYSTOLIC_DAY = 140
const MIN_DIASTOLIC_DAY = 70
const MAX_DIASTOLIC_DAY = 90
const MIN_HEART_RATE_DAY = 50
const MAX_HEART_RATE_DAY = 80
const MIN_HEART_RATE_WEEK = 50
const MAX_HEART_RATE_WEEK = 80
const MIN_SLEEP_TIME_HOURS = 5
const MAX_SLEEP_TIME_HOURS = 9
const MIN_SLEEP_TIME_MINUTES = 0
const MAX_SLEEP_TIME_MINUTES = 59

var sos = {
	active: false,
	time_delays: [ 15, 30, 60 ],
	time_delay_option: 0,
	audio_emergency: new Audio(MATERIALS_DIR + '/Emergency.mp3'),
	live_monitoring: false
}

var fitness = {
	type: null,
	started: false,
	sharing: false,
	distance: 0,
	calories: 0,
	steps: 0,
	duration: 0
}

var health_information = {
	at_the_moment: {
		nutrition_vitamins: Math.random(),
		nutrition_proteins: Math.random(),
		nutrition_water: Math.random(),
		nutrition_fats: Math.random(),
		nutrition_calcium: Math.random(),
		heart_rate:
			MIN_HEART_RATE_AT_THE_MOMENT +
			Math.floor(Math.random() * (MAX_HEART_RATE_AT_THE_MOMENT - MIN_HEART_RATE_AT_THE_MOMENT))
	},

	today: {
		distance: Math.random() * MAX_DISTANCE_INPUT_DAY / 10 / 100,
		steps: Math.floor(Math.random() * MAX_STEPS_INPUT_DAY),
		elevation: Math.floor(Math.random() * MAX_ELEVATION_INPUT_DAY),
		calories: Math.floor(Math.random() * MAX_CALORIES_BURNED_DAY),
		heart_rate: MIN_HEART_RATE_DAY + Math.floor(Math.random() * (MAX_HEART_RATE_DAY - MIN_HEART_RATE_DAY)),
		systolic: MIN_SYSTOLIC_DAY + Math.floor(Math.random() * (MAX_SYSTOLIC_DAY - MIN_SYSTOLIC_DAY)),
		diastolic: MIN_DIASTOLIC_DAY + Math.floor(Math.random() * (MAX_DIASTOLIC_DAY - MIN_DIASTOLIC_DAY)),
		blood_oxygen: Math.random() / 2 + 0.5,
		sleep_time_hours:
			MIN_SLEEP_TIME_HOURS + Math.floor(Math.random() * (MAX_SLEEP_TIME_HOURS - MIN_SLEEP_TIME_HOURS)),
		sleep_time_minutes:
			MIN_SLEEP_TIME_MINUTES + Math.floor(Math.random() * (MAX_SLEEP_TIME_MINUTES - MIN_SLEEP_TIME_MINUTES))
	},
	week: {
		calories: Math.floor(Math.random() * MAX_CALORIES_BURNED_WEEK) + MAX_CALORIES_BURNED_DAY,
		heart_rate: MIN_HEART_RATE_WEEK + Math.floor(Math.random() * (MAX_HEART_RATE_WEEK - MIN_HEART_RATE_WEEK)),
		blood_oxygen: Math.random() / 2 + 0.5,
		sleep_time_hours:
			MIN_SLEEP_TIME_HOURS + Math.floor(Math.random() * (MAX_SLEEP_TIME_HOURS - MIN_SLEEP_TIME_HOURS)),
		sleep_time_minutes:
			MIN_SLEEP_TIME_MINUTES + Math.floor(Math.random() * (MAX_SLEEP_TIME_MINUTES - MIN_SLEEP_TIME_MINUTES))
	}
}

var map_information = {
	actual_location: [38.736911, -9.138962],
	showing_route: false,
	type_selected: null,
	info_place: null,
	info_place_time: 0,
	info_place_transportation: 0,
	times: {
		food_beverage: [{pt: 'Almoço', en: 'Lunch', description: 'lunch'}, {pt: 'Jantar', en: 'Dinner', description: 'dinner'}],
		accomodation: [ {pt: 'Noite', en: 'Night', description: 'night'}],
		tourism: [{pt: 'Manhã', en: 'Morning', description: 'morning'}, {pt: 'Tarde', en: 'Afternoon', description: 'afternoon'}]
	},
	transportations: [
		{description: 'walking', image: '/Walking.png'},
		{description: 'bike', image: '/Bike.png'},
		{description: 'car', image: '/Car.png'},
		{description: 'bus', image: '/Bus.png'},
		{description: 'metro', image: '/Metro.png'},
		{description: 'train', image: '/Train.png'},
		{description: 'plane', image: '/Plane.png'}
	],

	food_beverage: [
		{name: 'Comida para Todos', description: {pt: 'Restaurante', en: 'Restaurant'}, location: [38.65, -9.2]},
		{name: 'Comida para 2', description: {pt: 'Restaurante', en: 'Restaurant'}, location: [38.8, -9.37]},
		{name: 'Comida para Crianças', description: {pt: 'Restaurante', en: 'Restaurant'}, location: [38.72, -9.35]},
		{name: 'Fast Food', description: {pt: 'Restaurante', en: 'Restaurant'}, location: [38.75, -9.25]},
		{name: 'Sushi', description: {pt: 'Restaurante', en: 'Restaurant'}, location: [38.73, -9.13]},
	],
	accomodation: [
		{name: 'Alojamento de *', description: {pt: 'Hotel', en: 'Hotel'}, location: [38.90, -9.2]},
		{name: 'Alojamento de * *', description: {pt: 'Hotel', en: 'Hotel'}, location: [38.80, -9.35]},
		{name: 'Alojamento de * * *', description: {pt: 'Hotel', en: 'Hotel'}, location: [38.71, -9.3]},
		{name: 'Alojamento de * * * *', description: {pt: 'Hotel', en: 'Hotel'}, location: [38.73, -9.14]},
		{name: 'Alojamento de * * * * *', description: {pt: 'Hotel', en: 'Hotel'}, location: [38.71, -9.13]}
	],
	tourism: [
		{name: 'Museus de História', description: {pt: 'Monumento', en: 'Monument'}, location: [38.7, -9.2]},
		{name: 'Museus de Ciência', description: {pt: 'Monumento', en: 'Monument'}, location: [38.69, -9.3]},
		{name: 'Jardins', description: {pt: 'Monumento', en: 'Monument'}, location: [38.8, -9.4]}
	],

	planned_route: {
		morning: null,
		lunch: null,
		afternoon: null,
		dinner: null,
		night: null,
	},

	trips: [
		{place: 'Suíça, Alpes Suíços', date: {en: 'Dec 16', pt: 'Dez 16'}},
		{place: 'Portugal, Almada', date: {en: 'Mar 17', pt: 'Mar 17'}},
		{place: 'Portugal, Trancoso', date: {en: 'Aug 17', pt: 'Ago 17'}},
		{place: 'Portugal, Castelo Branco', date: {en: 'Nov 17', pt: 'Nov 17'}},
		{place: 'USA, Florida - Miami', date: {en: 'Oct 18', pt: 'Out 18'}},
	]

}

function get_size_px(canvas, px_size) {
	return px_size + 'px'
}

function add_lines(canvas, screen, startpoint, list_option, list_link, list_image, list_info) {
	var links = []
	var text_x = 1

	if (list_image != null) text_x += 0.6

	var options = list_option.length
	for (var i = 0; i < options; i++) {
		var box = build_rectangle(canvas, [0, (i + startpoint) * screen.height / 10], [9 / 10 * screen.width, screen.height / 10], undefined, black)
		var text = build_text(canvas, [(text_x - 5) * screen.width / 10, 0], ['left', 'center'], undefined, get_size_px(canvas, 17), list_option[i], white)

		box.addChild(text)
		screen.addChild(box)

		if (
			list_link[i] == 'link' ||
			list_link[i] == 'link_arrow' ||
			list_link[i] == 'link_text' ||
			list_link[i] == 'link_pub' ||
			list_link[i] == 'link_option' ||
			list_link[i] == 'link_option_active'
		) {
			object_clickable(canvas, box)
			links.push(box)
			
			if (list_link[i] == 'link_arrow') {
				arrow = build_image(canvas, [4 * screen.width / 10, 0], [screen.height / 15, screen.width / 15], undefined, MATERIALS_DIR + '/Arrow-White.png')
				box.addChild(arrow)

			} else if (list_link[i] == 'link_pub') {
				box_pub = build_rectangle(canvas, [4 * screen.width / 10, 0], [screen.width / 9, screen.height / 11], undefined, '', [5, 5, 5, 5], get_size_px(canvas, 2) + ' ' + white)
				pub = build_image(canvas, undefined, [screen.width / 13, screen.height / 13], undefined, MATERIALS_DIR + map_information.transportations[map_information.info_place_transportation].image)

				box.addChild(box_pub)
				box_pub.addChild(pub)
			} else if (list_link[i] == 'link_text') {
				const text_array = map_information.times[map_information.type_selected]

				box_text = build_rectangle(canvas, [31 * screen.width / 100, 0], [2 / 7 * screen.width, screen.height / 12], undefined, '', [5, 5, 5, 5], get_size_px(canvas, 2) + ' ' + white)
				text = build_text(canvas, undefined, undefined, undefined, undefined, text_array[map_information.info_place_time][language], white)

				box_text.addChild(text)
				box.addChild(box_text)

				if (text_array.length == 1) {
					box_text.stroke = ''
					text.origin = {x: 'left', y: 'center'}
					object_non_clickable(canvas, box)
				}

			} else if (list_link[i] == 'link_option' || list_link[i] == 'link_option_active') {
				circle = build_ellipse(canvas, [2 / 5 * screen.width, 0], screen.width / 30, '', get_size_px(canvas, 2) + ' ' + white)

				box.addChild(circle)
				box.active = false

				if (list_link[i] == 'link_option_active') {
					var choosen = build_ellipse(canvas, [2 / 5 * screen.width, 0], screen.height / 55, '#005dff')

					box.addChild(choosen)
					box.active = true
				}
			}
		} else if (list_link[i] == 'text') {
			info = build_text(canvas, [9 / 20 * screen.width, 0], ['right', 'center'], undefined, undefined, list_info[i], white)
			box.addChild(info)
		}

		if (list_image != null && list_image[i] != 'none') {
			var image = build_image(canvas, [- 2 / 5 * screen.width, 0], [screen.width / 13, screen.height / 13], undefined, MATERIALS_DIR + '/' + list_image[i])
			box.addChild(image)
		}
	}

	for (var i = 0; i < options + 1; i++) {
		var line = build_line(canvas, [- 9 / 20 * screen.width, (i + startpoint - 0.5) * screen.height / 10], [9 / 20 * screen.width, (i + startpoint - 0.5) * screen.height / 10])
		screen.addChild(line)
	}

	return links
}

function get_qualitative(value) {
	if (value < 0.15) return health['bad']
	else if (value < 0.6) return health['ok']
	else if (value < 0.9) return health['good']
	else return health['excellent']
}

function get_qualitative_heart_rate(value) {
	if (value >= 90) return health['fast_heart_rate']
	else if (value >= 70) return health['good_heart_rate']
	else return health['slow_heart_rate']
}

function get_qualitative_blood_pressure(systolic, diastolic) {
	if (systolic < 120 && diastolic < 80) return health['normal']
	else if (systolic <= 129 && diastolic < 80) return health['elevated']
	else return health['hypertension']
}

function get_qualitative_blood_oxygen(percentage) {
	if (percentage >= 0.85) return health['normal']
	else if (percentage >= 0.65) return health['low']
	else return health['very_low']
}

function get_qualitative_sleep_time(sleep_time) {
	if (sleep_time > 7 && sleep_time < 9) return health['good']
	else return health['bad']
}

function get_health_info(screen) {
	var info = []
	if (screen == descriptions['activity']) {
		info.push(health_information.today.distance.toFixed(3) + ' ' + health['km'])
		info.push(health_information.today.steps)
		info.push(health_information.today.elevation + ' ' + health['floors'])
	} else if (screen == descriptions['energy']) {
		info.push(health_information.today.calories + ' ' + health['cal'])
		info.push(health_information.week.calories + ' ' + health['cal'])
	} else if (screen == descriptions['nutrition']) {
		info.push(get_qualitative(health_information.at_the_moment['nutrition_vitamins']))
		info.push(get_qualitative(health_information.at_the_moment['nutrition_proteins']))
		info.push(get_qualitative(health_information.at_the_moment['nutrition_water']))
		info.push(get_qualitative(health_information.at_the_moment['nutrition_fats']))
		info.push(get_qualitative(health_information.at_the_moment['nutrition_calcium']))
	} else if (screen == descriptions['heart_rate']) {
		health_information.at_the_moment.heart_rate =
			MIN_HEART_RATE_AT_THE_MOMENT +
			Math.floor(Math.random() * (MAX_HEART_RATE_AT_THE_MOMENT - MIN_HEART_RATE_AT_THE_MOMENT))
		info.push(health_information.at_the_moment['heart_rate'] + ' ' + health['bpm'])
		info.push(health_information.today['heart_rate'] + ' ' + health['bpm'])
		info.push(health_information.week['heart_rate'] + ' ' + health['bpm'])
	} else if (screen == descriptions['blood_pressure']) {
		info.push(health_information.today['systolic'] + ' ' + health['mmHg'])
		info.push(health_information.today['diastolic'] + ' ' + health['mmHg'])
		info.push(
			get_qualitative_blood_pressure(health_information.today['systolic'], health_information.today['diastolic'])
		)
	} else if (screen == descriptions['blood_oxygen']) {
		info.push(Math.floor(health_information.today['blood_oxygen'] * 100) + ' %')
		info.push(Math.floor(health_information.week['blood_oxygen'] * 100) + ' %')
		info.push(get_qualitative_blood_oxygen(health_information.today['blood_oxygen']))
	} else if (screen == descriptions['sleep_time']) {
		info.push(
			health_information.today['sleep_time_hours'] +
				':' +
				('0' + health_information.today['sleep_time_minutes']).slice(-2) +
				' ' +
				health['hours']
		)
		info.push(
			health_information.week['sleep_time_hours'] +
				':' +
				('0' + health_information.today['sleep_time_minutes']).slice(-2) +
				' ' +
				health['hours']
		)
		info.push(get_qualitative_sleep_time(health_information.week['sleep_time_hours']))
	}

	return info
}

function call_cancel_sos(sos_screen) {
	if (sos.active) {
		sos.active = false
		sos_screen.message.fill = 'radial-gradient(' + white + ', ' + '#AAAAAA' + ')'
		sos_screen.message_text.text = health['call_emergency']
		sos_screen.message_text.y = -0.35 * sos_screen.height / 10
		sos_screen.message_text.fill = black
		sos_screen.message_hold.text = health['press_3_seconds']
		sos_screen.message_hold.fill = black
		sos_screen.message_hold.y = 0.35 * sos_screen.height / 10
		frame.emergency = 5
	} else {
		sos.active = true
		sos_screen.message.fill = 'radial-gradient(' + '#FF5555' + ', ' + '#bc2b2b' + ')'
		sos_screen.message_text.text = health['help_on_the_way']
		sos_screen.message_text.y = -0.65 * sos_screen.height / 10
		sos_screen.message_text.fill = white
		sos_screen.message_hold.text = health['press_5_seconds_cancel']
		sos_screen.message_hold.fill = white
		sos_screen.message_hold.y = 0.5 * sos_screen.height / 10
	}
}