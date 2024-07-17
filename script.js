document.addEventListener('DOMContentLoaded', function() {
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

    // Handle doctors navigation
    const leftArrow = document.querySelector('.doctors_nav .fa-arrow-left');
    const rightArrow = document.querySelector('.doctors_nav .fa-arrow-right');
    const doctorsGrid = document.querySelector('.doctors_grid');
    let scrollAmount = 200; // Adjust scroll amount as needed

    if (leftArrow && rightArrow && doctorsGrid) {
        leftArrow.addEventListener('click', function() {
            doctorsGrid.scrollLeft -= scrollAmount;
        });

        rightArrow.addEventListener('click', function() {
            doctorsGrid.scrollLeft += scrollAmount;
        });
    }

    // Handle form validation
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            var isValid = true;
            var requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red'; // Indicate error
                } else {
                    field.style.borderColor = ''; // Remove error indication
                }
            });

            if (!isValid) {
                event.preventDefault(); // Prevent form submission if validation fails
                alert('Please fill out all required fields.');
            }
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
