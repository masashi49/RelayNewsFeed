import * as React from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Image from "./Image";
import Timestamp from "./Timestamp";
import type {PreloadedQuery}from "react-relay"
import type { PosterDetailsHovercardContentsQuery as QueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";
import type { PosterDetailsHovercardContentsBodyFragment$key } from "./__generated__/PosterDetailsHovercardContentsBodyFragment.graphql";

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

// usePreloadedQuery マウントされる前に取得、ページ描画時に最初から出したい時に有効
// useLazyLoadQuery マウントされた後に取得、ユーザー操作を検知して描画したい時に有効
// 一度取得するとキャッシュされる。

export default function PosterDetailsHovercardContents({
  queryRef,
}: {
  queryRef: PreloadedQuery<QueryType>;
}): React.ReactElement {
  const data = usePreloadedQuery<QueryType>(
    PosterDetailsHovercardContentsQuery,
    queryRef, 
  );

  /*
  // 前までは⇩だった。
  // dataはマウントされた後に取得するので問題なかったが、Preloadするには向きません。
  // queryRefといったクエリ参照を渡すことで、解決しました。11行目のGraphQLのクエリをexportして親に渡してそこでpreloadしています。
  const data = useLazyLoadQuery<QueryType>(
    PosterDetailsHovercardContentsQuery,
    {posterID},
  );

  */

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
