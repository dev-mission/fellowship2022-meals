import { useEffect, useState } from 'react';

function Marker(options) {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    let listener;
    if (marker) {
      marker.setOptions(options);
      listener = marker.addListener('click', (event) => {
        if (options.onClick) {
          options.onClick(event, marker, options.map, options.infoWindow);
        }
      });
    }
    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [marker, options]);

  return null;
}
export default Marker;
