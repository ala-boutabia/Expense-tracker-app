// Expense
class Expense {
  constructor(description, amount, category) {
    this.description = description;
    this.amount = amount;
    this.category = category;
  }
}

// UI class: Handle UI Tasks
class UI {
  static displayExpenses() {
    const expenses = storedExpenses;

    expenses.forEach((expense) => {
      UI.addExpenseToList(expense);
    });
  }

  static addExpenseToList(expense) {
    const list = document.querySelector("#expense-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td><a class="btn btn-danger delete">X</a></td>
    `;

    list.appendChild(row);
  }

  // Delete expense
  static deleteBook(ex) {
    if (ex.classList.contains("delete")) {
      ex.parentElement.parentElement.remove();
      // remove td , tr
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("expense-form");
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // Clear Fields
  static clearFields() {
    document.querySelector("#description").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#category").value = "";
  }
}

// Store Class: Handles Storage

// Event: Display Expenses
document.addEventListener("DOMContentLoaded", UI.displayExpenses);

// Event: Add an expense
document.querySelector("#expense-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const description = document.querySelector("#description").value;
  const amount = document.querySelector("#amount").value;
  const category = document.querySelector("#category").value;

  // Validate
  if (description === "" || amount === "" || category === "") {
    //alert("please fill in all fields");
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instantiate an expense
    const expense = new Expense(description, amount, category);

    // Add Expense to UI
    UI.addExpenseToList(expense);

    // Show success message
    UI.showAlert("Expense Added", "success");

    // Clear Fields
    UI.clearFields();
  }
});

// Event: Remove a Book, event propgation
document.querySelector("#expense-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  // Show success message
  UI.showAlert("Expense Deleted", "danger");
});
