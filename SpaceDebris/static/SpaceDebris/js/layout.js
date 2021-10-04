var wwd = new WorldWind.WorldWindow("canvasOne");
wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLayer());
wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.AtmosphereLayer());
wwd.addLayer(new WorldWind.StarFieldLayer());
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

//PLACEMARKS
var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
wwd.addLayer(placemarkLayer);
var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;
placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.5,
    WorldWind.OFFSET_FRACTION, 1.0
);

placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

var position = new WorldWind.Position(-6696.209725941864, -3052.6578191712533, -390.8815545959031);
var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

var position2 = new WorldWind.Position(19.500102, -99.077939, 1000.0);
var placemark2 = new WorldWind.Placemark(position2, false, placemarkAttributes);

placemark.label = "CALSPHERE 1\n" +
    "Lat: " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Lon: " + placemark.position.longitude.toPrecision(5).toString();
placemark.alwaysOnTop = true;

placemark2.label = "Moni y Mario\n" +
    "Lat: " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Lon: " + placemark.position.longitude.toPrecision(5).toString();
placemark2.alwaysOnTop = true;

placemarkLayer.addRenderable(placemark);
placemarkLayer.addRenderable(placemark2);