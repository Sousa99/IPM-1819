function build_contacts_screen(canvas){
    var contacts_screen = build_screen(canvas, descriptions['contacts'], true, true)
    contacts_screen.max_shown = 5

    if(contacts_information.index < 0){
        contacts_information.index = 0
    } else if(contacts_information.index > contacts_information.contacts_list.length - actual_screen.max_shown){
        contacts_information.index = contacts_information.contacts_list.length - actual_screen.max_shown
    }

    contacts_information.back_screen = 'Contacts'

    contacts_screen.image = build_image(canvas, [0, - contacts_screen.height / 10], [contacts_screen.width / 3, contacts_screen.height / 3], undefined, MATERIALS_DIR + '/Person_contacts.png')
    contacts_screen.addChild(contacts_screen.image)


    const contacts_list = contacts_information.contacts_list.sort(function(a, b){

		const name_a = a.name
        const name_b = b.name

        if ( name_a < name_b ) return -1
        if ( name_a > name_b ) return 1
        return 0
    })
    
    var options = []
    var link = []
    var profile_pics = []
    for (var i = 0; i < contacts_screen.max_shown; i++) {
        const contact = contacts_list[i + Math.floor(contacts_information.index)]

        options.push(contact.name)
        link.push('link_arrow')

        if (contact.image != undefined) profile_pics.push(contact.image)
        else profile_pics.push('Person_contacts.png')
    }

    links = add_lines(canvas, contacts_screen, 0, options, link, profile_pics)
    for (link_index in links) {
        const contact = contacts_list[Number(link_index) + Math.floor(contacts_information.index)]
        links[link_index].bind('click tap', function() {
            contacts_information.actual_contact = contact
            changeScreen(canvas, build_contact_screen(canvas))
        })
    }

    return contacts_screen
}

function build_contact_screen(canvas) {
    var contact_screen = build_screen(canvas, descriptions['contact'], false, true)
    var contact = contacts_information.actual_contact

    if (contact.image == undefined) contact.image = 'Person_contacts.png'

    contact_screen.image = build_image(canvas, [0, - contact_screen.height / 5], [contact_screen.width / 2.5, contact_screen.height / 2.5], undefined, MATERIALS_DIR + '/' + contact.image)
    contact_screen.addChild(contact_screen.image)


    if (contact.sharing == 'contacts' || (contact.sharing == 'group' && contact.on_group)) {
        contact_screen.location_image_button = build_image(canvas, [contact_screen.width /2.5, - contact_screen.height / 3], [contact_screen.width / 8, contact_screen.height / 8], undefined, MATERIALS_DIR + '/Location_point.png')
        contact_screen.addChild(contact_screen.location_image_button)

        object_clickable(canvas, contact_screen.location_image_button)
	    contact_screen.location_image_button.bind('click tap', function() {
		    changeScreen(canvas, build_map_contact_screen(canvas))
	    })
    }

    var options = [undefined, undefined, undefined] // contacts['name'], contacts['phone'], contacts['birthday']
    var link = ['text', 'text', 'text']
    var info = [ contact.fullname, contact.phone, contact.birthday.abbrev]

	links = add_lines(canvas, contact_screen, 0, options, link, undefined, info)
    
    var button_charactheristics
    if (contact.on_group) button_charactheristics = {text: contacts.remove_contact_group, colour: 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')'}
    else button_charactheristics = {text: contacts.add_contact_group, colour: 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')'}

    contact_screen.button = build_rectangle(canvas, [0, 25 / 64 * contact_screen.height], [7 / 12 * contact_screen.width, contact_screen.width / 7], undefined, button_charactheristics.colour, [5, 5, 5, 5])
	contact_screen.button_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), button_charactheristics.text, white)
	contact_screen.button.addChild(contact_screen.button_text)
    contact_screen.addChild(contact_screen.button)
    
    object_clickable(canvas, contact_screen.button)
    contact_screen.button.bind('click tap', function() {
        if (contact.on_group) changeScreen(canvas, build_remove_group_contact_screen(canvas))
        else changeScreen(canvas, build_add_group_contact_screen(canvas))
    })

    return contact_screen
}

