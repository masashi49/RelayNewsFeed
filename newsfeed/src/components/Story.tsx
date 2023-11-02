import * as React from "react";
import Card from "./Card";
import Heading from "./Heading";
import PosterByline from "./PosterByline";
import StorySummary from "./StorySummary";
import Image from "./Image";
import Timestamp from "./Timestamp"
import {graphql}from "relay-runtime"
import { useFragment } from "react-relay";
import type {StoryFragment$key} from './__generated__/StoryFragment.graphql';
import StoryCommentsSection from "./StoryCommentsSection"

const StoryFragment = graphql`
  fragment StoryFragment on Story{
      title
      summary
      createdAt
      poster {
        ...PosterBylineFragment
      }
      thumbnail{
        ...ImageFragment @arguments(width:400)
      }
      ...StoryCommentsSectionFragment
  }
`
// ⇧fragmentを追加変更したら、yarn relayを忘れずに

type Props = {
  story: StoryFragment$key;
};

export default function Story({ story }: Props): React.ReactElement {
  const data = useFragment(
    StoryFragment,
    story
  )

  // コンポーネントはそれ自体が必要とするデータのフラグメントだけを定義。
  return (
    <Card>
      hello
      <PosterByline poster={data.poster} />
      <Heading>{data.title}</Heading>
      <Timestamp time={data.createdAt} />
      <Image image={data.thumbnail}  />big image
      <StorySummary summary={data.summary} />bbb
      <StoryCommentsSection story={data} />aaa
    </Card>
  );
}

// 親側では ...xxxFragmentとしておくだけ。子供側で使用する値を書き足せる。
// 親から子にpropsする場合、使用する子componentに対してvalueを追加必要がある。
// <Hello title={title}/> -> <Hello title={title} time={time}/>
// <Hello hello={data.hello}/> 親の変更は無し