// Initialize EmailJS with your user ID
emailjs.init('ZDpmnXT0WDx0o4IjJ'); // Replace 'YOUR_USER_ID' with your actual EmailJS user ID

function sendMail() {
    let isValid = true;

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Get form elements
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Name validation
    if (name === '') {
        document.getElementById('nameError').textContent = '*Name is required.';
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = '*Please enter a valid email address.';
        isValid = false;
    }

    // Phone validation
    const phonePattern = /^\d{10}$/;
    if (phone && !phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = '*Phone number must be 10 digits.';
        isValid = false;
    }

    // Message validation
    if (message === '') {
        document.getElementById('messageError').textContent = '*Message is required.';
        isValid = false;
    }

    // If valid, proceed with sending email
    if (isValid) {
        var params = {
            name: name,
            email: email,
            phone: phone,
            message: message,
        };

        const serviceID = "service_s8iphw6";
        const templateID = "template_v88part";

        emailjs.send(serviceID, templateID, params)
            .then(res => {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("message").value = "";
                console.log(res);
                showAlert("Message sent successfully");
            })
            .catch(err => console.log(err));
    }
}

function showAlert(message) {
    const alertBox = document.getElementById('alertBox');
    document.getElementById('alertMessage').textContent = message;
    alertBox.classList.add('show');
    setTimeout(() => alertBox.classList.remove('show'), 3000); // Hide after 3 seconds
}

function closeAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.remove('show');
}


document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired");

    // Handle redirect buttons
    var redirectButtons = document.querySelectorAll('.redirect-button');

    redirectButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var redirectURL = button.getAttribute('data-target');
            if (redirectURL) {
                window.location.href = redirectURL;
            }
        });
    });

    // Handle pricings navigation
    const leftArrow = document.querySelector('.pricings_nav .fa-arrow-left');
    const rightArrow = document.querySelector('.pricings_nav .fa-arrow-right');
    const pricingsGrid = document.querySelector('.pricings_grid');
    let scrollAmount = 200; // Adjust scroll amount as needed

    if (leftArrow && rightArrow && pricingsGrid) {
        leftArrow.addEventListener('click', function() {
            pricingsGrid.scrollLeft -= scrollAmount;
        });

        rightArrow.addEventListener('click', function() {
            pricingsGrid.scrollLeft += scrollAmount;
        });
    }

    // Handle search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.id = 'search-results';
    searchResultsContainer.style.position = 'fixed';
    searchResultsContainer.style.backgroundColor = '#fff';
    searchResultsContainer.style.border = '1px solid #ccc';
    searchResultsContainer.style.padding = '10px';
    searchResultsContainer.style.maxWidth = '300px';
    searchResultsContainer.style.zIndex = '1000';
    searchResultsContainer.style.display = 'none'; // Initially hidden
    document.body.appendChild(searchResultsContainer);

    function hideSearchContainer() {
        searchResultsContainer.style.display = 'none';
    }

    function showSearchContainer() {
        searchResultsContainer.style.display = 'block';
    }

    // Toggle visibility of search results when focusing the input
    searchButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from bubbling up to the document
        showSearchContainer();
    });

    // Hide the search results when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!searchResultsContainer.contains(event.target) && event.target !== searchButton) {
            hideSearchContainer();
        }
    });

    // Prevent hiding the search results when clicking inside the search container
    searchResultsContainer.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    console.log('JavaScript loaded and running');

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            console.log('Search button clicked');
            const query = searchInput ? searchInput.value.toLowerCase() : '';
            console.log('Search query:', query);
            const results = [];

            if (query) {
                // Collect all sections and relevant elements for search
                document.querySelectorAll('section, .header_content, .footer').forEach(el => {
                    const text = el.textContent.toLowerCase();
                    console.log('Checking element:', el); // Debugging
                    if (text.includes(query)) {
                        results.push({
                            title: el.querySelector('h2, h3') ? el.querySelector('h2, h3').textContent : 'Untitled',
                            snippet: text.substr(0, 100) + '...',
                            link: '#' + el.id
                        });
                    }
                });

                displayResults(results);
            } else {
                searchResultsContainer.style.display = 'none'; // Hide results if query is empty
            }
        });
    } else {
        console.error('Search button not found');
    }

    function displayResults(results) {
        searchResultsContainer.innerHTML = '';
        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.innerHTML = `
                    <strong>${result.title}</strong>
                    <p>${result.snippet}</p>
                    <a href="${result.link}" class="result-link">Go to section</a>
                `;
                searchResultsContainer.appendChild(resultItem);
            });
        } else {
            searchResultsContainer.innerHTML = '<p>No results found.</p>';
        }
        searchResultsContainer.style.display = 'block'; // Show results
    }

    // Smooth scrolling for in-page links
    document.querySelectorAll('#search-results a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
