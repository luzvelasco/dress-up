document.addEventListener('DOMContentLoaded', function () {
    // Game state
    const state = {
        currentBody: 'body1',
        currentOutfit: 'outfit1'
    };

    // Image data - in a real implementation, these would be paths to your PNG files
    const bodyOptions = [
        { id: 'body1', name: 'Body 1' },
        { id: 'body2', name: 'Body 2' },
        { id: 'body3', name: 'Body 3' },
        { id: 'body4', name: 'Body 4' }
    ];

    const outfitOptions = [
        { id: 'outfit1', name: 'Outfit 1' },
        { id: 'outfit2', name: 'Outfit 2' },
        { id: 'outfit3', name: 'Outfit 3' },
        { id: 'outfit4', name: 'Outfit 4' },
        { id: 'outfit5', name: 'Outfit 5' },
        { id: 'outfit6', name: 'Outfit 6' }
    ];

    // DOM Elements
    const bodyOptionsContainer = document.getElementById('body-options');
    const outfitOptionsContainer = document.getElementById('outfit-options');
    const bodyDisplay = document.getElementById('body-display');
    const outfitDisplay = document.getElementById('outfit-display');
    // const resetBodyBtn = document.getElementById('resetBodyBtn');
    // const resetOutfitBtn = document.getElementById('resetOutfitBtn');
    const openCardBtn = document.getElementById('openCardBtn');
    const cardPopup = document.getElementById('cardPopup');
    const closePopup = document.getElementById('closePopup');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Initialize the game
    function init() {
        // Populate body options
        bodyOptions.forEach(body => {
            const optionElement = createOptionElement(body, 'body');
            bodyOptionsContainer.appendChild(optionElement);
        });

        // Populate outfit options
        outfitOptions.forEach(outfit => {
            const optionElement = createOptionElement(outfit, 'outfit');
            outfitOptionsContainer.appendChild(optionElement);
        });

        // Set up event listeners
        // resetBodyBtn.addEventListener('click', resetBody);
        // resetOutfitBtn.addEventListener('click', resetOutfit);
        openCardBtn.addEventListener('click', openCardPopup);
        closePopup.addEventListener('click', closeCardPopup);

        // Set up tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                switchTab(tabId);
            });
        });

        // Set initial selection
        selectOption('body', 'body1');
        selectOption('outfit', 'outfit1');
    }

    // Switch between tabs
    function switchTab(tabId) {
        // Update active tab
        tabs.forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Show active tab content
        tabContents.forEach(content => {
            if (content.id === `${tabId}-content`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    // Create option element
    function createOptionElement(item, type) {
        const option = document.createElement('div');
        option.className = 'option';
        option.dataset.id = item.id;
        option.dataset.type = type;

        option.innerHTML = `
                    <img src="img/${item.id}.png" alt="${item.name}">
                `;

        option.addEventListener('click', () => {
            selectOption(type, item.id);
        });

        return option;
    }

    // Select an option
    function selectOption(type, id) {
        if (type === 'body') {
            state.currentBody = id;

            // Update UI
            document.querySelectorAll('.option[data-type="body"]').forEach(opt => {
                opt.classList.remove('selected');
            });
            document.querySelector(`.option[data-type="body"][data-id="${id}"]`).classList.add('selected');

            // Update display
            bodyDisplay.style.backgroundImage = `url('img/${id}.png')`;
            // bodyDisplay.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; font-size:100px;">👤</div>`;
        } else if (type === 'outfit') {
            state.currentOutfit = id;

            // Update UI
            document.querySelectorAll('.option[data-type="outfit"]').forEach(opt => {
                opt.classList.remove('selected');
            });
            document.querySelector(`.option[data-type="outfit"][data-id="${id}"]`).classList.add('selected');

            // Update display
            outfitDisplay.style.backgroundImage = `url('img/${id}.png')`;
            // outfitDisplay.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; font-size:100px;">👕</div>`;
        }
    }

    // Open birthday card popup
    function openCardPopup() {
        cardPopup.style.display = 'flex';
    }

    // Close birthday card popup
    function closeCardPopup() {
        cardPopup.style.display = 'none';
    }

    // Password form logic
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const cardLinkContainer = document.getElementById('cardLinkContainer');

    passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const enteredPassword = passwordInput.value.trim().toLowerCase();

        if (enteredPassword === 'begone geese') {
            cardLinkContainer.innerHTML = `
            <a href="https://docs.google.com/document/d/1jxNVXsPE1AxIzja_iLqUwRoKrNthy9MeAb68D2raDAI/edit?usp=sharing" target="_blank">here</a>
        `;
        } else {
            alert('try with lowercase letters');
            passwordInput.value = '';
        }
    });


    // Close popup when clicking outside content
    cardPopup.addEventListener('click', function (e) {
        if (e.target === cardPopup) {
            closeCardPopup();
        }
    });

    // Initialize the game
    init();
});