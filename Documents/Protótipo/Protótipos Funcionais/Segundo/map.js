var map_initialized
var clicked

function onClickButtonList() { clicked = true }
function onClickButtonHelp() { clicked = true }

function build_map_type_selection_screen(canvas) {
	var map_type_selection_screen = build_screen(canvas, descriptions['map_type_selection'], true, true)

	var line_separating = build_line(canvas, [- 11 / 40 * map_type_selection_screen.width, map_type_selection_screen.height / 10], [11 / 40 * map_type_selection_screen.width, map_type_selection_screen.height / 10], get_size_px(canvas, 2) + ' ' + white)
	map_type_selection_screen.addChild(line_separating)

	var line_separating = build_line(canvas, [0, - 7 / 40 * map_type_selection_screen.height], [0, 3 / 8 * map_type_selection_screen.height], get_size_px(canvas, 2) + ' ' + white)
	map_type_selection_screen.addChild(line_separating)

	map_type_selection_screen.food_beverage = build_image(canvas, [- map_type_selection_screen.width / 7, - 23 / 380 * map_type_selection_screen.height], [4 / 19 * map_type_selection_screen.width, 4 / 19 * map_type_selection_screen.height], undefined, MATERIALS_DIR + '/Food-Beverage.png')
	map_type_selection_screen.accomodation = build_image(canvas, [map_type_selection_screen.width / 6, - 23 / 380 * map_type_selection_screen.height], [4 / 19 * map_type_selection_screen.width, 4 / 19 * map_type_selection_screen.height], undefined, MATERIALS_DIR + '/Accomodation.png')
	map_type_selection_screen.tourism = build_image(canvas, [- map_type_selection_screen.width / 6, 99 / 380 * map_type_selection_screen.height], [4 / 19 * map_type_selection_screen.width, 4 / 19 * map_type_selection_screen.height], undefined, MATERIALS_DIR + '/Tourism.png')
	map_type_selection_screen.travel_route = build_image(canvas, [map_type_selection_screen.width / 5, 99 / 380 * map_type_selection_screen.height], [4 / 19 * map_type_selection_screen.width, 4 / 19 * map_type_selection_screen.height], undefined, MATERIALS_DIR + '/Travel-Route.png')
    
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

function build_map_screen(canvas) {
	var map_screen = build_screen(canvas, descriptions['map'], false, false)

	
	// Adjustment of container of the map
	var map_html = document.getElementById('mapid')
	map_html.style.height = (SIZE_SCREEN + 1) + 'px'
	map_html.style.width = (SIZE_SCREEN + 1) + 'px'
	map_html.style.display = 'block'
	
	// Initialization of the map itself
	map_initialized = L.map('mapid', {
        attributionControl: false,
        center: map_information.actual_location,
        zoom: 15,
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
	/*
	L.tileLayer('../../../../Materials/Map/Tiles/{z}/{x}/{y}.png', {
			maxZoom: 15,
			minZoom: 4
	}).addTo(map_initialized)*/

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

	// Adding the various places according to the category chosen by the user
	const places = map_information[map_information.type_selected]
	var places_marker = []
	for (place in places) {
			var marker = L.marker(places[place].location, {icon: place_icon})
			marker.bindPopup('<b>' + places[place].name + '</b><br>' + places[place].description[language])
			places_marker.push(marker)
	}

	var places_marker_layer = L.layerGroup(places_marker)
	places_marker_layer.addTo(map_initialized)

	// Only testing out routing to see if it works and its limits!
	var router = L.Routing.control({
		waypoints: [
			L.latLng(map_information.actual_location[0], map_information.actual_location[1]),
			L.latLng(places[0].location[0], places[0].location[1])
		],

		createMarker: function() { return null }
	}).addTo(map_initialized)
	router.hide()
	
	clicked = false

	return map_screen
}

function build_places_list_screen(canvas) {
	var places_list_screen = build_screen(canvas, descriptions['places_list'], true, false)

	places_list_screen.places_list_help_button = build_image(canvas, [2 / 5 * places_list_screen.width, 2 / 5 * places_list_screen.height], [places_list_screen.width / 10, places_list_screen.height / 10], undefined, MATERIALS_DIR + '/Help.png')
	places_list_screen.circle_places_list_help_button = build_ellipse(canvas, [2 / 5 * places_list_screen.width, 2 / 5 * places_list_screen.height], places_list_screen.width / 15, black)
	
	object_clickable(canvas, places_list_screen.places_list_help_button)
	places_list_screen.places_list_help_button.bind('click tap', function() {
		changeScreen(canvas, build_places_help_screen(canvas))
	})
	
	const places = map_information[map_information.type_selected]
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

    var options = [map.description, map.location, map.time, map.transportation]
    var link = ['text', 'text', 'link_text', 'link_pub']
    var info = [place.description[language], place.location, null, null]

    links = add_lines(canvas, place_information_screen, -2, options, link, null, info)

    links[0].bind('click tap', function() {
        const text_array = map_information.times[map_information.type_selected]

        map_information.info_place_time = (map_information.info_place_time + 1) % text_array.length
        changeScreen(canvas, build_place_information_screen(canvas))
    })
    links[1].bind('click tap', function() {
        map_information.info_place_transportation = (map_information.info_place_transportation + 1) % map_information.transportations.length
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
		changeScreen(canvas, build_map_screen(canvas))
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
	var my_travel_route_screen = build_screen(canvas, descriptions['my_travel_route'], true, false)
	
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
	
    return my_travel_route_screen
}