function build_add_group_contact_screen(canvas) {
	var add_group_contact_screen = build_screen(canvas, descriptions['add_contact_group'], true, false)

	add_group_contact_screen.message = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), contacts['add_contact_group_verification'], white)

	add_group_contact_screen.yes_button = build_rectangle(canvas, [41 / 200 * add_group_contact_screen.width, 5 / 16 * add_group_contact_screen.height], [1 / 5 * add_group_contact_screen.width, 1 / 10 * add_group_contact_screen.height ], undefined, 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', [5, 5, 5, 5])
	add_group_contact_screen.no_button = build_rectangle(canvas, [- 41 / 200 * add_group_contact_screen.width, 5 / 16 * add_group_contact_screen.height], [1 / 5 * add_group_contact_screen.width, 1 / 10 * add_group_contact_screen.height ], undefined, 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')', [5, 5, 5, 5])

	add_group_contact_screen.yes_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), contacts['yes'], black)
	add_group_contact_screen.no_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), contacts['no'], black)

	add_group_contact_screen.yes_button.addChild(add_group_contact_screen.yes_text)
	add_group_contact_screen.no_button.addChild(add_group_contact_screen.no_text)
	add_group_contact_screen.addChild(add_group_contact_screen.yes_button)
	add_group_contact_screen.addChild(add_group_contact_screen.no_button)
	add_group_contact_screen.addChild(add_group_contact_screen.message)

	object_clickable(canvas, add_group_contact_screen.yes_button)
	add_group_contact_screen.yes_button.bind('click tap', function() {
        var index =  contacts_information.contacts_list.indexOf(contacts_information.actual_contact)
        contacts_information.contacts_list[index].on_group = true

        contacts_information.group.push(contacts_information.actual_contact)
		if (contacts_information.back_screen == 'Group')
            changeScreen(canvas, build_group_screen(canvas))
        else if (contacts_information.back_screen == 'Contacts')
            changeScreen(canvas, build_contacts_screen(canvas))
	})

	object_clickable(canvas, add_group_contact_screen.no_button)
	add_group_contact_screen.no_button.bind('click tap', function() {
		changeScreen(canvas, build_contact_screen(canvas))
	})

    return add_group_contact_screen
}

function build_map_contact_screen(canvas) {
    var map_screen = build_screen(canvas, descriptions['map_contact'], false, false)
	var center = map_information.actual_location
	
	// Adjustment of container of the map
	var map_html = document.getElementById('mapid')
	map_html.style.height = (SIZE_SCREEN + 1) + 'px'
	map_html.style.width = (SIZE_SCREEN + 1) + 'px'
	map_html.style.display = 'block'
	
	// Initialization of the map itself
	map_initialized = L.map('mapid', {
		attributionControl: false,
		center: center,
		zoom: 15,
        minZoom: 8,
        maxZoom: 16,
		zoomControl: false,
		maxBoundsViscosity: 0.85
	})

	map_initialized.setView(center, 8)
	map_initialized.setMaxBounds(map_initialized.getBounds())
	map_initialized.setView(center, 15)

	L.tileLayer(MATERIALS_DIR + '/Map/Google Maps/{z}/{x}/{y}.png', {
		maxZoom: 16,
		minZoom: 4,  
	}).addTo(map_initialized);

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
    var button_html = document.getElementById('button_place_list')
    button_html.style.display = 'none'
    var button_html = document.getElementById('button_map_help')
    button_html.style.display = 'none'

    var marker = L.marker(contacts_information.actual_contact.location, {icon: place_icon})
    places_marker.push(marker)

    var router = L.Routing.control({
        waypoints: [
            map_information.actual_location,
            contacts_information.actual_contact.location
        ],
        
        createMarker: function() { return null },
        fitSelectedRoutes: 'true'
    })

    router.addTo(map_initialized)
    router.hide()

    var places_marker_layer = L.layerGroup(places_marker)
	places_marker_layer.addTo(map_initialized)

	return map_screen
}