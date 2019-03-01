function toggleVisible(id) {    
}

function changeImage(id) {
    images_path = ["Materials/Isabel.jpeg", "Materials/Rodrigo.png", "Materials/Tiago.png"];
    object = document.getElementById(id);
    object.classList.remove("zoom");
    
    if (id == "profile_pic_1") {
        object.src = images_path[0];

        
    } else if (id == "profile_pic_2") {
        object.src = images_path[1];
    } else if (id == "profile_pic_3") {
        object.src = images_path[2];
    }

    object.style="border-radius: 75px;";
}