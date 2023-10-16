import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";
import Newsfeed from "./Newsfeed";
import LoadingSpinner from "./LoadingSpinner";

export default function App(): React.ReactElement {
  return (
    <RelayEnvironment>
      <React.Suspense fallback={<LoadingSpinner />}>
        <div className="app">
          <Newsfeed />
          hello
        </div>
      </React.Suspense>
    </RelayEnvironment>
  );
}
