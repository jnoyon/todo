window.onload = function() {
    main();
}

function main() {
    const inputTaskName = document.getElementById('inputTaskName');
    const inputTaskDesc = document.getElementById('inputTaskDesc');
    const addTask = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    addTask.addEventListener('click', function() {
        const taskName = inputTaskName.value.trim(); // Trim whitespace
        const taskDesc = inputTaskDesc.value.trim(); // Trim whitespace

        // Get selected days
        const daysCheckboxes = document.querySelectorAll('input[name="taskday"]:checked');
        const selectedDays = Array.from(daysCheckboxes).map(checkbox => checkbox.nextElementSibling.textContent).join(', ');

        if (taskName) {
            // Create new list item with the specified structure
            const li = document.createElement('li');
            li.className = 'py-2 border-b border-dashed border-gray-300 flex justify-between items-center gap-2 p-2';

            // Create the first span with the task details
            const taskDetailsSpan = document.createElement('span');
            taskDetailsSpan.className = 'flex gap-3';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = ''; // Set name if needed
            checkbox.id = `task-${Date.now()}`; // Unique ID for the checkbox
            checkbox.className = ''; // Set class if needed
            taskDetailsSpan.appendChild(checkbox);

            const label = document.createElement('label');
            label.htmlFor = checkbox.id; // Associate label with checkbox
            label.className = 'font-bold';
            label.textContent = taskName;

            if (taskDesc) {
                const descSpan = document.createElement('span');
                descSpan.className = 'block text-xs font-normal';
                descSpan.textContent = taskDesc;
                label.appendChild(descSpan);
            }

            if (selectedDays) {
                const daysSpan = document.createElement('span');
                daysSpan.className = 'block text-xs font-normal text-gray-600';
                daysSpan.textContent = `Days: ${selectedDays}`;
                label.appendChild(daysSpan);
            }

            taskDetailsSpan.appendChild(label);

            // Create the second span with the delete icon
            const deleteSpan = document.createElement('span');
            deleteSpan.textContent = '×'; // Delete icon or text
            deleteSpan.className = 'cursor-pointer'; // Add a class for styling and pointer cursor

            // Add click event to deleteSpan to remove the list item
            deleteSpan.addEventListener('click', function() {
                taskList.removeChild(li);
            });

            // Append spans to the list item
            li.appendChild(taskDetailsSpan);
            li.appendChild(deleteSpan);

            // Append the new list item to the task list
            taskList.appendChild(li);

            // Clear the input fields and reset checkboxes
            inputTaskName.value = '';
            inputTaskDesc.value = '';
            daysCheckboxes.forEach(checkbox => checkbox.checked = false);
        }
    });
}
