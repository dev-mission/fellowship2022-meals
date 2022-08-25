import { useEffect, useRef } from 'react';

import './MapInternal.scss';

function MapInternal({ id, center, zoom, children }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, { center, zoom });
  }, [center, zoom]);

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
