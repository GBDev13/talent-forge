import "plyr-react/plyr.css";

import { memo } from "react";
import Plyr from "plyr-react"

type AudioPlayer = {
  src: string;
}

const AudioPlayer = ({ src }: AudioPlayer) => {
  return (
    <Plyr
      source={{
        type: 'audio',
        sources: [{ src }]
      }}
      options={{
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings'],
      }}
    />
  )
}

export default memo(AudioPlayer);