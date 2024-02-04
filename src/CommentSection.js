import React, { useState } from 'react';

const CommentSection = ({ initialComments, updateCommentsInPost }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');

    const addComment = (e) => {
        e.preventDefault();
        const updatedComments = [...comments, { id: Date.now(), content: newComment }];
        setComments(updatedComments);
        updateCommentsInPost(updatedComments);
        setNewComment('');
    };

    const editComment = (commentId) => {
        const commentToEdit = comments.find(comment => comment.id === commentId);
        setEditingCommentId(commentId);
        setEditCommentContent(commentToEdit.content);
    };

    const saveEditedComment = (id) => {
        const updatedComments = comments.map(comment =>
            comment.id === id ? { ...comment, content: editCommentContent } : comment
        );
        setComments(updatedComments);
        updateCommentsInPost(updatedComments);
        setEditingCommentId(null);
        setEditCommentContent('');
    };

    const deleteComment = (id) => {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
        updateCommentsInPost(updatedComments);
    };

    return (
        <div>
            <h4>Comments:</h4>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {editingCommentId === comment.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editCommentContent}
                                    onChange={(e) => setEditCommentContent(e.target.value)}
                                />
                                <button onClick={() => saveEditedComment(comment.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                {comment.content}
                                <button onClick={() => editComment(comment.id)}>Edit</button>
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

export default CommentSection;
