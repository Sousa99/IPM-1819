var map_initialized;
var clicked;

function onClickButtonList() { clicked = true; }

function build_map_type_selection_screen(canvas) {
    var map_type_selection_screen = canvas.display.rectangle({
		description: descriptions['map_type_selection'],
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
		start: { x: -0.55 * map_type_selection_screen.width / 2, y: 0.2 * map_type_selection_screen.height / 2 },
		end: { x: 0.55 * map_type_selection_screen.width / 2, y: 0.2 * map_type_selection_screen.height / 2 },
		stroke: '2px ' + white,
		cap: 'round'
	});
	map_type_selection_screen.addChild(line_separating);

	var line_separating = canvas.display.line({
		start: { x: 0, y: (0.2 - 0.55) * map_type_selection_screen.height / 2 },
		end: { x: 0, y: (0.2 + 0.55) * map_type_selection_screen.height / 2 },
		stroke: '2px ' + white,
		cap: 'round'
	});
	map_type_selection_screen.addChild(line_separating);

	map_type_selection_screen.food_beverage = canvas.display.image({
		x: -map_type_selection_screen.width / 7,
		y: -map_type_selection_screen.height / 4.75 + 0.3 * map_type_selection_screen.height / 2,
		width: map_type_selection_screen.width / 4.75,
		height: map_type_selection_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Food-Beverage.png'
	});
	map_type_selection_screen.accomodation = canvas.display.image({
		x: +map_type_selection_screen.width / 6,
		y: -map_type_selection_screen.height / 4.75 + 0.3 * map_type_selection_screen.height / 2,
		width: map_type_selection_screen.width / 4.75,
		height: map_type_selection_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Accomodation.png'
	});
	map_type_selection_screen.tourism = canvas.display.image({
		x: -map_type_selection_screen.width / 6,
		y: +map_type_selection_screen.height / 4.75 + 0.1 * map_type_selection_screen.height / 2,
		width: map_type_selection_screen.width / 4.75,
		height: map_type_selection_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Tourism.png'
	});
	map_type_selection_screen.travel_route = canvas.display.image({
		x: +map_type_selection_screen.width / 5,
		y: +map_type_selection_screen.height / 4.75 + 0.1 * map_type_selection_screen.height / 2,
		width: map_type_selection_screen.width / 4.75,
		height: map_type_selection_screen.height / 4.75,
		origin: { x: 'center', y: 'center' },
		image: MATERIALS_DIR + '/Travel-Route.png'
    });
    
    map_type_selection_screen.addChild(map_type_selection_screen.food_beverage);
    map_type_selection_screen.addChild(map_type_selection_screen.accomodation);
    map_type_selection_screen.addChild(map_type_selection_screen.tourism);
    map_type_selection_screen.addChild(map_type_selection_screen.travel_route);

    map_type_selection_screen.food_beverage
		.bind('click tap', function() {
		  map_information.type_selected = 'food_beverage';
			changeScreen(canvas, build_map_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

    map_type_selection_screen.accomodation
		.bind('click tap', function() {
			map_information.type_selected = 'accomodation';
			changeScreen(canvas, build_map_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

    map_type_selection_screen.tourism
		.bind('click tap', function() {
			map_information.type_selected = 'tourism';
			changeScreen(canvas, build_map_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

    map_type_selection_screen.travel_route
		.bind('click tap', function() {
            changeScreen(canvas, build_my_travel_route_screen(canvas));
		})
		.bind('mouseenter', function() {
			canvas.mouse.cursor('pointer');
		})
		.bind('mouseleave', function() {
			canvas.mouse.cursor('default');
		});

    return map_type_selection_screen;
}

function build_map_screen(canvas) {
	var map_screen = canvas.display.rectangle({
		description: descriptions['map'],
		description_show: false,
		template: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: 0,
		height: 0,
		borderRadius: 20,
		fill: black
    });

	// Adjustment of container of the map
	var map_html = document.getElementById('mapid');
	map_html.style.height = (SIZE_SCREEN + 1) + 'px';
	map_html.style.width = (SIZE_SCREEN + 1) + 'px';
	map_html.style.display = 'block';
	
	// Initialization of the map itself
	map_initialized = L.map('mapid', {
        attributionControl: false,
        center: map_information.actual_location,
        zoom: 15,
        minZoom: 4,
        maxZoom: 18,
        zoomControl: false
	});
	
	// layer of the map itself, needs to load various files!
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		maxZoom: 18,
		minZoom: 4,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1Ijoic291c2E5OSIsImEiOiJjanVoYXI3ODcwcW05NDNvM2phNnB3eGF6In0.4u5Q1HN3FiTISIBO2RdR_A'
	}).addTo(map_initialized);
	/*
	L.tileLayer('../../../../Materials/Map/Tiles/{z}/{x}/{y}.png', {
			maxZoom: 15,
			minZoom: 4
	}).addTo(map_initialized);*/

	// Creation of icon to mark places!
	var place_icon = L.icon({
		iconUrl: MATERIALS_DIR + '/Place-Marker.png',
		shadowUrl: MATERIALS_DIR + '/Place-Marker-Shadow.png',
	
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
	})

	// Adding the location of the user itself and a scale of the map
	L.marker(map_information.actual_location).addTo(map_initialized);
	L.control.scale({
		metric: true,
		imperial: true
	}).addTo(map_initialized);

	// Adding the various places according to the category chosen by the user
	const places = map_information[map_information.type_selected];
	var places_marker = [];
	for (place in places) {
			var marker = L.marker(places[place].location, {icon: place_icon});
			marker.bindPopup('<b>' + places[place].name + '</b><br>' + places[place].description[language]);
			places_marker.push(marker);
	}

	var places_marker_layer = L.layerGroup(places_marker);
	places_marker_layer.addTo(map_initialized);

	// Only testing out routing to see if it works and its limits!
	var router = L.Routing.control({
		waypoints: [
			L.latLng(map_information.actual_location[0], map_information.actual_location[1]),
			L.latLng(places[0].location[0], places[0].location[1])
		],

		createMarker: function() { return null; }
	}).addTo(map_initialized);
	router.hide();
	
	clicked = false;
	return map_screen;
}

function build_places_list_screen(canvas) {
	var places_list_screen = canvas.display.rectangle({
		description: descriptions['places_list'],
		description_show: true,
		template: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
		});

    const places = map_information[map_information.type_selected];
    var options = [];
    var link = [];
    for (place in places) {
        options.push(places[place].name);
        link.push('link_arrow');
    }

    links = add_lines(canvas, places_list_screen, -2, options, link);
    for (link in links) {
        const place = places[link];
        links[link].bind('click tap', function() {
            map_information.info_place = place;
            map_information.info_place_time = 0;
            map_information.info_place_transportation = 0;
            changeScreen(canvas, build_place_information_screen(canvas));
        })
    }

	return places_list_screen;
}

function build_place_information_screen(canvas) {
	var place_information_screen = canvas.display.rectangle({
		description: descriptions['place_information'],
		description_show: false,
		template: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
        });

	const place = map_information.info_place;

    var name = canvas.display.text({
        x: 0,
        y: - SIZE_SCREEN / 2 / 8 * 6,
        origin: { x: 'center', y: 'center' },
        family: '7Segments',
        font: get_size_px(canvas, 19),
        text: place.name,
        fill: white
    });
    place_information_screen.addChild(name);

    var options = [map.description, map.location, map.time, map.transportation];
    var link = ['text', 'text', 'link_text', 'link_pub'];
    var info = [place.description[language], place.location, null, null];

    links = add_lines(canvas, place_information_screen, -2, options, link, null, info);

    links[0].bind('click tap', function() {
        const text_array = map_information.times[map_information.type_selected];

        map_information.info_place_time = (map_information.info_place_time + 1) % text_array.length;
        changeScreen(canvas, build_place_information_screen(canvas));
    });
    links[1].bind('click tap', function() {
        map_information.info_place_transportation = (map_information.info_place_transportation + 1) % map_information.transportations.length;
        changeScreen(canvas, build_place_information_screen(canvas));
    });

    place_information_screen.map_button = canvas.display.rectangle({
		x: -0.41 * place_information_screen.width / 2,
		y: 1.25 * place_information_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.8 * place_information_screen.width / 2,
		height: 0.6 * place_information_screen.width / 3,
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,
		fill: 'radial-gradient(' + white + ', ' + '#1f6ca2' + ')'
	});
	place_information_screen.add_route_button = canvas.display.rectangle({
		x: 0.41 * place_information_screen.width / 2,
		y: 1.25 * place_information_screen.height / 4,
		origin: { x: 'center', y: 'center' },
		width: 0.8 * place_information_screen.width / 2,
		height: 0.6 * place_information_screen.width / 3,
		borderBottomRightRadius: 5,
		borderTopRightRadius: 5,
		fill: 'radial-gradient(' + white + ', ' + '#a39a20' + ')'
	});

	place_information_screen.map_text = canvas.display.text({
		x: 0,
		y: 0,
		origin: { x: 'center', y: 'center' },
        align: 'center',
		font: get_size_px(canvas, 17),
		text: map.map,
		fill: black
	});
	place_information_screen.add_route_text = canvas.display.text({
		x: 0,
		y: 0,
        origin: { x: 'center', y: 'center' },
        align: 'center',
		font: get_size_px(canvas, 17),
		text: map.add_route,
		fill: black
    });

    place_information_screen.add_route_button
        .bind('click tap', function() {
			changeScreen(canvas, build_changed_travel_route_screen(canvas));
        })
        .bind('mouseenter', function() {
            canvas.mouse.cursor('pointer');
        })
        .bind('mouseleave', function() {
            canvas.mouse.cursor('default');
		});

    place_information_screen.map_button.addChild(place_information_screen.map_text);
    place_information_screen.add_route_button.addChild(place_information_screen.add_route_text);
    place_information_screen.addChild(place_information_screen.map_button);
    place_information_screen.addChild(place_information_screen.add_route_button);

	return place_information_screen;
}

function build_changed_travel_route_screen(canvas) {
	var changed_travel_route_screen = canvas.display.rectangle({
		description: descriptions['changed_travel_route'],
		description_show: true,
		template: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: black
		});

		changed_travel_route_screen.message = canvas.display.text({
			x: 0,
			y: 0,
			origin: { x: 'center', y: 'center' },
			align: 'center',
			font: get_size_px(canvas, 17),
			text: map['changed_travel_route'],
			fill: white
		});
	
		changed_travel_route_screen.yes_button = canvas.display.rectangle({
			x: +0.41 * changed_travel_route_screen.width / 2,
			y: 1.25 * changed_travel_route_screen.height / 4,
			origin: { x: 'center', y: 'center' },
			width: 0.8 * changed_travel_route_screen.width / 4,
			height: 0.6 * changed_travel_route_screen.width / 6,
			borderRadius: 5,
			fill: 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')'
		});
		changed_travel_route_screen.yes_text = canvas.display.text({
			x: 0,
			y: 0,
			origin: { x: 'center', y: 'center' },
			font: get_size_px(canvas, 16),
			text: map['yes'],
			fill: black
		});
	
		changed_travel_route_screen.no_button = canvas.display.rectangle({
			x: -0.41 * changed_travel_route_screen.width / 2,
			y: 1.25 * changed_travel_route_screen.height / 4,
			origin: { x: 'center', y: 'center' },
			width: 0.8 * changed_travel_route_screen.width / 4,
			height: 0.6 * changed_travel_route_screen.width / 6,
			borderRadius: 5,
			borderTopLeftRadius: 5,
			fill: 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')'
		});
		changed_travel_route_screen.no_text = canvas.display.text({
			x: 0,
			y: 0,
			origin: { x: 'center', y: 'center' },
			font: get_size_px(canvas, 17),
			text: map['no'],
			fill: black
		});
	
		changed_travel_route_screen.yes_button.addChild(changed_travel_route_screen.yes_text);
		changed_travel_route_screen.no_button.addChild(changed_travel_route_screen.no_text);
		changed_travel_route_screen.addChild(changed_travel_route_screen.yes_button);
		changed_travel_route_screen.addChild(changed_travel_route_screen.no_button);
		changed_travel_route_screen.addChild(changed_travel_route_screen.message);
	
		changed_travel_route_screen.yes_button
			.bind('click tap', function() {
				const place = map_information.info_place;
				const time = map_information.times[map_information.type_selected][map_information.info_place_time];
            	const method_transportation = map_information.transportations[map_information.info_place_transportation];

				map_information.planned_route[time.description] = {
					place: place,
					transportation: method_transportation
				}

				changeScreen(canvas, build_map_type_selection_screen(canvas));
			})
			.bind('mouseenter', function() {
				canvas.mouse.cursor('pointer');
			})
			.bind('mouseleave', function() {
				canvas.mouse.cursor('default');
			});
	
		changed_travel_route_screen.no_button
			.bind('click tap', function() {
				changeScreen(canvas, build_place_information_screen(canvas));
			})
			.bind('mouseenter', function() {
				canvas.mouse.cursor('pointer');
			})
			.bind('mouseleave', function() {
				canvas.mouse.cursor('default');
			});


	return changed_travel_route_screen;
}

function build_my_travel_route_screen(canvas) {
    var my_travel_route_screen = canvas.display.rectangle({
        description: descriptions['my_travel_route'],
        description_show: true,
        template: false,
        x: canvas.width / 2,
        y: canvas.height / 2,
        origin: { x: 'center', y: 'center' },
        width: SIZE_SCREEN,
        height: SIZE_SCREEN,
        borderRadius: 20,
        fill: black
        });
    
    const startpoint = -2;
    const lines = 5;

    for (var i = 0; i < lines + 1; i++) {
        var line = canvas.display.line({
            start: {
                x: -my_travel_route_screen.width / 2 + my_travel_route_screen.width / 20,
                y: (i + startpoint - 0.5) * my_travel_route_screen.height / 10
            },
            end: {
                x: my_travel_route_screen.width / 2 - my_travel_route_screen.width / 20,
                y: (i + startpoint - 0.5) * my_travel_route_screen.height / 10
            },
            stroke: '1px ' + white,
            cap: 'round'
        });
        my_travel_route_screen.addChild(line);
    }
    
    var line = canvas.display.line({
        start: {
            x: - my_travel_route_screen.width / 2 + my_travel_route_screen.width / 4,
            y: (startpoint - 0.9) * my_travel_route_screen.height / 10
        },
        end: {
            x: - my_travel_route_screen.width / 2 + my_travel_route_screen.width / 4,
            y: (lines + startpoint - 0.1) * my_travel_route_screen.height / 10
        },
        stroke: '1px ' + white,
        cap: 'round'
    });
    my_travel_route_screen.addChild(line);
    
    var line = canvas.display.line({
        start: {
            x: my_travel_route_screen.width / 2 - my_travel_route_screen.width / 5,
            y: (startpoint - 0.9) * my_travel_route_screen.height / 10
        },
        end: {
            x: my_travel_route_screen.width / 2 - my_travel_route_screen.width / 5,
            y: (lines + startpoint - 0.1) * my_travel_route_screen.height / 10
        },
        stroke: '1px ' + white,
        cap: 'round'
    });
    my_travel_route_screen.addChild(line);
	
	my_travel_route_screen.morning_text = canvas.display.text({
		x: - my_travel_route_screen.width / 2 + my_travel_route_screen.width / 20 + my_travel_route_screen.width / 10,
		y: -0.6 * my_travel_route_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 15),
		text: map['morning'],
		fill: white
	});

	my_travel_route_screen.lunch_text = canvas.display.text({
		x: - my_travel_route_screen.width / 2 + my_travel_route_screen.width / 20 + my_travel_route_screen.width / 10,
		y: -0.3 * my_travel_route_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 15),
		text: map['lunch'],
		fill: white
	});

	my_travel_route_screen.afternoon_text = canvas.display.text({
		x: - my_travel_route_screen.width / 2 + my_travel_route_screen.width / 20 + my_travel_route_screen.width / 10,
		y: 0 * my_travel_route_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 15),
		text: map['afternoon'],
		fill: white
	});

	my_travel_route_screen.dinner_text = canvas.display.text({
		x: - my_travel_route_screen.width / 2 + my_travel_route_screen.width / 20 + my_travel_route_screen.width / 10,
		y:  0.3 * my_travel_route_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 15),
		text: map['dinner'],
		fill: white
	});

	my_travel_route_screen.night_text = canvas.display.text({
		x: - my_travel_route_screen.width / 2 + my_travel_route_screen.width / 20 + my_travel_route_screen.width / 10,
		y: 0.6 * my_travel_route_screen.height / 3,
		origin: { x: 'center', y: 'center' },
		font: get_size_px(canvas, 15),
		text: map['night'],
		fill: white
	});

	if (map_information.planned_route.morning != null){
		my_travel_route_screen.morning_info_text = canvas.display.text({
			x: my_travel_route_screen.width / 40,
			y: -0.6 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			font: get_size_px(canvas, 15),
			text: map_information.planned_route.morning.place.name,
			fill: white
		});

		my_travel_route_screen.morning_pub = canvas.display.image({
			x: my_travel_route_screen.width / 2 - 2.5 * my_travel_route_screen.width / 20,
			y: -0.6 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			width: my_travel_route_screen.height / 11,
			height: my_travel_route_screen.height / 12,
			image: MATERIALS_DIR + map_information.planned_route.morning.transportation.image
		});

		my_travel_route_screen.addChild(my_travel_route_screen.morning_info_text);
		my_travel_route_screen.addChild(my_travel_route_screen.morning_pub);
	}
	

	if (map_information.planned_route.lunch != null){
		my_travel_route_screen.lunch_info_text = canvas.display.text({
			x: my_travel_route_screen.width / 40,
			y: -0.3 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			font: get_size_px(canvas, 15),
			text: map_information.planned_route.lunch.place.name,
			fill: white
		});

		my_travel_route_screen.lunch_pub = canvas.display.image({
			x: my_travel_route_screen.width / 2 - 2.5 * my_travel_route_screen.width / 20,
			y: -0.3 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			width: my_travel_route_screen.height / 11,
			height: my_travel_route_screen.height / 12,
			image: MATERIALS_DIR + map_information.planned_route.lunch.transportation.image
		});

		my_travel_route_screen.addChild(my_travel_route_screen.lunch_info_text);
		my_travel_route_screen.addChild(my_travel_route_screen.lunch_pub);
	}

	if (map_information.planned_route.afternoon != null){
		my_travel_route_screen.afternoon_info_text = canvas.display.text({
			x: my_travel_route_screen.width / 40,
			y: 0 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			font: get_size_px(canvas, 15),
			text: map_information.planned_route.afternoon.place.name,
			fill: white
		});

		my_travel_route_screen.afternoon_pub = canvas.display.image({
			x: my_travel_route_screen.width / 2 - 2.5 * my_travel_route_screen.width / 20,
			y: 0 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			width: my_travel_route_screen.height / 11,
			height: my_travel_route_screen.height / 12,
			image: MATERIALS_DIR + map_information.planned_route.afternoon.transportation.image
		});

		my_travel_route_screen.addChild(my_travel_route_screen.afternoon_info_text);
		my_travel_route_screen.addChild(my_travel_route_screen.afternoon_pub);
	}
	
	if (map_information.planned_route.dinner != null){
		my_travel_route_screen.dinner_info_text = canvas.display.text({
			x: my_travel_route_screen.width / 40,
			y:  0.3 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			font: get_size_px(canvas, 15),
			text: map_information.planned_route.dinner.place.name,
			fill: white
		});

		my_travel_route_screen.dinner_pub = canvas.display.image({
			x: my_travel_route_screen.width / 2 - 2.5 * my_travel_route_screen.width / 20,
			y: 0.3 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			width: my_travel_route_screen.height / 11,
			height: my_travel_route_screen.height / 12,
			image: MATERIALS_DIR + map_information.planned_route.dinner.transportation.image,
		});

		my_travel_route_screen.addChild(my_travel_route_screen.dinner_info_text);
		my_travel_route_screen.addChild(my_travel_route_screen.dinner_pub);
	}

	if (map_information.planned_route.night != null){
		my_travel_route_screen.night_info_text = canvas.display.text({
			x: my_travel_route_screen.width / 40,
			y: 0.6 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			font: get_size_px(canvas, 15),
			text: map_information.planned_route.night.place.name,
			fill: white
		});

		my_travel_route_screen.night_pub = canvas.display.image({
			x: my_travel_route_screen.width / 2 - 2.5 * my_travel_route_screen.width / 20,
			y: 0.6 * my_travel_route_screen.height / 3,
			origin: { x: 'center', y: 'center' },
			width: my_travel_route_screen.height / 11,
			height: my_travel_route_screen.height / 12,
			image: MATERIALS_DIR + map_information.planned_route.night.transportation.image
		});

		my_travel_route_screen.addChild(my_travel_route_screen.night_info_text);
		my_travel_route_screen.addChild(my_travel_route_screen.night_pub);
	}

	my_travel_route_screen.addChild(my_travel_route_screen.morning_text);
	my_travel_route_screen.addChild(my_travel_route_screen.lunch_text);
	my_travel_route_screen.addChild(my_travel_route_screen.afternoon_text);
	my_travel_route_screen.addChild(my_travel_route_screen.dinner_text);
	my_travel_route_screen.addChild(my_travel_route_screen.night_text);
	
    return my_travel_route_screen;
}
