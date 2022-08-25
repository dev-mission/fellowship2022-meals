import { useEffect, useRef } from 'react';

import './MapInternal.scss';

function MapInternal({ id, children }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 14,
    });
  }, []);

  return (
    <div className="mapint">
      <div className="mapint__sizer"></div>
      <div ref={ref} id={id} className="mapint__map">
        {children}
      </div>
    </div>
  );
}
export default MapInternal;
