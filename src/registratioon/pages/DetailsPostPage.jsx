import React from 'react';
import Shell from '../../general/shell/shell';
import CreatePost from '../components/post/createPost';
import DetailsPost from '../components/post/detailsPost';

export default function DetailsPostPage({accessToken, userEmail}) {
    return (
        <Shell>
            <DetailsPost accessToken={accessToken} userEmail={userEmail}></DetailsPost>
        </Shell>
    )
}