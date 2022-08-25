import { useEffect, useState } from 'react';

function Marker(options) {
  const [marker, setMarker] = useState();

  useEffect(() => {
    let newMarker;
    if (!marker) {
      newMarker = new window.google.maps.Marker();
      setMarker(newMarker);
    }
    return () => {
      if (newMarker) {
        newMarker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    let listener;
    if (marker) {
      marker.setOptions(options);
      listener = marker.addListener('click', (event) => {
        if (options.onClick) {
          options.onClick(marker, event);
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
