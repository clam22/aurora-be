import { projects } from "../data/projectData.js";
import { authorize } from "../middlewares/authorize.js";
import { handleResponse } from "../middlewares/responseHandler.js";
import { canViewProject } from "../policies/projectPolicy.js";

export const viewProject = (req, res) => {
    const projectId = req.params.id;
    const project = getProjectById(projectId);
    console.log("Project is : ", project);
    authorize(canViewProject, project)(req, res, () => [
        handleResponse(res, 200, "Project retrieved successfully")
    ]);
    
};
export const updateProject = (req, res) => {
    const projectId = req.params.id;
    const project = getProjectById(projectId);
    console.log("Project is : ", project);
    authorize(updateProjectViewProject, project)(req, res, () => [
        handleResponse(res, 200, "Project updated successfully")
    ]);
};

const getProjectById = (id, res) => {
    const project = projects.find((project) => project.id === id);
    if (!project){
       handleResponse(res, 404, "Project not found") 
    }
}