import * as React from "react";
import { useLazyLoadQuery, useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import Image from "./Image";
import Timestamp from "./Timestamp";

import type { PosterDetailsHovercardContentsQuery as QueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";
import type { PosterDetailsHovercardContentsBodyFragment$key } from "./__generated__/PosterDetailsHovercardContentsBodyFragment.graphql";

//  ID! は、GraphQLの組み込み型の1つ。何らかの一意の識別子であることを示唆する
const PosterDetailsHovercardContentsQuery = graphql`
  query PosterDetailsHovercardContentsQuery(
    $posterID: ID! 
  ) {
    node(id: $posterID) {
      ... on Actor {
        ...PosterDetailsHovercardContentsBodyFragment
      }
    }
  }
`;

export default function PosterDetailsHovercardContents({
  posterID,
}: {
  posterID: string;
}): React.ReactElement {
  const data = useLazyLoadQuery<QueryType>(
    PosterDetailsHovercardContentsQuery,
    {posterID},
  );

  return <PosterDetailsHovercardContentsBody poster={data.node} />;
}

const PosterDetailsHovercardContentsBodyFragment = graphql`
  fragment PosterDetailsHovercardContentsBodyFragment on Actor {
    id
    name
    joined
    profilePicture {
      ...ImageFragment
    }
  }
`;

function PosterDetailsHovercardContentsBody({
  poster,
}: {
  poster: PosterDetailsHovercardContentsBodyFragment$key;
}) {

  const data = useFragment(PosterDetailsHovercardContentsBodyFragment, poster);
  return (
    <>
      <Image
        image={data.profilePicture}
      />
      <div className="posterHovercard__name">{data.name}</div>
      <ul className="posterHovercard__details">
        <li>
          Joined <Timestamp time={data.joined} />
        </li>
      </ul>
      <div className="posterHovercard__buttons">
        <button>Friend</button>
        <button>Message</button>
      </div>
    </>
  );
}
