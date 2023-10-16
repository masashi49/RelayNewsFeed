import * as React from "react";
import { graphql } from "relay-runtime";
import { HeadingFragment$key } from "./__generated__/HeadingFragment.graphql";
import { useFragment } from "react-relay";


const HeadingFragment = graphql`
  fragment HeadingFragment on Story{
    title
  }

`

type Props = {
  title: HeadingFragment$key
}


export default function Heading({title}: Props){
  const data = useFragment(HeadingFragment, title);
  return <h2 className="heading">{data.title}</h2>;
}
