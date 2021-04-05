// import * as React from 'react';
// import { useState } from 'react';
// import ReactMapGL, {Layer} from 'react-map-gl';


// const parkLayer = {
//   id: 'landuse_park',
//   type: 'fill',
//   source: 'mapbox',
//   'source-layer': 'landuse',
//   filter: ['==', 'class', 'park']
// };


// function Map() {
//   const [parkColor, setParkColor] = useState('#8fa');
//   const [viewport, setViewport] = useState({
//     width: "100%",
//     height: 500,
//     latitude: 40.3594,
//     longitude: 49.8266,
//     zoom: 16
//   });

//   return (
//     <ReactMapGL
//       {...viewport}
//       mapboxApiAccessToken={"pk.eyJ1Ijoic2hvaHJhdCIsImEiOiJja21zdjJ3Y3gwbG5oMnJzMDVvaGJvajd2In0.zrrkFPrbJNto1y_IyqfCzg"}
//       onViewportChange={nextViewport => setViewport(nextViewport)}
//     >
//       <Layer {...parkLayer} paint={{'fill-color': parkColor}} />
//     </ReactMapGL>
//   );
// }

// export default Map

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map=()=>{
  return (
    <MapContainer center={[40.4388, 49.7784]} zoom={17} style={{height:'60vh'}} scrollWheelZoom={false}>
      <TileLayer
        maxZoom={19}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[40.4388, 49.7784]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
</MapContainer>
  )
}

export default Map