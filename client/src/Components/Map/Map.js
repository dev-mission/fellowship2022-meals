import { Wrapper } from '@googlemaps/react-wrapper';

import MapInternal from './MapInternal';

function Map({ id, apiKey, center, zoom, children }) {
  return (
    <Wrapper apiKey={apiKey}>
      <MapInternal id={id} center={center} zoom={zoom}>
        {children}
      </MapInternal>
    </Wrapper>
  );
}

export default Map;
