import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_TASK } from '../utils/mutations';
import { QUERY_TASKS } from '../utils/queries';

const TaskLists = ({ tasks = [], isLoggedInUser }) => {
    const [removeTask, { error }] = useMutation(REMOVE_TASK, {
        refetchQueries: [
            QUERY_ME,
            'me'
        ]
    });

    const handleRemoveTask = async (task) => {
        try {
            await removeTask({
                variables: { task },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (!tasks.length) {
        return <h3>No Tasks Yet</h3>;
    }

    return (
        <div>
            <div className="flex-row justify-space-between my-4">
                {tasks &&
                    tasks.map((task) => (
                        <div key={task} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                                    <span>{task}</span>
                                    {isLoggedInUser && (
                                        <button
                                            className="btn btn-sm btn-danger ml-auto"
                                            onClick={() => handleRemoveTask(task)}
                                        >
                                            X
                                        </button>
                                    )}
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
            {error && (
                <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
        </div>
    );
};

export default TaskLists;


