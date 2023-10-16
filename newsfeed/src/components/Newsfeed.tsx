import * as React from "react";
import Story from "./Story";
import {graphql} from "react-relay"
import {useLazyLoadQuery }from "react-relay"
import {NewsfeedQuery as NewsfeedQueryType} from "./__generated__/NewsfeedQuery.graphql"

// graphqlリテラル、コードベースでGraphQlを検索してコンパイルできる
const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStory{
      ...StoryFragment
    }
  }
`


export default function Newsfeed() {
  // graphqlを読み込むために npmでrelay-compilerする
  // export type NewsfeedQuery$data の$dataは、GraphQLクエリやフラグメントに対して特定の型の命名規則。
  const data = useLazyLoadQuery<NewsfeedQueryType>(
    NewsfeedQuery, // 7行目の定義
    {}, // サーバーに送る際、必要な変数。
  );

  const story = data.topStory
  //console.log(story)
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
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
