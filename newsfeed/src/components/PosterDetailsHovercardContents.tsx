import * as React from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Image from "./Image";
import Timestamp from "./Timestamp";
import type {PreloadedQuery}from "react-relay"
import type { PosterDetailsHovercardContentsQuery as QueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";
import type { PosterDetailsHovercardContentsBodyFragment$key } from "./__generated__/PosterDetailsHovercardContentsBodyFragment.graphql";
import OrganizationKind from "./OrganizationKind"

//  ID! は、GraphQLの組み込み型の1つ。何らかの一意の識別子であることを示唆する
export const PosterDetailsHovercardContentsQuery = graphql`
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
  queryRef,
}: {
  queryRef: PreloadedQuery<QueryType>;
}): React.ReactElement {
  const data = usePreloadedQuery<QueryType>(
    PosterDetailsHovercardContentsQuery,
    queryRef, 
  );
  return <PosterDetailsHovercardContentsBody poster={data.node} />;
}

// const PosterDetailsHovercardContentsBodyFragment = ReactのuseFragmentの中で使用する。
// fragment PosterDetailsHovercardContentsBodyFragment GraphQLクエリの中で使われます。

const PosterDetailsHovercardContentsBodyFragment = graphql`
  fragment PosterDetailsHovercardContentsBodyFragment on Actor {
    name
    joined
    profilePicture {
      ...ImageFragment
    }
    ...on Organization {
      organizationKind
    }
    ...on Person{
      location{
        name
      }
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
        {data.location != null && (
           <li>{data.location.name}</li>
         )}
        {data.organizationKind != null && (
          <li><OrganizationKind kind={data.organizationKind} /></li>
         )}
      </ul>
      <div className="posterHovercard__buttons">
        <button>Friend</button>
        <button>Message</button>
      </div>
    </>
  );
}
