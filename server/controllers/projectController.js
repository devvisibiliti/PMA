import Project from '../models/Project.js';


export const createProject = async (req, res) => {
    const { name, description, startDate, endDate, status } = req.body;

    try {
        const newProject = new Project({
            name,
            description,
            startDate,
            endDate,
            status
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        }
        else if (error.name === 'MongoError' && error.code === 11000) {
            res.status(400).json({ message: 'Project with this name already exists.' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
}


export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
        if (!projects) return res.status(404).json({ message: 'No projects found' });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
