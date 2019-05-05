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

    if (contact.image == undefined) contact.image = 'Isabel.jpeg'

    contact_screen.image = build_image(canvas, [0, - contact_screen.height / 10], [contact_screen.width / 3, contact_screen.height / 3], undefined, MATERIALS_DIR + '/' + contact.image)
    contact_screen.addChild(contact_screen.image)

    var options = [undefined, undefined, undefined]//[ contacts['name'], contacts['phone'], contacts['birthday'],  ]
    var link = ['text', 'text', 'text']
    var info = [ contact.fullname, contact.phone, contact.birthday.abbrev]

	links = add_lines(canvas, contact_screen, 0, options, link, undefined, info)
    

    return contact_screen
}

function build_add_contact_screen(canvas){
    var add_contact_screen = build_screen(canvas, descriptions['add_contact'], false, true)


    var options = [ group['contact_1'], group['contact_2'], group['contact_3'], group['contact_4'],  ]
	var link = [ 'link_delete_contact', 'link_delete_contact', 'link_delete_contact', 'link_option' ]
	var images = [ 'Group.png', 'Group.png', 'Group.png', 'Group.png' ]

	links = add_lines(canvas, group_screen, -1, options, link, images)
    return add_contact_screen

}