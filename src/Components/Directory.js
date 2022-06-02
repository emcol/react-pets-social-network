import React from 'react';
import { Userlist } from './Userlist';

export function Directory(props) {
  return (
    <div className="Directory">
      <h2>User directory</h2>
      <Userlist
        usernames={['dog', 'cat', 'komodo', 'baloo']}
        onChoose={props.onChoose}
      />
    </div>
  );
}