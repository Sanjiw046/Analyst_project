import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import API from "../../services/api.jsx";
import indiaStates from "../../data/india-states.json";

const MapComponent = () => {

  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    fetchAllStates();
  }, []);

  const fetchAllStates = async () => {
    try {
      const res = await API.get("/api/analytics/location/");
      setStateData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getColor = (count) => {
    if (count > 5) return "#800026";
    if (count > 2) return "#BD0026";
    if (count > 1) return "#E31A1C";
    return "#FFEDA0";
  };

  const styleFeature = (feature) => {
    const stateName = feature.properties.NAME_1;

    const state = stateData.find(
      (s) => s.user__state === stateName
    );

    const count = state ? state.total_events : 0;

    return {
      fillColor: getColor(count),
      weight: 2,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.NAME_1;

    layer.on({
      click: async () => {
        try {
          const res = await API.get(
            `/api/analytics/location/?state=${stateName}`
          );

          const total = res.data.reduce(
            (sum, item) => sum + item.total_events,
            0
          );

          layer.bindPopup(
            `<strong>${stateName}</strong><br/>Total Events: ${total}`
          ).openPopup();

        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <MapContainer
      center={[22.9734, 78.6569]}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON
        data={indiaStates}
        style={styleFeature}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default MapComponent;