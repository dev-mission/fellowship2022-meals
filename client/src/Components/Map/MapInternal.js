import React, { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

import './MapInternal.scss';

function MapInternal({ id, center, zoom, children }) {
  const ref = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map, center, zoom]);

  return (
    <div className="mapint">
      <div className="mapint__sizer"></div>
      <div ref={ref} id={id} className="mapint__map" />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </div>
  );
}
export default MapInternal;
