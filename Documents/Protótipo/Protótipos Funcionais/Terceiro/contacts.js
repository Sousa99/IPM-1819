function build_contacts_screen(canvas){
    var contacts_screen = build_screen(canvas, descriptions['contacts'], false, true)
    contacts_screen.image = build_image(canvas, [contacts_screen.width / 30, - contacts_screen.height / 5], [contacts_screen.width / 3, contacts_screen.height / 3], undefined, MATERIALS_DIR + '/Person_contacts.png')
    

    contacts_screen.addChild(contacts_screen.image)

    var options = [ contacts['name'], contacts['phone'], contacts['birthday'],  ]
	

	links = add_lines(canvas, group_screen, -1, options, undefined, undefined)
    

    return contacts_screen
} 

function build_add_contact_screen(canvas){
    var add_contact_screen = build_screen(canvas, descriptions['add_contact'], false, true)


    var options = [ group['contact_1'], group['contact_2'], group['contact_3'], group['contact_4'],  ]
	var link = [ 'link_delete_contact', 'link_delete_contact', 'link_delete_contact', 'link_option' ]
	var images = [ 'Group.png', 'Group.png', 'Group.png', 'Group.png' ]

	links = add_lines(canvas, group_screen, -1, options, link, images)
    return add_contact_screen

}