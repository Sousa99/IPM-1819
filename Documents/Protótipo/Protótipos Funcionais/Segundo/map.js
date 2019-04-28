var map_initialized
var clicked

var routes = {
	'actual_location': {}
}

function onClickButtonList() { clicked = true }

function build_map_type_selection_screen(canvas) {
	var map_type_selection_screen = build_screen(canvas, descriptions['map_type_selection'], true, true)

	var line_separating = build_line(canvas, [- 11 / 40 * map_type_selection_screen.width, map_type_selection_screen.height / 10], [11 / 40 * map_type_selection_screen.width, map_type_selection_screen.height / 10], get_size_px(canvas, 2) + ' ' + white)
	map_type_selection_screen.addChild(line_separating)

	var line_separating = build_line(canvas, [0, - 7 / 40 * map_type_selection_screen.height], [0, 3 / 8 * map_type_selection_screen.height], get_size_px(canvas, 2) + ' ' + white)
	map_type_selection_screen.addChild(line_separating)

	map_type_selection_screen.food_beverage = build_image(canvas, [- map_type_selection_screen.width / 7, - 23 / 380 * map_type_selection_screen.height], [4 / 19 * map_type_selection_screen.width, 4 / 19 * map_type_selection_screen.height], undefined, MATERIALS_DIR + '/Food-Beverage.png')
	map_type_selection_screen.accomodation = build_image(canvas, [map_type_selection_screen.width / 6, - 23 / 380 * map_type_selection_screen.height], [4 / 19 * map_type_selection_screen.width, 4 / 19 * map_type_selection_screen.height], undefined, MATERIALS_DIR + '/Accomodation.png')
	map_type_selection_screen.tourism = build_image(canvas, [- map_type_selection_screen.width / 6, 99 / 380 * map_type_selection_screen.height], [4 / 19 * map_type_selection_screen.width, 4 / 19 * map_type_selection_screen.height], undefined, MATERIALS_DIR + '/Tourism.png')
	map_type_selection_screen.travel_route = build_image(canvas, [map_type_selection_screen.width / 6, 99 / 380 * map_type_selection_screen.height], [4 / 19* map_type_selection_screen.width, 4 / 19 * map_type_selection_screen.height], undefined, MATERIALS_DIR + '/Travel-Route.png')
    
    map_type_selection_screen.addChild(map_type_selection_screen.food_beverage)
    map_type_selection_screen.addChild(map_type_selection_screen.accomodation)
    map_type_selection_screen.addChild(map_type_selection_screen.tourism)
    map_type_selection_screen.addChild(map_type_selection_screen.travel_route)

	object_clickable(canvas, map_type_selection_screen.food_beverage)
    map_type_selection_screen.food_beverage.bind('click tap', function() {
		map_information.type_selected = 'food_beverage'
		changeScreen(canvas, build_map_screen(canvas))
	})

	object_clickable(canvas, map_type_selection_screen.accomodation)
    map_type_selection_screen.accomodation.bind('click tap', function() {
		map_information.type_selected = 'accomodation'
		changeScreen(canvas, build_map_screen(canvas))
	})

	object_clickable(canvas, map_type_selection_screen.tourism)
    map_type_selection_screen.tourism.bind('click tap', function() {
		map_information.type_selected = 'tourism'
		changeScreen(canvas, build_map_screen(canvas))
	})

	object_clickable(canvas, map_type_selection_screen.travel_route)
    map_type_selection_screen.travel_route.bind('click tap', function() {
		changeScreen(canvas, build_my_travel_route_screen(canvas))
	})

    return map_type_selection_screen
}

