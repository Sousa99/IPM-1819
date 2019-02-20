function toggleVisible(id) {    
}

function changeImage(id) {
    images_path = ["Isabel.png", "Rodrigo.png"];
    object = document.getElementById(id)
    
    if (id == "profile_pic_1") {
        object.src = images_path[0];

        /* pixels: 138 x 170 */
        object.style="border-radius: 75px;";
        object.width="138";
        object.height="170";

    } else if (id == "profile_pic_2") {
        object.src = images_path[1];

        /* pixels: 135 x 174 */
        object.style="border-radius: 75px;";
        object.width="135";
        object.height="174";

    } else if (id == "profile_pic_3") {
        object.src = images_path[2];
    }
}