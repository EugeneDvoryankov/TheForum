import React, { useEffect, useState } from 'react';

const Post = ({ post }) => {
    // Use the post's ID to store and retrieve comments uniquely for each post
    const commentsKey = `comments_${post.id}`;
    const storedComments = JSON.parse(localStorage.getItem(commentsKey)) || post.comments || [];
    const [comments, setComments] = useState(storedComments);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');

    // Update local storage when comments change
    useEffect(() => {
        localStorage.setItem(commentsKey, JSON.stringify(comments));
    }, [comments, commentsKey]);

    const addComment = (e) => {
        e.preventDefault();
        const updatedComments = [...comments, { id: Date.now(), content: newComment }];
        setComments(updatedComments);
        setNewComment('');
    };

    const saveEditedComment = (id) => {
        const updatedComments = comments.map(comment =>
            comment.id === id ? { ...comment, content: editCommentContent } : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
        setEditCommentContent('');
    };

    const deleteComment = (id) => {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    };

    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <h4>Comments:</h4>
            <ul>
                {comments.map((comment, index) => (
                    <li key={comment.id || index}>
                        {editingCommentId === comment.id ? (
                            <input
                                type="text"
                                value={editCommentContent}
                                onChange={(e) => setEditCommentContent(e.target.value)}
                            />
                        ) : (
                            comment.content
                        )}
                        {editingCommentId === comment.id ? (
                            <button onClick={() => saveEditedComment(comment.id)}>Save</button>
                        ) : (
                            <>
                                <button onClick={() => {
                                    setEditingCommentId(comment.id);
                                    setEditCommentContent(comment.content);
                                }}>Edit</button>
                                <button onClick={() => deleteComment(comment.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <form onSubmit={addComment}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="New Comment"
                />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default Post;
