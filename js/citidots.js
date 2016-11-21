var filename = '';

$.getJSON(filename, function(json) {
    var bikes = json;
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 40.726517, lng: -73.976786},
        mapTypeId: 'terrain'
    });

    var activeBikes = [];
    var ticks = 0;

    window.setInterval(function(){

        for (var bikeid in bikes){
            if (bikes[bikeid].starttime == ticks){
                activeBikes.push( new google.maps.Circle({
                    strokeColor: '#39A2E1',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#39A2E1',
                    fillOpacity: 1,
                    map: map,
                    center: {lat: bikes[bikeid].startLoc[0], lng: bikes[bikeid].startLoc[1]},
                    radius: 20,
                    startLoc: {lat: bikes[bikeid].startLoc[0], lng: bikes[bikeid].startLoc[1]},
                    endLoc: {lat: bikes[bikeid].endLoc[0], lng: bikes[bikeid].endLoc[1]},
                    angle: 40*(Math.PI / 180),
                    v: 0.0001,
                    hasTurned: false,
                }));
            }
        }

        activeBikes.forEach(function(bike) {
            var sX = bike.startLoc['lng'];
            var sY = bike.startLoc['lng'];
            var eX = bike.endLoc['lng'];
            var eY = bike.endLoc['lat'];

            var d = Math.sqrt(Math.pow((eX-sX),2) + Math.pow((eY-sY), 2));
            var p = bike.getCenter();
            var m = p.lng();
            var g = p.lat();
            var currentX = p.lat();
            var currentY = p.lng();
            var currentd = Math.sqrt(Math.pow((currentX-sX),2) + Math.pow((currentY-sY), 2));
            var north = eX > sX;
            var south = !north;
            var east = eY > sY;
            var west = !east;

            if (north && east) {

            m = p.lng() + bike.v*(Math.sin(bike.angle));
            g = p.lat() + bike.v*(Math.cos(bike.angle));

            if (currentd > dx) {
            bike.hasTurned = true;
            bike.angle = Math.PI / 180 * 107;
            }
            if (currentd > d && bike.hasTurned) {
            bike.v = 0;
            }
            }

            if (north && west) {

            m = p.lng() + bike.v*(Math.sin(bike.angle));
            g = p.lat() + bike.v*(Math.cos(bike.angle));

            if (currentd > dx) {
            bike.hasTurned = true;
            bike.angle = Math.PI / 180 * -73;
            }
            if (currentd > d && bike.hasTurned) {
            bike.v = 0;
            }
            }
            if (south && east) {

            m = p.lng() - bike.v*(Math.sin(bike.angle));
            g = p.lat() - bike.v*(Math.cos(bike.angle));

            if (currentd > dx) {
            bike.hasTurned = true;
            bike.angle = Math.PI / 180 * -73;
            }
            if (currentd > d && bike.hasTurned) {
            bike.v = 0;
            }
            }


            bike.setCenter(new google.maps.LatLng(g,m));
            bike.setRadius(10);

            });
            ticks++;
    }, 10);
}
