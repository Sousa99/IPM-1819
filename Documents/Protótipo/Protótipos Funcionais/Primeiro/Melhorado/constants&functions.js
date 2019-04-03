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
const MIN_HEART_RATE_DAY = 50;
const MAX_HEART_RATE_DAY = 80;
const MIN_HEART_RATE_WEEK = 50;
const MAX_HEART_RATE_WEEK = 80;

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
		distance: Math.floor(Math.random() * MAX_DISTANCE_INPUT_DAY) / 10 / 100,
		steps: Math.floor(Math.random() * MAX_STEPS_INPUT_DAY),
		elevation: Math.floor(Math.random() * MAX_ELEVATION_INPUT_DAY),
		calories: Math.floor(Math.random() * MAX_CALORIES_BURNED_DAY),
		heart_rate: MIN_HEART_RATE_DAY + Math.floor(Math.random() * (MAX_HEART_RATE_DAY - MIN_HEART_RATE_DAY))
	},
	week: {
		calories: Math.floor(Math.random() * MAX_CALORIES_BURNED_WEEK) + MAX_CALORIES_BURNED_DAY,
		heart_rate: MIN_HEART_RATE_WEEK + Math.floor(Math.random() * (MAX_HEART_RATE_WEEK - MIN_HEART_RATE_WEEK))
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

			if (mode == 0) {
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
			} else if (mode == 2) {
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

			if (mode != 2) {
				link
					.bind('mouseenter', function() {
						canvas.mouse.cursor('pointer');
					})
					.bind('mouseleave', function() {
						canvas.mouse.cursor('default');
					});
				links.push(link);
			}

			screen.addChild(link);
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
	}

	return info;
}