function build_map_screen(canvas, place_selected, route = false) {
	var map_screen = build_screen(canvas, descriptions['map'], false, false)
	var center = map_information.actual_location

	if (place_selected != undefined) center = place_selected.location
	
	// Adjustment of container of the map
	var map_html = document.getElementById('mapid')
	map_html.style.height = (SIZE_SCREEN + 1) + 'px'
	map_html.style.width = (SIZE_SCREEN + 1) + 'px'
	map_html.style.display = 'block'
	
	// Initialization of the map itself
	map_initialized = L.map('mapid', {
        attributionControl: false,
        center: center,
        zoom: 14,
        minZoom: 4,
        maxZoom: 18,
        zoomControl: false
	})
	
	// layer of the map itself, needs to load various files!
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		maxZoom: 18,
		minZoom: 4,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1Ijoic291c2E5OSIsImEiOiJjanVoYXI3ODcwcW05NDNvM2phNnB3eGF6In0.4u5Q1HN3FiTISIBO2RdR_A'
	}).addTo(map_initialized)

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
	L.marker(map_information.actual_location).addTo(map_initialized)
	L.control.scale({
		metric: true,
		imperial: true
	}).addTo(map_initialized)

	var places_marker = []
	if (place_selected == undefined && !route) {
		var button_html = document.getElementById('button_place_list')
		button_html.style.display = 'block'

		// Adding the various places according to the category chosen by the user
		const places = map_information[map_information.type_selected]
		for (place in places) {
				var marker = L.marker(places[place].location, {icon: place_icon})
				marker.bindPopup('<b>' + places[place].name + '</b><br>' + places[place].description[language])
				places_marker.push(marker)
		}
		
		map_initialized.on('zoomend', function() {
			if (map_initialized.getZoom() < 9) map_initialized.removeLayer(places_marker_layer)
			else map_initialized.addLayer(places_marker_layer)
		})
	
	} else if (route) {
		const planned_route = map_information.planned_route
		var waypoints = [map_information.actual_location]

		var button_html = document.getElementById('button_place_list')
		button_html.style.display = 'none'
		map_information.showing_route = true

		for (index in Object.keys(planned_route)) {
			const time_name = Object.keys(planned_route)[index]
			const time = planned_route[time_name]
			
			if (time != null){
				const place = time.place
				
				var marker = L.marker(place.location, {icon: place_icon})
				marker.bindPopup('<b>' + place.name + '</b><br>' + place.description[language])
				places_marker.push(marker)

				waypoints.push(place.location)
			}
		}

		var router = L.Routing.control({
			waypoints: waypoints,
			createMarker: function() { return null },
			fitSelectedRoutes: 'true'
		}).addTo(map_initialized)
		router.hide()

	} else {
		var button_html = document.getElementById('button_place_list')
		button_html.style.display = 'none'

		var marker = L.marker(place_selected.location, {icon: place_icon})
		marker.bindPopup('<b>' + place_selected.name + '</b><br>' + place_selected.description[language])
		places_marker.push(marker)

		var router = L.Routing.control({
			waypoints: [
				map_information.actual_location,
				place_selected.location
			],
			
			createMarker: function() { return null },
			fitSelectedRoutes: 'true'
		})

		router.addTo(map_initialized)
		router.hide()

		// Trying to save information
		routes['actual_location'][place_selected.name] = router
		console.log(routes)
	}

	var places_marker_layer = L.layerGroup(places_marker)
	places_marker_layer.addTo(map_initialized)
	
	clicked = false

	return map_screen
}

