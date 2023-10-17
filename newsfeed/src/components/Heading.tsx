import * as React from "react";

type Props = {
  children: React.ReactNode
}

export default function Heading({children}: Props){

  return <h2 className="heading">{children}</h2>;
}
