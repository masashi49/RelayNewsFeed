import * as React from "react";
import Story from "./Story";
import {graphql, useFragment} from "react-relay"
import {useLazyLoadQuery }from "react-relay"
import {NewsfeedQuery as NewsfeedQueryType} from "./__generated__/NewsfeedQuery.graphql"

// graphqlリテラル、コードベースでGraphQlを検索してコンパイルできる
// idはバックエンド側で実装しておく

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedContentsFragment
  }
`;

const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Query
    @argumentDefinitions (
      cursor: { type: "String" }
      count: { type: "Int", defaultValue: 3 }
    )
    @refetchable(queryName: "NewsfeedContentsRefetchQuery")
  {
    viewer {
      newsfeedStories(after: $cursor, first: $count)
        @connection(key: "NewsfeedContentsFragment_newsfeedStories")
      {
        edges {
          node {
            id
            ...StoryFragment
          }
        }
      }
    }
  }
`;
// ↑ 配列を取得したいからといって、取得する記述を配列用に変更するわけではない。


export default function Newsfeed() {
  // graphqlを読み込むために npmでrelay-compilerする
  // export type NewsfeedQuery$data の$dataは、GraphQLクエリやフラグメントに対して特定の型の命名規則。
  const queryData = useLazyLoadQuery<NewsfeedQueryType>(
    NewsfeedQuery, // 7行目の定義
    {}, // サーバーに送る際、必要な変数。
  );
  const data = useFragment(NewsfeedContentsFragment,queryData)
  const storyEdges = data.viewer.newsfeedStories.edges;
  console.log(storyEdges)

  // const story = {
  //   title: "Placeholder Story",
  //   summary: "Placeholder data, to be replaced with data fetched via GraphQL",
  //   poster: {
  //     name: "名前",
  //     profilePicture: {
  //       url: "/assets/cat_avatar.png",
  //     },
  //   },
  //   thumbnail: {
  //     url: "/assets/placeholder.jpeg",
  //   },
  // };

  return (
    <div className="newsfeed">こんにちわ
      {storyEdges.map(storyEdge=><Story key={storyEdge.node.id} story={storyEdge.node} />)}
    </div>
  );
}
