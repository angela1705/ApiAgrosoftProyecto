import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  LayersControl,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DefaultLayout from "@/layouts/default";

const polygonPoints: [number, number][] = [
  [1.891008, -76.092276],
  [1.892501, -76.091993],
  [1.893558, -76.091488],
  [1.893735, -76.090598],
  [1.893477, -76.090153],
  [1.894308, -76.089246],
  [1.893783, -76.087706],
  [1.892062, -76.086773],
  [1.890957, -76.088492],
  [1.891177, -76.088887],
  [1.891440, -76.090228],
  [1.891054, -76.091166],
  [1.891008, -76.092276],
];

const center: [number, number] = [1.8922, -76.0912];
function ClickHandler({ setClickPosition }: { setClickPosition: (pos: [number, number] | null) => void }) {
  useMapEvents({
    click(e) {
      setClickPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const MapaPage: React.FC = () => {
  const [clickPosition, setClickPosition] = useState<[number, number] | null>(
    null
  );

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
        <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Área delimitada
          </h2>
          <MapContainer
            center={center}
            zoom={18}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%" }}
            className="rounded-lg border"
          >
            
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            <Polygon
              positions={polygonPoints}
              pathOptions={{ color: "deepskyblue", weight: 4, dashArray: "5,10", fillOpacity: 0.3 }}
            >
              <Popup>Área delimitada</Popup>
            </Polygon>

            <ClickHandler setClickPosition={setClickPosition} />

            {clickPosition && (
              <Popup position={clickPosition} onClose={() => setClickPosition(null)}>
                <div>
                  <b>Coordenadas:</b>
                  <br />
                  Lat: {clickPosition[0].toFixed(6)}
                  <br />
                  Lng: {clickPosition[1].toFixed(6)}
                </div>
              </Popup>
            )}
          </MapContainer>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MapaPage;
