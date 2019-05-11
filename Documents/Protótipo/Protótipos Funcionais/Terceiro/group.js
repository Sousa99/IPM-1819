function build_group_screen(canvas){
	var group_screen = build_screen(canvas, descriptions['group'], false, true)
	group_screen.people = []
	group_screen.radius = 100
	
	var number_group = contacts_information.group.length
	contacts_information.back_screen = 'Group'
	
	var circle = build_ellipse(canvas, undefined, group_screen.radius, black, get_size_px(canvas, 5) + ' #34bbed')
	group_screen.addChild(circle)
	
	if (number_group == 1) group_screen.radius = 0
	else if (number_group > 1 ){
		var number = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 75), number_group, '#34bbed')
		group_screen.addChild(number)
	} else {
		var number = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 30), group['empty_group'], '#34bbed')
		group_screen.addChild(number)
	}

    for (contact_index in contacts_information.group) {
		const contact = contacts_information.group[contact_index]

		var x = group_screen.radius * Math.cos((contact_index * 2/number_group + 1/2) * Math.PI)
		var y = group_screen.radius * Math.sin((contact_index * 2/number_group + 1/2) * Math.PI)
		var path_image
		if (contact.image == undefined) path_image = MATERIALS_DIR + '/Person_contacts.png'
		else path_image = MATERIALS_DIR + contact.image

		var square = build_rectangle(canvas, [x, y], [group_screen.width / 6 + 6, group_screen.height / 6 + 6], undefined, '#34bbed', [10, 10, 10, 10])
		var image = build_image(canvas, undefined, [group_screen.width / 6, group_screen.height / 6], undefined, path_image)
		square.angle = (contact_index * 2/number_group + 1/2) * Math.PI
		square.addChild(image)
		group_screen.addChild(square)
		object_clickable(canvas, square)
		square.bind('click tap', function() {
			contacts_information.actual_contact = contact
			changeScreen(canvas, build_contact_screen(canvas))
		})

		group_screen.people.push(square)
	}

	group_screen.help_button = build_image(canvas, [2 / 5 * group_screen.width, 2 / 5 * group_screen.height], [group_screen.width / 10, group_screen.height / 10], undefined, MATERIALS_DIR + '/Help.png')
	group_screen.addChild(group_screen.help_button)
	
	object_clickable(canvas, group_screen.help_button)
	group_screen.help_button.bind('click tap', function() {
		changeScreen(canvas, build_group_help_screen(canvas))
	})

	group_screen.add_button = build_image(canvas, [- 2 / 5 * group_screen.width, 2 / 5 * group_screen.height], [group_screen.width / 10, group_screen.height / 10], undefined, MATERIALS_DIR + '/Add_contact.png')
	group_screen.addChild(group_screen.add_button)
	
	object_clickable(canvas, group_screen.add_button)
	group_screen.add_button.bind('click tap', function() {
		changeScreen(canvas, build_add_contact_group_screen(canvas))
	})

    return group_screen
}

function build_group_help_screen(canvas){
    var group_help_screen = build_screen(canvas, descriptions['group_help'], true, true)

	group_help_screen.help_text = build_text(canvas, [- 9 / 20 * group_help_screen.width, 19 / 440 * group_help_screen.height], ['left', 'center'], 'left', get_size_px(canvas, 17), others['help_group'], white)
	group_help_screen.addChild(group_help_screen.help_text)

	return group_help_screen
}

function build_add_contact_group_screen(canvas) {
	var add_screen = build_screen(canvas, descriptions['group_add'], true, true)

	add_screen.image = build_image(canvas, [0, - add_screen.height / 10], [add_screen.width / 3, add_screen.height / 3], undefined, MATERIALS_DIR + '/Person_contacts.png')
    add_screen.addChild(add_screen.image)

    const contacts_list = contacts_information.contacts_list.sort(function(a, b){
		const name_a = a.name
        const name_b = b.name

        if ( name_a < name_b ) return -1
        if ( name_a > name_b ) return 1
        return 0
    }).filter( function (el) {
		return !contacts_information.group.includes(el)
	})
    
    var options = []
    var link = []
    var profile_pics = []
    for (contact_index in contacts_list) {
        const contact = contacts_list[contact_index]

		options.push(contact.name)
		if (contacts_information.processing.includes(contact)) link.push('link_delete_contact')
        else link.push('link_add_contact')

        if (contact.image != undefined) profile_pics.push(contact.image)
        else profile_pics.push('Person_contacts.png')
    }

    links = add_lines(canvas, add_screen, 0, options, link, profile_pics)
    for (link_index in links) {
        const contact = contacts_list[link_index]
        links[link_index].bind('click tap', function() {
			if (contacts_information.processing.includes(contact))
				contacts_information.processing.splice(contacts_information.processing.indexOf(contact), 1);
			else contacts_information.processing.push(contact)

			changeScreen(canvas, build_add_contact_group_screen(canvas))
        })
	}
	
	var button_color
	if (contacts_information.processing.length != 0) button_color = ['radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', white]
	else button_color = ['radial-gradient(' + '#AAAAAA' + ', ' + '#BCBCBC' + ')', black]

	add_screen.button = build_rectangle(canvas, [0, 25 / 64 * add_screen.height], [7 / 12 * add_screen.width, add_screen.width / 7], undefined, button_color[0], [5, 5, 5, 5])
	add_screen.button_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), group['make_changes'], button_color[1])
	add_screen.button.addChild(add_screen.button_text)
	add_screen.addChild(add_screen.button)
	
	if (contacts_information.processing.length != 0) {
		object_clickable(canvas, add_screen.button)
		add_screen.button.bind('click tap', function() {
			changeScreen(canvas, build_make_changes_screen(canvas))
		})
	}

	return add_screen
}

