import React from 'react';
import Shell from '../../general/shell/shell';
import ListPostsFavorite from '../components/post/listPostsFavorite';

export default function ListPostsFavoritePage({accessToken, userEmail}) {


    return (
        <Shell>
            <ListPostsFavorite accessToken={accessToken} userEmail={userEmail}></ListPostsFavorite>
        </Shell>
    )
}