function build_gallery_screen(canvas){
    var gallery_screen =  build_screen(canvas, descriptions['gallery'], true, true)

    for (image_index in gallery_information.gallery.images) {
        var image_path = MATERIALS_DIR + gallery_information.gallery.images[image_index]
        var image_position = [( 1.5  * (image_index % 3 - 1)) * gallery_screen.width / 5 , (Math.floor(image_index/3) % 3 * 1.5 - 1) * gallery_screen.height / 5]

        var image_object = build_image(canvas, image_position, [gallery_screen.width / 4, gallery_screen.height / 4], undefined, image_path)

        gallery_screen.addChild(image_object)
    }

    return gallery_screen
}