function build_gallery_screen(canvas){
    var gallery_screen =  build_screen(canvas, descriptions['gallery'], true, true)

    const max_displayed = Math.min(gallery_information.gallery.length, 9)
    for (var image_index = 0; image_index < max_displayed; image_index++) {
        var image_path = MATERIALS_DIR + gallery_information.gallery[image_index]
        var image_position = [( 1.5  * (image_index % 3 - 1)) * gallery_screen.width / 5 , (Math.floor(image_index/3) % 3 * 1.40 - 1) * gallery_screen.height / 5]
        
        var image_object = build_image(canvas, image_position, [gallery_screen.width / 4, gallery_screen.height / 4], undefined, image_path)

        gallery_screen.addChild(image_object)
    }

    return gallery_screen
}