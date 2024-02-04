import React, {useState} from 'react';
import Post from './Post';
import Data from './data.json'

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newAuthor, setNewAuthor] = useState('');


    const addPost = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(), // Simple unique ID generation
            title: newTitle,
            author: newAuthor,
            content: newContent,
            comments: [],
        };
        setPosts([...posts, newPost]);
        setNewTitle('');
        setNewContent('');
        setNewAuthor('');
    };

    return (
        <div>
            <h2>Add a New Post</h2>
            <form onSubmit={addPost}>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Post Title"
                    required
                />
                <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Post Author"
                    required
                />
                <input
                    type="text"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Post Content"
                    required
                />
                <button type="submit">Add Post</button>
            </form>

            {
                Data.map(post => (
                <Post key={post.id} post={post} setPosts={setPosts} />
            ))}
        </div>
    );
};

export default PostList;