function build_places_list_screen(canvas) {
	var places_list_screen = build_screen(canvas, descriptions['places_list'], true, true)

	places_list_screen.places_list_help_button = build_image(canvas, [2 / 5 * places_list_screen.width, 2 / 5 * places_list_screen.height], [places_list_screen.width / 10, places_list_screen.height / 10], undefined, MATERIALS_DIR + '/Help.png')
	places_list_screen.circle_places_list_help_button = build_ellipse(canvas, [2 / 5 * places_list_screen.width, 2 / 5 * places_list_screen.height], places_list_screen.width / 15, black)
	
	object_clickable(canvas, places_list_screen.places_list_help_button)
	places_list_screen.places_list_help_button.bind('click tap', function() {
		changeScreen(canvas, build_places_help_screen(canvas))
	})
	
	const places = map_information[map_information.type_selected].sort(function(a, b){
		const distance_a = L.latLng(a.location).distanceTo(L.latLng(map_information.actual_location))
		const distance_b = L.latLng(b.location).distanceTo(L.latLng(map_information.actual_location))
		return distance_a - distance_b
	})

    var options = []
    var link = []
    for (place in places) {
        options.push(places[place].name)
        link.push('link_arrow')
    }

    links = add_lines(canvas, places_list_screen, -2, options, link)
    for (link in links) {
        const place = places[link]
        links[link].bind('click tap', function() {
            map_information.info_place = place
            map_information.info_place_time = 0
            map_information.info_place_transportation = 0
            changeScreen(canvas, build_place_information_screen(canvas))
        })
	}
	
	places_list_screen.addChild(places_list_screen.places_list_help_button)

	return places_list_screen
}

function build_places_help_screen(canvas) {
	var places_list_help_screen = build_screen(canvas, descriptions['places_help'], true, true)

	places_list_help_screen.help_text = build_text(canvas, [- 9 / 20 * places_list_help_screen.width, 19 / 440 * places_list_help_screen.height], ['left', 'center'], 'left', get_size_px(canvas, 17), others['help_places'], white)
	places_list_help_screen.addChild(places_list_help_screen.help_text)

	return places_list_help_screen
}

function build_place_information_screen(canvas) {
	var place_information_screen = build_screen(canvas, descriptions['place_information'], false, false)

	const place = map_information.info_place
	var name = build_text(canvas, [0, - 3 / 8 * SIZE_SCREEN], undefined, undefined, get_size_px(canvas, 19), place.name, white)
	place_information_screen.addChild(name)
	
	const deviation_transportation = (map_information.info_place_transportation * 243) % 184
	const distance_to_place = Math.floor(L.latLng(place.location).distanceTo(L.latLng(map_information.actual_location))) + deviation_transportation

	var distance_text
	if (distance_to_place < 1000) distance_text = distance_to_place + ' m'
	else distance_text = distance_to_place / 1000 + ' Km'

    var options = [map.description, map.distance, map.time, map.transportation]
    var link = ['text', 'text', 'link_text', 'link_pub']
    var info = [place.description[language], distance_text, null, null]

    links = add_lines(canvas, place_information_screen, -2, options, link, null, info)

	if (map_information.type_selected != 'accomodation')
		links[0].bind('click tap', function() {
			const text_array = map_information.times[map_information.type_selected]

			map_information.info_place_time = (map_information.info_place_time + 1) % text_array.length
			changeScreen(canvas, build_place_information_screen(canvas))
		})
	
    links[1].bind('click tap', function() {
		var limit = map_information.transportations.length
		if (distance_to_place < 700) limit = 2
		else if (distance_to_place < 4000) limit = 5

        map_information.info_place_transportation = (map_information.info_place_transportation + 1) % limit
        changeScreen(canvas, build_place_information_screen(canvas))
    })

	place_information_screen.map_button = build_rectangle(canvas, [- 41 / 200 * place_information_screen.width, 5 / 16 * place_information_screen.height], [2 / 5 * place_information_screen.width, 1 / 5 * place_information_screen.height ], undefined, 'radial-gradient(' + white + ', ' + '#1f6ca2' + ')', [5, 0, 5, 0])
	place_information_screen.add_route_button = build_rectangle(canvas, [41 / 200 * place_information_screen.width, 5 / 16 * place_information_screen.height], [2 / 5 * place_information_screen.width, 1 / 5 * place_information_screen.height ], undefined, 'radial-gradient(' + white + ', ' + '#a39a20' + ')', [0, 5, 0, 5])

	place_information_screen.map_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), map.map, black)
	place_information_screen.add_route_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), map.add_route, black)

	object_clickable(canvas, place_information_screen.add_route_button)
    place_information_screen.add_route_button.bind('click tap', function() {
		changeScreen(canvas, build_changed_travel_route_screen(canvas))
	})

	object_clickable(canvas, place_information_screen.map_button)
    place_information_screen.map_button.bind('click tap', function() {
		changeScreen(canvas, build_map_screen(canvas, place))
	})

    place_information_screen.map_button.addChild(place_information_screen.map_text)
    place_information_screen.add_route_button.addChild(place_information_screen.add_route_text)
    place_information_screen.addChild(place_information_screen.map_button)
    place_information_screen.addChild(place_information_screen.add_route_button)

	return place_information_screen
}

