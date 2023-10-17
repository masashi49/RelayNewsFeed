import * as React from "react";
import {graphql} from "relay-runtime"
import type { ImageFragment$key } from "./__generated__/ImageFragment.graphql";
import { useFragment } from "react-relay";

// Imageを使用しているcomponentでImageFragmentの情報さえ渡しておけば
// あとはImagecomponentで欲しいデータを定義でる
const ImageFragment = graphql`
  fragment ImageFragment on Image
    @argumentDefinitions(
      width: {
        type: "Int",
        defaultValue: null
      }
      height: {
        type: "Int",
        defaultValue: null
      }
    )
  {
    url(
      width: $width,
      height: $height
    )
    altText
  }
`;
// fragmentを追加変更したら、yarn relayを忘れずに


type Props = {
  image: ImageFragment$key;
}

export default function Image({ image}:Props) {
  const data = useFragment(ImageFragment, image);
  if (image == null) {
    return null;
  }
  return (
    <img
      key={data.url}
      src={data.url}
      alt={data.altText}
      //width={data.width}
      //height={data.height}
      //className={data.className}
    />
  );
}
