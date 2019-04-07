const white = '#FFFFFF';
const black = '#000000';
const gray_frame = '#7F7F7F';

const MATERIALS_DIR = '../../../../../Materials';

const RADIUS_WORKZONE = 320;
const SIZE_FRAME = 15;
const SIZE_SCREEN = 270;

const MAX_DISTANCE_INPUT_DAY = 5000;
const MAX_STEPS_INPUT_DAY = 6500;
const MAX_ELEVATION_INPUT_DAY = 7;
const MAX_CALORIES_BURNED_DAY = 5000;
const MAX_CALORIES_BURNED_WEEK = 30000;
const MIN_HEART_RATE_AT_THE_MOMENT = 45;
const MAX_HEART_RATE_AT_THE_MOMENT = 90;
const MIN_SYSTOLIC_DAY = 120;
const MAX_SYSTOLIC_DAY = 140;
const MIN_DIASTOLIC_DAY = 70;
const MAX_DIASTOLIC_DAY = 90;
const MIN_HEART_RATE_DAY = 50;
const MAX_HEART_RATE_DAY = 80;
const MIN_HEART_RATE_WEEK = 50;
const MAX_HEART_RATE_WEEK = 80;
const MIN_SLEEP_TIME_HOURS = 5;
const MAX_SLEEP_TIME_HOURS = 9;
const MIN_SLEEP_TIME_MINUTES = 0;
const MAX_SLEEP_TIME_MINUTES = 59;

var sos = {
	active: false,
	time_delays: [15, 30, 60],
	time_delay_option: 0,
	audio_emergency: new Audio(MATERIALS_DIR + '/Emergency.mp3'),
	live_monitoring: false,
};

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
		distance: (Math.floor(Math.random() * MAX_DISTANCE_INPUT_DAY) / 10 / 100),
		steps: Math.floor(Math.random() * MAX_STEPS_INPUT_DAY),
		elevation: Math.floor(Math.random() * MAX_ELEVATION_INPUT_DAY),
		calories: Math.floor(Math.random() * MAX_CALORIES_BURNED_DAY),
		heart_rate: MIN_HEART_RATE_DAY + Math.floor(Math.random() * (MAX_HEART_RATE_DAY - MIN_HEART_RATE_DAY)),
		systolic: MIN_SYSTOLIC_DAY + Math.floor(Math.random() * (MAX_SYSTOLIC_DAY - MIN_SYSTOLIC_DAY)),
		diastolic: MIN_DIASTOLIC_DAY + Math.floor(Math.random() * (MAX_DIASTOLIC_DAY - MIN_DIASTOLIC_DAY)),
		blood_oxygen: (Math.random() / 2) + 0.50,
		sleep_time_hours:
			MIN_SLEEP_TIME_HOURS + Math.floor(Math.random() * (MAX_SLEEP_TIME_HOURS - MIN_SLEEP_TIME_HOURS)),
		sleep_time_minutes:
			MIN_SLEEP_TIME_MINUTES + Math.floor(Math.random() * (MAX_SLEEP_TIME_MINUTES - MIN_SLEEP_TIME_MINUTES))
	},
	week: {
		calories: Math.floor(Math.random() * MAX_CALORIES_BURNED_WEEK) + MAX_CALORIES_BURNED_DAY,
		heart_rate: MIN_HEART_RATE_WEEK + Math.floor(Math.random() * (MAX_HEART_RATE_WEEK - MIN_HEART_RATE_WEEK)),
		blood_oxygen: (Math.random() / 2) + 0.50,
		sleep_time_hours:
			MIN_SLEEP_TIME_HOURS + Math.floor(Math.random() * (MAX_SLEEP_TIME_HOURS - MIN_SLEEP_TIME_HOURS)),
		sleep_time_minutes:
			MIN_SLEEP_TIME_MINUTES + Math.floor(Math.random() * (MAX_SLEEP_TIME_MINUTES - MIN_SLEEP_TIME_MINUTES))
	}
};

function get_size_px(canvas, px_size) {
	return px_size + 'px';
}

function add_lines(canvas, screen, startpoint, mode, list_image, active) {
	var links = [];
	var number_options = screen.children.length;
	for (var i = 0; i < number_options + 1; i++) {
		if (i < number_options) {
			var link;

			if (mode == 0 || (mode == 2 && active[i] == 'link')) {
				link = canvas.display.image({
					x: screen.width / 2 - 1 * screen.width / 10,
					y: (i + startpoint) * screen.height / 10,
					origin: { x: 'center', y: 'center' },
					width: screen.height / 15,
					height: screen.height / 15,
					image: MATERIALS_DIR + '/Arrow-White.png'
				});
			} else if (mode == 1) {
				var active_object = false;
				if (i == active) {
					active_object = true;
					var choosen = canvas.display.ellipse({
						x: screen.width / 2 - 1 * screen.width / 10,
						y: (i + startpoint) * screen.height / 10,
						radius: screen.height / 55,
						fill: '#005dff'
					});

					screen.addChild(choosen);
				}

				link = canvas.display.ellipse({
					active: active_object,
					x: screen.width / 2 - 1 * screen.width / 10,
					y: (i + startpoint) * screen.height / 10,
					radius: screen.height / 30,
					stroke: '2px ' + white
				});
			} else if (mode == 2 && active[i] != 'link') {
				link = canvas.display.text({
					x: screen.width / 2 - 0.5 * screen.width / 10,
					y: (i + startpoint) * screen.height / 10,
					origin: { x: 'right', y: 'center' },
					text: active[i],
					fill: white
				});
			}

			if (list_image != null) {
				var image = canvas.display.image({
					x: -screen.width / 2 + 1 * screen.width / 10,
					y: (i + startpoint) * screen.height / 10,
					origin: { x: 'center', y: 'center' },
					width: screen.height / 13,
					height: screen.height / 13,
					image: MATERIALS_DIR + '/' + list_image[i]
				});

				screen.addChild(image);
			}

			if ([ 0, 1 ].includes(mode) || (mode == 2 && active[i] == 'link')) {
				link
					.bind('mouseenter', function() {
						canvas.mouse.cursor('pointer');
					})
					.bind('mouseleave', function() {
						canvas.mouse.cursor('default');
					});
				links.push(link);
			}

			if (link != null) screen.addChild(link);
		}

		var line = canvas.display.line({
			start: {
				x: -screen.width / 2 + screen.width / 20,
				y: (i + startpoint - 0.5) * screen.height / 10
			},
			end: {
				x: screen.width / 2 - screen.width / 20,
				y: (i + startpoint - 0.5) * screen.height / 10
			},
			stroke: '1px ' + white,
			cap: 'round'
		});

		screen.addChild(line);
	}

	return links;
}

