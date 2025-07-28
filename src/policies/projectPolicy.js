export const canViewProject = (user, project) => {
    return(
        user.role === 'admin' ||
        user.department === project.department ||
        (user.accessLevel >= 3 && project.status === 'active') ||
        (user.accessLevel >= 2 && project.status === 'archived' && project.members.includes(user.id))
    )
};

export const canUpdateProject = (user, project) => {
    return(
        user.role === 'admin' ||
        (user.department === project.department && user.accessLevel >= 3) ||
        (user.accessLevel >= 4 && project.members.includes(user.id))
    );
}