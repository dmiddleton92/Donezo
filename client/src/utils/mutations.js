import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
mutation addProfile($input: ProfileInput!) {
    addProfile(input: $input) {
    token
    profile {
        _id
        name
    }
    }
}
`;

export const ADD_TASK = gql`
mutation addTask($profileId: ID!, $task: String!) {
    addTask(profileId: $profileId, task: $task) {
    _id
    name
    tasks
    }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    profile {
        _id
        name
    }
    }
}
`;

export const REMOVE_TASK = gql`
mutation removeTask($task: String!) {
    removeTask(task: $task) {
    _id
    name
    tasks
    }
}
`;