function build_changed_travel_route_screen(canvas) {
	var changed_travel_route_screen = build_screen(canvas, descriptions['changed_travel_route'], true, false)

	changed_travel_route_screen.message = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), map['changed_travel_route'], white)

	changed_travel_route_screen.yes_button = build_rectangle(canvas, [41 / 200 * changed_travel_route_screen.width, 5 / 16 * changed_travel_route_screen.height], [1 / 5 * changed_travel_route_screen.width, 1 / 10 * changed_travel_route_screen.height ], undefined, 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', [5, 5, 5, 5])
	changed_travel_route_screen.no_button = build_rectangle(canvas, [- 41 / 200 * changed_travel_route_screen.width, 5 / 16 * changed_travel_route_screen.height], [1 / 5 * changed_travel_route_screen.width, 1 / 10 * changed_travel_route_screen.height ], undefined, 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')', [5, 5, 5, 5])

	changed_travel_route_screen.yes_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), map['yes'], black)
	changed_travel_route_screen.no_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), map['no'], black)

	changed_travel_route_screen.yes_button.addChild(changed_travel_route_screen.yes_text)
	changed_travel_route_screen.no_button.addChild(changed_travel_route_screen.no_text)
	changed_travel_route_screen.addChild(changed_travel_route_screen.yes_button)
	changed_travel_route_screen.addChild(changed_travel_route_screen.no_button)
	changed_travel_route_screen.addChild(changed_travel_route_screen.message)

	object_clickable(canvas, changed_travel_route_screen.yes_button)
	changed_travel_route_screen.yes_button.bind('click tap', function() {
		const place = map_information.info_place
		const time = map_information.times[map_information.type_selected][map_information.info_place_time]
		const method_transportation = map_information.transportations[map_information.info_place_transportation]

		map_information.planned_route[time.description] = {
			place: place,
			transportation: method_transportation
		}

		changeScreen(canvas, build_map_type_selection_screen(canvas))
	})

	object_clickable(canvas, changed_travel_route_screen.no_button)
	changed_travel_route_screen.no_button.bind('click tap', function() {
		changeScreen(canvas, build_place_information_screen(canvas))
	})

	return changed_travel_route_screen
}

