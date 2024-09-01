window.onload = function() {
    main();
}

function main() {
    const inputTaskName = document.getElementById('inputTaskName');
    const inputTaskDesc = document.getElementById('inputTaskDesc');
    const addTask = document.getElementById('addTask');

    addTask.addEventListener('click', function() {
        const taskName = inputTaskName.value.trim();
        const taskDesc = inputTaskDesc.value.trim();

        // Get selected days
        const daysCheckboxes = document.querySelectorAll('input[name="taskday"]:checked');
        const selectedDays = Array.from(daysCheckboxes).map(checkbox => checkbox.id);

        if (taskName) {
            selectedDays.forEach(dayId => {
                const dayList = document.getElementById(`${dayId}List`);
                if (dayList) {
                    const li = document.createElement('li');
                    li.className = 'py-2 border-b border-dashed border-gray-300 flex justify-between items-center gap-2 p-2';

                    const taskDetailsSpan = document.createElement('span');
                    taskDetailsSpan.className = 'flex gap-3';

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `task-${Date.now()}`;
                    taskDetailsSpan.appendChild(checkbox);

                    const label = document.createElement('label');
                    label.htmlFor = checkbox.id;
                    label.className = 'font-bold';
                    label.textContent = taskName;

                    if (taskDesc) {
                        const descSpan = document.createElement('span');
                        descSpan.className = 'block text-xs font-normal';
                        descSpan.textContent = taskDesc;
                        label.appendChild(descSpan);
                    }

                    taskDetailsSpan.appendChild(label);

                    const deleteSpan = document.createElement('span');
                    deleteSpan.textContent = '×';
                    deleteSpan.className = 'cursor-pointer';
                    deleteSpan.setAttribute('aria-label', 'Delete Task');

                    deleteSpan.addEventListener('click', function() {
                        if (confirm('Are you sure you want to delete this task?')) {
                            dayList.removeChild(li);
                        }
                    });

                    li.appendChild(taskDetailsSpan);
                    li.appendChild(deleteSpan);

                    dayList.appendChild(li);
                }
            });

            inputTaskName.value = '';
            inputTaskDesc.value = '';
            daysCheckboxes.forEach(checkbox => checkbox.checked = false);
        } else {
            alert('Please enter a task name.');
        }
    });
}
