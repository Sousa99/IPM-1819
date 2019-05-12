function build_gallery_screen(canvas){
    var gallery_screen =  build_screen(canvas, descriptions['gallery'], true, true)

    gallery_screen.image_almada = build_image(canvas, [- 1.5 * gallery_screen.width / 5 , - gallery_screen.height / 5], [gallery_screen.width / 4, gallery_screen.height / 4], undefined, MATERIALS_DIR + '/Gallery/Almada.JPG')
    gallery_screen.image_trancoso = build_image(canvas, [ 0 * gallery_screen.width / 5 , - gallery_screen.height / 5], [gallery_screen.width / 4, gallery_screen.height / 4], undefined, MATERIALS_DIR + '/Gallery/Trancoso.jpeg')
    gallery_screen.image_cb = build_image(canvas, [ 1.5 * gallery_screen.width / 5 , - gallery_screen.height / 5], [gallery_screen.width / 4, gallery_screen.height / 4], undefined, MATERIALS_DIR + '/Gallery/Castelo Branco.jpg')
    gallery_screen.image_alps = build_image(canvas, [- 1.5 * gallery_screen.width / 5 ,  0.5 * gallery_screen.height / 5], [gallery_screen.width / 4, gallery_screen.height / 4], undefined, MATERIALS_DIR + '/Gallery/Swiss Alps.jpg')
    gallery_screen.image_florida = build_image(canvas, [ 0* gallery_screen.width / 5 , 0.5 * gallery_screen.height / 5], [gallery_screen.width / 4, gallery_screen.height / 4], undefined, MATERIALS_DIR + '/Gallery/Florida.jpg')
   
    gallery_screen.addChild(gallery_screen.image_almada)
    gallery_screen.addChild(gallery_screen.image_trancoso)
    gallery_screen.addChild(gallery_screen.image_cb)
    gallery_screen.addChild(gallery_screen.image_alps)
    gallery_screen.addChild(gallery_screen.image_florida)

    return gallery_screen
}