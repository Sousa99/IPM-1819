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

    

    return group_screen
}

function build_group_help_screen(canvas){
    var group_help_screen = build_screen(canvas, descriptions['group_help'], true, true)

	group_help_screen.help_text = build_text(canvas, [- 9 / 20 * group_help_screen.width, 19 / 440 * group_help_screen.height], ['left', 'center'], 'left', get_size_px(canvas, 17), others['help_group'], white)
	group_help_screen.addChild(group_help_screen.help_text)

	return group_help_screen
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
