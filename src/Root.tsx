import React from 'react';
import { Composition, AbsoluteFill } from 'remotion';
import { Root } from './_root_helper';
import timeline from './timeline.json';

const TOTAL_DUR = timeline.segments.reduce((m: number, s: any) => Math.max(m, s.start + s.duration), 0);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GraphEng"
        component={Root}
        durationInFrames={Math.ceil(TOTAL_DUR * 30)}
        fps={30}
        width={540}
        height={720}
      />
    </>
  );
};
