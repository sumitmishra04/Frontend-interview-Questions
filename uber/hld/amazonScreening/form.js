< !DOCTYPE html >
    <html lang="en-US">
        <head>
            <title>Phone Directory</title>
            <link href="./css/style.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
            <main>
                <h1 class="margin20 textCenter fs20">Phone Directory</h1>
                <div class="textCenter">
                    <div class="textCenter inputContent">
                        <div class="txtLeft marginTB40 fb">
                            <form class="txtLeft" onSubmit="event.preventDefault();">
                                <input type="text" id="name" value="" aria-label="Contact Name" placeholder="Contact Name" />
                                <input type="number" maxlength="10" id="mobile" value="" aria-label="Mobile Number" placeholder="Mobile Number" />
                                <input type="email" id="email" value="" aria-label="Email" placeholder="Email" />
                                <input type="submit" class="btn" id="submit" value="Add Vendor" />
                                <div id="error" class="dn error padT10 textCenter">Invalid Input!</div>
                            </form>
                        </div>
                    </div>
                    <form class="marginT40" onSubmit="event.preventDefault();">
                        <label for="search">Search contact by Mobile No:</label>
                        <input type="text" id="search" value="" />
                    </form>
                    <div class="marginT40 padL10 tab cursorPtr" id="contactsSummary">Contacts Summary</div>
                    <div id="contactSummary" class="contactSummary">
                        <table aria-labelledby="contactsSummary" id="summaryTable">
                            <thead>
                                <tr>
                                    <th><button id="nameColumn">Name</button></th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Admin</td>
                                    <td>9999999999</td>
                                    <td>admin@xyzcompany.com</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="noResult" class="noResult dn">No Results Found</div>
                    </div>
                </div>
            </main>
            <script>
                window.contactsList = [{
                    name: 'Admin',
                mobile: '9999999999',
                email: 'admin@xyzcompany.com'
    }];
            </script>
            <script src="./js/script.js" type="text/javascript"></script>
        </body>
    </html>


document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const mobileInput = document.getElementById("mobile");
    const emailInput = document.getElementById("email");
    const submitButton = document.getElementById("submit");
    const errorDiv = document.getElementById("error");
    const summaryTable = document.querySelector("#summaryTable tbody");

    function validateInput(name, mobile, email) {
        const nameRegex = /^.{1,20}$/;  // 1-20 characters
        const mobileRegex = /^\d{10}$/; // Exactly 10 digits
        const emailRegex = /^[^\s@]{2,10}@[^\s@]{2,20}\.[a-zA-Z]{2,}$/; // Custom email rule

        return nameRegex.test(name) && mobileRegex.test(mobile) && emailRegex.test(email);
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
    }

    function hideError() {
        errorDiv.style.display = "none";
    }

    function addContactToTable(contact) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.mobile}</td>
        <td>${contact.email}</td>
      `;
        row.addEventListener("click", () => fillForm(contact));

        // Insert new contacts at the top
        summaryTable.prepend(row);
    }

    function fillForm(contact) {
        nameInput.value = contact.name;
        mobileInput.value = contact.mobile;
        emailInput.value = contact.email;
    }

    submitButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const mobile = mobileInput.value.trim();
        const email = emailInput.value.trim();

        if (!validateInput(name, mobile, email)) {
            showError("Invalid input! Check name, mobile, or email format.");
            return;
        }

        if (window.contactsList.some(contact => contact.mobile === mobile)) {
            showError("Mobile number already exists!");
            return;
        }

        hideError();

        const newContact = { name, mobile, email };
        window.contactsList.unshift(newContact); // Store latest first
        addContactToTable(newContact);

        // Clear form
        nameInput.value = "";
        mobileInput.value = "";
        emailInput.value = "";
    });

    // Load existing contacts in latest-first order
    window.contactsList.reverse().forEach(addContactToTable);
});