function get_qualitative(value) {
	if (value < 0.15) return health['bad'];
	else if (value < 0.6) return health['ok'];
	else if (value < 0.9) return health['good'];
	else return health['excellent'];
}

function get_qualitative_blood_pressure(systolic, diastolic) {
	if (systolic < 120 && diastolic < 80) return health['normal'];
	else if (systolic <= 129 && diastolic < 80) return health['elevated'];
	else return health['hypertension'];
}

function get_qualitative_blood_oxygen(percentage) {
	if (percentage >= 0.85) return health['normal'];
	else if (percentage >= 0.65) return health['low'];
	else return health['very_low'];
}

function get_qualitative_sleep_time(sleep_time) {
	if (sleep_time > 7 && sleep_time < 9) return health['good'];
	else return health['bad'];
}

function get_health_info(screen) {
	var info = [];
	if (screen == descriptions['activity']) {
		info.push(health_information.today.distance + ' ' + health['km']);
		info.push(health_information.today.steps);
		info.push(health_information.today.elevation + ' ' + health['floors']);
	} else if (screen == descriptions['energy']) {
		info.push(health_information.today.calories + ' ' + health['cal']);
		info.push(health_information.week.calories + ' ' + health['cal']);
		info.push('TODO');
	} else if (screen == descriptions['nutrition']) {
		info.push(get_qualitative(health_information.at_the_moment['nutrition_vitamins']));
		info.push(get_qualitative(health_information.at_the_moment['nutrition_proteins']));
		info.push(get_qualitative(health_information.at_the_moment['nutrition_water']));
		info.push(get_qualitative(health_information.at_the_moment['nutrition_fats']));
		info.push(get_qualitative(health_information.at_the_moment['nutrition_calcium']));
	} else if (screen == descriptions['heart_rate']) {
		info.push(health_information.at_the_moment['heart_rate'] + ' ' + health['bpm']);
		info.push(health_information.today['heart_rate'] + ' ' + health['bpm']);
		info.push(health_information.week['heart_rate'] + ' ' + health['bpm']);
	} else if (screen == descriptions['blood_pressure']) {
		info.push(health_information.today['systolic'] + ' ' + health['mmHg']);
		info.push(health_information.today['diastolic'] + ' ' + health['mmHg']);
		info.push(get_qualitative_blood_pressure(health_information.today['systolic'], health_information.today['diastolic']));
	} else if (screen == descriptions['blood_oxygen']) {
		info.push(Math.floor(health_information.today['blood_oxygen'] * 100));
		info.push(Math.floor(health_information.week['blood_oxygen'] * 100));
		info.push(get_qualitative_blood_oxygen(health_information.today['blood_oxygen']));
	} else if (screen == descriptions['sleep_time']) {
		info.push(
			health_information.today['sleep_time_hours'] +
				':' +
				('0' + health_information.today['sleep_time_minutes']).slice(-2) +
				' ' +
				health['hours']
		);
		info.push(
			health_information.week['sleep_time_hours'] +
				':' +
				('0' + health_information.week['sleep_time_minutes']).slice(-2) +
				' ' +
				health['hours']
		);
		info.push(get_qualitative_sleep_time(health_information.week['sleep_time_hours']));
	}

	return info;
}

function call_cancel_sos(sos_screen) {
	if (sos.active) {
		sos.active = false;
		sos_screen.message.fill = 'radial-gradient(' + white + ', ' + '#AAAAAA' + ')';
		sos_screen.message_text.text = health['call_emergency'];
		sos_screen.message_text.y = -0.35 * sos_screen.height / 10;
		sos_screen.message_hold.text = health['press_3_seconds'];
		sos_screen.message_hold.y = 0.35 * sos_screen.height / 10;
		frame.emergency = 5;
	} else {
		sos.active = true;
		sos_screen.message.fill = 'radial-gradient(' + '#FF5555' + ', ' + '#bc2b2b' + ')';
		sos_screen.message_text.text = health['help_on_the_way'];
		sos_screen.message_text.y = -0.65 * sos_screen.height / 10;
		sos_screen.message_hold.text = health['press_5_seconds_cancel'];
		sos_screen.message_hold.y = 0.5 * sos_screen.height / 10;
	}
}
