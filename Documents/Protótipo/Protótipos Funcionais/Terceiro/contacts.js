function build_contacts_screen(canvas){
    var contacts_screen = build_screen(canvas, descriptions['contacts'], true, true)

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
    for (contact_index in contacts_list) {
        const contact = contacts_list[contact_index]

        options.push(contact.name)
        link.push('link_arrow')

        if (contact.image != undefined) profile_pics.push(contact.image)
        else profile_pics.push('Person_contacts.png')
    }

    links = add_lines(canvas, contacts_screen, 0, options, link, profile_pics)
    for (link_index in links) {
        const contact = contacts_list[link_index]
        links[link_index].bind('click tap', function() {
            contacts_information.actual_contact = contact
            changeScreen(canvas, build_contact_screen(canvas))
        })
    }

    return contacts_screen
}

function build_contact_screen(canvas) {
    var contact_screen = build_screen(canvas, descriptions['contact'], true, true)
    var contact = contacts_information.actual_contact

    if (contact.image == undefined) contact.image = 'Person_contacts.png'

    contact_screen.image = build_image(canvas, [0, - contact_screen.height / 10], [contact_screen.width / 3, contact_screen.height / 3], undefined, MATERIALS_DIR + '/' + contact.image)
    contact_screen.addChild(contact_screen.image)

    var options = [undefined, undefined, undefined]//[ contacts['name'], contacts['phone'], contacts['birthday'],  ]
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
    contact_screen.bind('click tap', function() {
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
		changeScreen(canvas, build_contacts_screen(canvas))
	})

	object_clickable(canvas, add_group_contact_screen.no_button)
	add_group_contact_screen.no_button.bind('click tap', function() {
		changeScreen(canvas, build_place_information_screen(canvas))
	})

    return add_group_contact_screen
}

function build_remove_group_contact_screen(canvas) {
	var remove_group_contact_screen = build_screen(canvas, descriptions['remove_contact_group'], true, false)

	remove_group_contact_screen.message = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 17), contacts['remove_contact_group_verification'], white)

	remove_group_contact_screen.yes_button = build_rectangle(canvas, [41 / 200 * remove_group_contact_screen.width, 5 / 16 * remove_group_contact_screen.height], [1 / 5 * remove_group_contact_screen.width, 1 / 10 * remove_group_contact_screen.height ], undefined, 'radial-gradient(' + '#55AA55' + ', ' + '#2bbc2b' + ')', [5, 5, 5, 5])
	remove_group_contact_screen.no_button = build_rectangle(canvas, [- 41 / 200 * remove_group_contact_screen.width, 5 / 16 * remove_group_contact_screen.height], [1 / 5 * remove_group_contact_screen.width, 1 / 10 * remove_group_contact_screen.height ], undefined, 'radial-gradient(' + '#AA5555' + ', ' + '#bc2b2b' + ')', [5, 5, 5, 5])

	remove_group_contact_screen.yes_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), contacts['yes'], black)
	remove_group_contact_screen.no_text = build_text(canvas, undefined, undefined, undefined, get_size_px(canvas, 16), contacts['no'], black)

	remove_group_contact_screen.yes_button.addChild(remove_group_contact_screen.yes_text)
	remove_group_contact_screen.no_button.addChild(remove_group_contact_screen.no_text)
	remove_group_contact_screen.addChild(remove_group_contact_screen.yes_button)
	remove_group_contact_screen.addChild(remove_group_contact_screen.no_button)
	remove_group_contact_screen.addChild(remove_group_contact_screen.message)

	object_clickable(canvas, remove_group_contact_screen.yes_button)
	remove_group_contact_screen.yes_button.bind('click tap', function() {
        var index = contacts_information.group.indexOf(contacts_information.actual_contact)
        contacts_information.group.splice(index, 1)

        var index =  contacts_information.contacts_list.indexOf(contacts_information.actual_contact)
        contacts_information.contacts_list[index].on_group = false

		changeScreen(canvas, build_contacts_screen(canvas))
	})

	object_clickable(canvas, remove_group_contact_screen.no_button)
	remove_group_contact_screen.no_button.bind('click tap', function() {
		changeScreen(canvas, build_contact_screen(canvas))
	})

    return remove_group_contact_screen
}

function build_add_contact_screen(canvas){
    var add_contact_screen = build_screen(canvas, descriptions['add_contact'], false, true)


    var options = [ group['contact_1'], group['contact_2'], group['contact_3'], group['contact_4'],  ]
	var link = [ 'link_delete_contact', 'link_delete_contact', 'link_delete_contact', 'link_option' ]
	var images = [ 'Group.png', 'Group.png', 'Group.png', 'Group.png' ]

	links = add_lines(canvas, group_screen, -1, options, link, images)
    return add_contact_screen

}