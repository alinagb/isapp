import React from 'react';
import Shell from '../../general/shell/shell';
import Profile from '../components/profile/profile';

export default function ProfilePage({ accessToken, userEmail }) {
    return (
        <Shell>
            <Profile accessToken={accessToken} userEmail={userEmail}></Profile>
        </Shell>
    )
}