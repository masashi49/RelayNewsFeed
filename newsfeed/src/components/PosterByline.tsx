import * as React from "react";
import Image from "./Image";
import { graphql } from "relay-runtime";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import { useFragment } from "react-relay";

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
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
  const data = useFragment(PosterBylineFragment, poster);
  if (poster == null) {
    return null;
  }
  return (
    <div className="byline">
            poster
      <Image image={data.profilePicture}
      />

      <div className="byline__name">{data.name}</div>
    </div>
  );
}
