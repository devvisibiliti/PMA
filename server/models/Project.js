import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,                // strip leading/trailing whitespace
    },
    description: {
    type: String,
    required: true,
    trim: true,
    },
    startDate: {
    type: Date,
    required: true,
},
    endDate: {
    type: Date,
    required: true,
    // custom validator: endDate must come after startDate
    validate: {
    validator: function (value) {
        return value >= this.startDate;
    },
    message: 'End date must be on or after the start date',
    },
},
status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
},
}, {
  timestamps: true,           // adds createdAt / updatedAt
});

// Export the model
export default mongoose.model('Project', projectSchema);