function build_make_changes_screen(canvas) {
	var make_changes_screen = build_screen(canvas, descriptions['group_make_changes'], true, false)

	make_changes_screen.message = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), group['make_changes_verification'], white)

	make_changes_screen.yes_button = build_rectangle(canvas, [41 / 200 * make_changes_screen.width, 5 / 16 * make_changes_screen.height], [1 / 5 * make_changes_screen.width, 1 / 10 * make_changes_screen.height ], undefined, 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', [5, 5, 5, 5])
	make_changes_screen.no_button = build_rectangle(canvas, [- 41 / 200 * make_changes_screen.width, 5 / 16 * make_changes_screen.height], [1 / 5 * make_changes_screen.width, 1 / 10 * make_changes_screen.height ], undefined, 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')', [5, 5, 5, 5])

	make_changes_screen.yes_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), group['yes'], black)
	make_changes_screen.no_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), group['no'], black)

	make_changes_screen.yes_button.addChild(make_changes_screen.yes_text)
	make_changes_screen.no_button.addChild(make_changes_screen.no_text)
	make_changes_screen.addChild(make_changes_screen.yes_button)
	make_changes_screen.addChild(make_changes_screen.no_button)
	make_changes_screen.addChild(make_changes_screen.message)

	object_clickable(canvas, make_changes_screen.yes_button)
	make_changes_screen.yes_button.bind('click tap', function() {
		for (contact_index in contacts_information.processing)
			contacts_information.processing[contact_index].on_group = true

		contacts_information.group = contacts_information.group.concat(contacts_information.processing)
		contacts_information.processing = []
        changeScreen(canvas, build_group_screen(canvas))
	})

	object_clickable(canvas, make_changes_screen.no_button)
	make_changes_screen.no_button.bind('click tap', function() {
		changeScreen(canvas, build_add_contact_group_screen(canvas))
	})

    return make_changes_screen
}

function build_see_and_edit_group_screen(canvas){
    var see_and_edit_group_screen = build_screen(canvas, descriptions['see_and_edit_group'], true, true)

    
    see_and_edit_group_screen.see_and_edit_group_help_button = build_image(canvas, [2 / 5 * see_and_edit_group_screen.width, 2 / 5 * see_and_edit_group_screen.height], [see_and_edit_group_screen.width / 10, see_and_edit_group_screen.height / 10], undefined, MATERIALS_DIR + '/Help.png')
	see_and_edit_group_screen.circle_help_button = build_ellipse(canvas, [2 / 5 * see_and_edit_group_screen.width, 2 / 5 * see_and_edit_group_screen.height], see_and_edit_group_screen.width / 15, black)

    var options = [ group['see_group'], group['edit_group'] ]
	var link = [ 'link_arrow', 'link_arrow' ]

	links = add_lines(canvas, see_and_edit_group_screen, -1, options, link, images)

	object_clickable(canvas, links[0])
	links[0].bind('click tap', function() {
		changeScreen(canvas, build_group_screen(canvas))
	})
	
	object_clickable(canvas, links[1])
	links[1].bind('click tap', function() {
		changeScreen(canvas, build_edit_group_screen(canvas))
    })
    
    object_clickable(canvas, see_and_edit_group_screen.see_and_edit_group_help_button)
	see_and_edit_group_screen.see_and_edit_group_help_button.bind('click tap', function() {
		changeScreen(canvas, build_group_help_screen(canvas))
    })
    
    see_and_edit_group_screen.addChild(see_and_edit_group_screen.circle_help_button)
    see_and_edit_group_screen.addChild(see_and_edit_group_screen.see_and_edit_group_help_button)
    
    //falta: sharing location
	
    return see_and_edit_group_screen
}

function build_edit_group_screen(canvas){
    var edit_group_screen = build_screen(canvas, descriptions['edit_group'], false, true)

    var options = [ group['contact_1'], group['contact_2'], group['contact_3'], group['add_contact'],  ]
	var link = [ 'link_delete_contact', 'link_delete_contact', 'link_delete_contact', 'link_add_contact' ]
	var images = [ 'Group.png', 'Group.png', 'Group.png', 'Group.png' ]

	links = add_lines(canvas, group_screen, -1, options, link, images)
    return edit_group_screen
}
