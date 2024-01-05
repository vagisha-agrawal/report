
import React from 'react';
import { sendEmail } from './EmailSend';

export const FormDataSend = ({ data }) => {
    const [completeTask, pendingTask] = data;

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const emailData = {
            to_name: formData.get('to_name'),
            reply_to: formData.get('reply_to'),
            subject: 'Project Updates',
            message: `Date: ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}\nComplete Task:\n${formatTasks(completeTask)}\n\nPending Task:\n${formatTasks(pendingTask)}`,
        };

        sendEmail(emailData);
    };

    // Convert array of task objects to a plain text string
    const formatTasks = (tasks) => {
        return tasks
            .filter(task => task.text !== "")
            .map(task => `- ${task.text}`)
            .join('\n');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="to_name" placeholder='Name' required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="reply_to" required placeholder='Email' />
            </div>
            <div>
                <label>Subject</label>
                <input type="text" name="subject" placeholder='Subject' />
            </div>
            <input type="submit" value="Send" />
        </form>
    );
};
