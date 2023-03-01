import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "pk.eyJ1IjoibWlkbGFqIiwiYSI6ImNsZWxtYWJnNjB3a2wzeHBkdDdiODExbDkifQ.NhX0qWLYe0SDcBfhJlBsZw";

export const getLocationName = async (lng:number, lat:number) => {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`);
  const data = await response.json();

  const location = data.features[0].place_name;
  const parts = location.split(",");
  const locationName = `${parts[parts.length - 3]}, ${parts[parts.length - 2]}, ${parts[parts.length - 1]}`;

  return locationName;
};
