import mongoose from "mongoose";
const taskStatus = {
    "TO DO": "To do",
    "IN PROGRESS": "In Progress",
    "BACKLOG": "Backlog",
    "DONE": "Done",
};
const ChecklistSchema = new mongoose.Schema(
    {
        task: String, 
        done: Boolean
    }
);

const TaskSchema = new mongoose.Schema(
    {
        title: String,
        priority: {
            type: String,
        },
        "due date": {
            type: Date,
        },
        status: {
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus["TO DO"],
        },
        checklist: [ChecklistSchema],

        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);


const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;