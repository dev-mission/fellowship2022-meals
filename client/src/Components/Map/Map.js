import { Wrapper } from '@googlemaps/react-wrapper';

import MapInternal from './MapInternal';

function Map({ id, apiKey, children }) {
  return (
    <Wrapper apiKey={apiKey}>
      <MapInternal id={id}>{children}</MapInternal>
    </Wrapper>
  );
}

export default Map;
