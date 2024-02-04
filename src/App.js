import React, {useEffect, useState} from 'react';
import PostList from './PostList';

const App = () => {
    const [posts, setPosts] = useState([]);

    return (
      <div>
        <h1>Forum App</h1>
        <PostList />
      </div>
  );
};

export default App;
