const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableBody = document.getElementById("user-entries");

    const tableRows = entries.map((entry) => {
        const row = `
            <tr>
                <td class="border px-4 py-2">${entry.name}</td>
                <td class="border px-4 py-2">${entry.email}</td>
                <td class="border px-4 py-2">${entry.password}</td>
                <td class="border px-4 py-2">${entry.dob}</td>
                <td class="border px-4 py-2">${entry.acceptedTermsAndConditions}</td>
            </tr>`;
        return row;
    }).join('');

    tableBody.innerHTML = tableRows;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTermsAndConditions = document.getElementById('acceptTerms').checked;

    const today = new Date();
    const dobDate = new Date(dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();
    const dayDifference = today.getDate() - dobDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = { name, email, password, dob, acceptedTermsAndConditions };
    let userEntries = retrieveEntries();
    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
};

document.getElementById("user-form").addEventListener("submit", saveUserForm);
displayEntries();
