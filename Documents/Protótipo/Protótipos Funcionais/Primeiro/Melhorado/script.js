var actual_screen;
var template;
var frame;
var description_bar;
var friendsgroup = [];

const fps = 60;
var counter = 0;

function changeScreen(canvas, new_screen) {
	canvas.removeChild(actual_screen);
	actual_screen = new_screen;
	canvas.addChild(new_screen);

	canvas.removeChild(description_bar);
	description_bar.text = new_screen.description;
	if (new_screen.description_show) {
		canvas.addChild(description_bar);
	}

	canvas.removeChild(template);
	if (new_screen.template) {
		canvas.addChild(template);
	}
}

function loadCanvas() {
	canvas = document.getElementById('workzone');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var canvas = oCanvas.create({
		canvas: '#workzone',
		fps: fps
	});

	var center = canvas.display
		.ellipse({
			x: canvas.width / 2,
			y: canvas.height / 2,
			radius: RADIUS_WORKZONE,
			fill: '#FFFFFF'
		})
		.add();

	description_bar = canvas.display
		.text({
			x: canvas.width / 2,
			y: canvas.height / 2 - SIZE_SCREEN / 2 / 8 * 6,
			origin: { x: 'center', y: 'center' },
			family: '7Segments',
			font: get_size_px(canvas, 19),
			fill: white
		})
		.add();

	// ------------------------------------------------ Logic and Canvas --------------------------------

	frame = build_frame(canvas);
	template = build_template(canvas);
	actual_screen = build_main_screen(canvas);

	canvas.addChild(frame);
	canvas.addChild(actual_screen);
	canvas.addChild(description_bar);

	canvas.setLoop(function() {
		var d = new Date();
		counter = (counter + 1) % fps;

		switch (actual_screen.description) {
			case descriptions['main']:
				actual_screen.date.text =
					('0' + d.getDate()).slice(-2) +
					' / ' +
					('0' + (d.getMonth() + 1)).slice(-2) +
					' / ' +
					d.getFullYear() +
					'\n';
				actual_screen.time.text = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
				break;

			case descriptions['pattern_lock']:
				if (canvas.mouse.buttonState == 'down' || canvas.touch.touchState == 'down')
					actual_screen.active = true;
				else if (canvas.mouse.buttonState == 'up' || canvas.touch.touchState == 'up') {
					changeScreen(canvas, build_lock_screen(canvas));
				}

				if (actual_screen.attempt == code) changeScreen(canvas, build_menu_screen(canvas));
				break;

			case descriptions['fingerprint_lock']:
				actual_screen.progress_circle_fingerprint.rotation++;
				actual_screen.progress_circle_fingerprint.end += actual_screen.progress_circle_fingerprint.touching;

				if (actual_screen.progress_circle_fingerprint.end >= 360) {
					actual_screen.progress_circle_fingerprint.touching = 0;
					actual_screen.progress_circle_fingerprint.end = 0;
					changeScreen(canvas, build_menu_screen(canvas));
				}

				break;

			case descriptions['sos']:
				if (!sos.active && canvas.mouse.buttonState == 'up') {
					actual_screen.message_hold.text = health['press_3_seconds'];
				} else if (sos.active && canvas.mouse.buttonState == 'up') {
					actual_screen.message_hold.text = health['press_5_seconds_cancel'];
				}
		}

		if (fitness.started) {
			if (fitness.type == 'activity_walk') {
				if (counter == 0) {
					fitness.distance += 0.001;
					fitness.calories += 5;
					fitness.steps += 1;
					fitness.duration += 1 / 60;
				}
			} else if (fitness.type == 'activity_run') {
				if (counter == 0) {
					fitness.distance += 0.002;
					fitness.calories += 8;
					fitness.steps += 4;
					fitness.duration += 1 / 60;
				}
			} else if (fitness.type == 'activity_gym') {
				if (counter == 0) {
					fitness.distance += 0.001;
					fitness.calories += 10;
					fitness.steps += 6;
					fitness.duration += 1 / 60;
				}
			} else if (fitness.type == 'activity_bike') {
				if (counter == 0) {
					fitness.distance += 0.005;
					fitness.calories += 10;
					fitness.steps += 0;
					fitness.duration += 1 / 60;
				}
			}
		}

		if (sos.active) {
			sos.audio_emergency.play();
		} else {
			sos.audio_emergency.pause();
		}

		if (actual_screen.template)
			template.time.text = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);

		if (canvas.mouse.buttonState == 'up') frame.emergency = 5;

		// TODO: Check if it's needed to update drawing of number of friend group
	});

	canvas.timeline.start();
}
