import React from 'react';
import Shell from '../../general/shell/shell';
import CreatePost from '../components/post/createPost';

export default function CreatePostPage({ accessToken, userEmail }) {
    return (
        <Shell>
            <CreatePost accessToken={accessToken} userEmail={userEmail}></CreatePost>
        </Shell>
    )
}