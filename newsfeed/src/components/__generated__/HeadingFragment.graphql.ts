/**
 * @generated SignedSource<<30020fd482fc66a5e8b3be735e2e960e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeadingFragment$data = {
  readonly title: string;
  readonly " $fragmentType": "HeadingFragment";
};
export type HeadingFragment$key = {
  readonly " $data"?: HeadingFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeadingFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeadingFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Story",
  "abstractKey": null
};

(node as any).hash = "2b72e426fdae3874827ad9ff29c04b16";

export default node;
