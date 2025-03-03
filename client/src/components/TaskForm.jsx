import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TASK } from '../../utils/mutations';

import Auth from '../../utils/auth';

const TasksForm = ({ profileId }) => {
    const [addTask, { error }] = useMutation(ADD_TASK);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addTask({
                variables: { profileId, task },
            });

            setTask('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h4>Endorse some more tasks below.</h4>

            {Auth.loggedIn() ? (
                <form
                    className="flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                >
                    <div className="col-12 col-lg-9">
                        <input
                            placeholder="Endorse some tasks..."
                            value={task}
                            className="form-input w-100"
                            onChange={(event) => setTask(event.target.value)}
                        />
                    </div>

                    <div className="col-12 col-lg-3">
                        <button className="btn btn-info btn-block py-3" type="submit">
                            Endorse Task // Changed Skill to Task
                        </button>
                    </div>
                    {error && (
                        <div className="col-12 my-3 bg-danger text-white p-3">
                            {error.message}
                        </div>
                    )}
                </form>
            ) : (
                <p>
                    You need to be logged in to endorse tasks. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default TasksForm;

