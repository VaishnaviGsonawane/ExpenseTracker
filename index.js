document.addEventListener('DOMContentLoaded', function() {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  function displayExpenses() {
    expenseList.innerHTML = ''; // Clear the previous content
    expenses.forEach(function(expense, index) {
      const listItem = document.createElement('div');
      listItem.classList.add('alert', 'alert-primary', 'mt-2');
      listItem.innerHTML = `
        <span><strong>Amount:</strong> $${expense.amount},</span>
        <span><strong>Description:</strong> ${expense.description},</span>
        <span><strong>Category:</strong> ${expense.category}
        <button class="btn btn-danger btn-sm ml-2 delete-btn" data-index="${index}">Delete</button>
        <button class="btn btn-secondary btn-sm ml-2 edit-btn" data-index="${index}">Edit</button>
      `;
      expenseList.appendChild(listItem);
    });

    // Add event listeners for delete and edit buttons
    expenseList.querySelectorAll('.delete-btn').forEach(function(button) {
      button.addEventListener('click', function() {
        const index = parseInt(button.getAttribute('data-index'));
        expenses.splice(index, 1); // Remove the expense at the specified index
        localStorage.setItem('expenses', JSON.stringify(expenses)); // Update local storage
        displayExpenses(); // Refresh the displayed expenses
      });
    });

    expenseList.querySelectorAll('.edit-btn').forEach(function(button) {
      button.addEventListener('click', function() {
        const index = parseInt(button.getAttribute('data-index'));
        const expense = expenses[index];
        const newAmount = prompt('Enter new amount:', expense.amount);
        const newDescription = prompt('Enter new description:', expense.description);
        const newCategory = prompt('Enter new category:', expense.category);
        if (newAmount !== null && newDescription !== null && newCategory !== null) {
          expense.amount = parseFloat(newAmount);
          expense.description = newDescription;
          expense.category = newCategory;
          localStorage.setItem('expenses', JSON.stringify(expenses)); // Update local storage
          displayExpenses(); // Refresh the displayed expenses
        }
      });
    });
  }

  expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const expenseDescription = document.getElementById('expenseDescription').value;
    const expenseCategory = document.getElementById('expenseCategory').value;
    if (!isNaN(expenseAmount) && expenseDescription && expenseCategory) {
      const newExpense = {
        amount: expenseAmount,
        description: expenseDescription,
        category: expenseCategory
      };
      expenses.push(newExpense); // Add the new expense to the array
      localStorage.setItem('expenses', JSON.stringify(expenses)); // Update local storage
      displayExpenses(); // Refresh the displayed expenses
      expenseForm.reset();
    } else {
      alert('Please enter valid expense details.');
    }
  });

  displayExpenses(); // Initial display of expenses
});