function build_my_travel_route_screen(canvas) {
	var my_travel_route_screen = build_screen(canvas, descriptions['my_travel_route'], true, true)
	
	my_travel_route_screen.my_travel_route_screen_history_button = build_image(canvas, [2 / 5 * my_travel_route_screen.width, 2 / 5 * my_travel_route_screen.height], [my_travel_route_screen.width / 10, my_travel_route_screen.height / 10], undefined, MATERIALS_DIR + '/History.png')
	object_clickable(canvas, my_travel_route_screen.my_travel_route_screen_history_button)
	my_travel_route_screen.my_travel_route_screen_history_button.bind('click tap', function() {
		changeScreen(canvas, build_history_screen(canvas))
	})
	
	const planned_route = map_information.planned_route
	const lines = Object.keys(planned_route).length
	const startpoint = -2

    for (var i = 0; i < lines + 1; i++) {
		var line = build_line(canvas, [- 9 / 20 * my_travel_route_screen.width, (i + startpoint - 0.5) * my_travel_route_screen.height / 10], [9 / 20 * my_travel_route_screen.width, (i + startpoint - 0.5) * my_travel_route_screen.height / 10])
        my_travel_route_screen.addChild(line)
    }
	
	var line = build_line(canvas, [- my_travel_route_screen.width / 4, (startpoint - 0.9) * my_travel_route_screen.height / 10], [- my_travel_route_screen.width / 4, (lines + startpoint - 0.1) * my_travel_route_screen.height / 10])
    my_travel_route_screen.addChild(line)
    
	var line = build_line(canvas, [3 / 10 * my_travel_route_screen.width, (startpoint - 0.9) * my_travel_route_screen.height / 10], [3 / 10 * my_travel_route_screen.width, (lines + startpoint - 0.1) * my_travel_route_screen.height / 10])
	my_travel_route_screen.addChild(line)

	for (index in Object.keys(planned_route)) {
		const time_name = Object.keys(planned_route)[index]
		const time = planned_route[time_name]
		
		time_text = build_text(canvas, [- 7 / 20 * my_travel_route_screen.width, (index - 2) / 10 * my_travel_route_screen.height], undefined, undefined, get_size_px(canvas, 15), map[time_name], white)
		my_travel_route_screen.addChild(time_text)

		if (map_information.planned_route[time_name] != null){
			name_place = build_text(canvas, [my_travel_route_screen.width / 40, (index - 2) / 10 * my_travel_route_screen.height], undefined, undefined, get_size_px(canvas, 15), time.place.name, white)
			transportation = build_image(canvas, [3 / 8 * my_travel_route_screen.width, (index - 2) / 10 * my_travel_route_screen.height], [my_travel_route_screen.width / 11, my_travel_route_screen.height / 12], undefined, MATERIALS_DIR + time.transportation.image)
			
			my_travel_route_screen.addChild(name_place)
			my_travel_route_screen.addChild(transportation)
		}
	}

	my_travel_route_screen.map_button = build_rectangle(canvas, [0, 25 / 64 * my_travel_route_screen.height], [7 / 12 * my_travel_route_screen.width, my_travel_route_screen.width / 7], undefined, 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', [5, 5, 5, 5])
	my_travel_route_screen.map_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), map['show_map'], white)
	my_travel_route_screen.map_button.addChild(my_travel_route_screen.map_text)
	my_travel_route_screen.addChild(my_travel_route_screen.map_button)

	object_clickable(canvas, my_travel_route_screen.map_button)
	my_travel_route_screen.map_button.bind('click tap', function() {
		changeScreen(canvas, build_map_screen(canvas, undefined, true))
	})

	my_travel_route_screen.addChild(my_travel_route_screen.my_travel_route_screen_history_button)
	
    return my_travel_route_screen
}

function build_history_screen(canvas) {
	var history_screen = build_screen(canvas, descriptions['places_history'], true, true)
	const trips = map_information.trips

	const lines = trips.length
	const startpoint = -2

    for (var i = 0; i < lines + 1; i++) {
		var line = build_line(canvas, [- 9 / 20 * history_screen.width, (i + startpoint - 0.5) * history_screen.height / 10], [9 / 20 * history_screen.width, (i + startpoint - 0.5) * history_screen.height / 10])
        history_screen.addChild(line)
    }
	
	var line = build_line(canvas, [2 / 11 * history_screen.width, (startpoint - 0.9) *history_screen.height / 10],  [2 / 11 * history_screen.width, (lines + startpoint - 0.1) * history_screen.height / 10])
	history_screen.addChild(line)
	
	for (index in trips) {
		const place_name = trips[index].place
		const time = trips[index].date[language]

		console.log(place_name)
		console.log(time)

		name_place = build_text(canvas, [- 9 / 20 * history_screen.width, (index - 2) / 10 * history_screen.height], ['left', 'center'], 'left', get_size_px(canvas, 15), place_name, white)
		date = build_text(canvas, [9 / 20 * history_screen.width, (index - 2) / 10 * history_screen.height], ['right', 'center'], 'right', get_size_px(canvas, 15), time, white)
		
		history_screen.addChild(name_place)
		history_screen.addChild(date)
	}

	return history_screen
}
