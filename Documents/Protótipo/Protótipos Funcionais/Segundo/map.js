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
			// TODO
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
			link.push('link_pub');
		}
	
		links = add_lines(canvas, places_list_screen, -1, options, link);
	
	return places_list_screen;
}