import React from 'react';
import Shell from '../../general/shell/shell';
import UserProfile from '../components/profile/userProfile';

export default function UserProfilePage({ accessToken }) {
    return (
        <Shell>
            <UserProfile accessToken={accessToken}></UserProfile>
        </Shell>
    )
}