import * as React from "react";
import Image from "./Image";
import Hovercard from "./Hovercard"
import PosterDetailsHovercardContents from './PosterDetailsHovercardContents';
import { graphql } from "relay-runtime";
import {useQueryLoader} from 'react-relay';
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import type {PosterDetailsHovercardContentsQuery as HovercardQueryType} from './__generated__/PosterDetailsHovercardContentsQuery.graphql';
import {PosterDetailsHovercardContentsQuery} from './PosterDetailsHovercardContents';

import { useFragment } from "react-relay";

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`;// ⇧fragmentを追加変更したら、yarn relayを忘れずに

type Props = {
  poster: PosterBylineFragment$key
}

export default function PosterByline({ poster }: Props): React.ReactElement {
  const [HovercardQueryRef,loadHovercardQuery] = useQueryLoader<HovercardQueryType>(PosterDetailsHovercardContentsQuery)
  
  function onBeginHover() {
    loadHovercardQuery({posterID: data.id});
  }
  
  
  const data = useFragment(PosterBylineFragment, poster);
  const hoverRef = React.useRef(null)
  if (poster == null) {
    return null;
  }
  return (
    <div ref={hoverRef} className="byline">
      <Image image={data.profilePicture}/>
      <div className="byline__name">{data.name}</div>
      <Hovercard targetRef={hoverRef} onBeginHover={onBeginHover}>
        <PosterDetailsHovercardContents queryRef={HovercardQueryRef}/>
      </Hovercard>
    </div>
  );
}
