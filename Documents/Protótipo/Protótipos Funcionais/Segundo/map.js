var map_initialized;

function build_map_screen(canvas) {
	var map_screen = canvas.display.rectangle({
		description: descriptions['map'],
		description_show: false,
		template: false,
		x: canvas.width / 2,
		y: canvas.height / 2,
		origin: { x: 'center', y: 'center' },
		width: SIZE_SCREEN,
		height: SIZE_SCREEN,
		borderRadius: 20,
		fill: '#AAFFAA'
    });

    var map_html = document.getElementById('mapid');
    map_html.style.height = (SIZE_SCREEN + 4) + 'px';
    map_html.style.width = (SIZE_SCREEN + 4) + 'px';
    map_html.style.display = 'block';
    
    if (map_initialized == null) {
        map_initialized = L.map('mapid', {
            center: [38.736911, -9.138962],
            zoom: 15,
            minZoom: 4,
            maxZoom: 18,
            zoomControl: false
        });
        
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            minZoom: 4,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoic291c2E5OSIsImEiOiJjanVoYXI3ODcwcW05NDNvM2phNnB3eGF6In0.4u5Q1HN3FiTISIBO2RdR_A'
        }).addTo(map_initialized);
    }
    
    
    map_initialized = true;
    return map_screen;
}