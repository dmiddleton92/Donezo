import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TaskList from '../components/TaskList'; 
import TaskForm from '../components/TaskForm'; 

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
    const { profileId } = useParams();

    const { loading, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
        {
            variables: { profileId: profileId },
        }
    );


    const profile = data?.me || data?.profile || {};


    if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile?.name) {
        return (
            <h4>
                You need to be logged in to see your profile page. Use the navigation
                links above to sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            <h2 className="card-header">
                {profileId ? `${profile.name}'s` : 'Your'} friends have endorsed these
                tasks...
            </h2>

            {profile.tasks?.length > 0 && (
                <TaskList
                    tasks={profile.tasks}
                    isLoggedInUser={!profileId && true}
                />
            )}

            <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
                <TaskForm profileId={profile._id} />
            </div>
        </div>
    );
};

export default Profile;