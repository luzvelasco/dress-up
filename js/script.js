document.addEventListener('DOMContentLoaded', function () {
    // default state
    const state = {
        currentBody: 'body1',
        currentOutfit: 'outfit1'
    };

    // ----------------------------------- IMAGE SET UP -----------------------------------

    // images
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
        { id: 'outfit6', name: 'Outfit 6' },
        { id: 'outfit7', name: 'Outfit 7' }
    ];

    // ----------------------------------- DOM Elements -----------------------------------

    const bodyOptionsContainer = document.getElementById('body-options');
    const outfitOptionsContainer = document.getElementById('outfit-options');
    const bodyDisplay = document.getElementById('body-display');
    const outfitDisplay = document.getElementById('outfit-display');
    const openCardBtn = document.getElementById('openCardBtn');
    const cardPopup = document.getElementById('cardPopup');
    const closePopup = document.getElementById('closePopup');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // ----------------------------------- GAME FUNCTIONS -----------------------------------

    // start function
    function init() {
        // add available body options
        bodyOptions.forEach(body => {
            const optionElement = createOptionElement(body, 'body');
            bodyOptionsContainer.appendChild(optionElement);
        });

        // add available outfit options
        outfitOptions.forEach(outfit => {
            const optionElement = createOptionElement(outfit, 'outfit');
            outfitOptionsContainer.appendChild(optionElement);
        });

        // event listeners
        openCardBtn.addEventListener('click', openCardPopup);
        closePopup.addEventListener('click', closeCardPopup);

        // tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                switchTab(tabId);
            });
        });

        // initial selection
        selectOption('body', 'body1');
        selectOption('outfit', 'outfit1');
    }

    // tab menu switch
    function switchTab(tabId) {
        // update content in active tab
        tabs.forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // show content in active tab
        tabContents.forEach(content => {
            if (content.id === `${tabId}-content`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    // add the available options to the menu
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

    // select body/outfit options
    function selectOption(type, id) {
        if (type === 'body') {
            state.currentBody = id;

            // selection hightlight
            document.querySelectorAll('.option[data-type="body"]').forEach(opt => {
                opt.classList.remove('selected');
            });
            document.querySelector(`.option[data-type="body"][data-id="${id}"]`).classList.add('selected');

            // update display
            bodyDisplay.style.backgroundImage = `url('img/${id}.png')`;
        } else if (type === 'outfit') {
            state.currentOutfit = id;

            // selection hightlight
            document.querySelectorAll('.option[data-type="outfit"]').forEach(opt => {
                opt.classList.remove('selected');
            });
            document.querySelector(`.option[data-type="outfit"][data-id="${id}"]`).classList.add('selected');

            // update display
            outfitDisplay.style.backgroundImage = `url('img/${id}.png')`;
        }
    }

    // ----------------------------------- CARD POPUP -----------------------------------

    function openCardPopup() {
        cardPopup.style.display = 'flex';
    }

    function closeCardPopup() {
        cardPopup.style.display = 'none';
    }

    // ----------------------------------- BIRTHDAY LETTER PROTECTED BY PASSWORD -----------------------------------

    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const cardLinkContainer = document.getElementById('cardLinkContainer');

    passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const enteredPassword = passwordInput.value.trim().toLowerCase();

        if (enteredPassword === 'begone geese') {
                cardLinkContainer.innerHTML = `
                <a href="https://docs.google.com/document/d/e/2PACX-1vQZmI5qyt2eBnCshS2wXEwRyNFsr8K56HamL-dL726WkHXCU1jvi4GLHRIOyyrqx2P7JOriDvz78ThI/pub" target="_blank">here</a>
            `;
        } else {
            alert('try with lowercase letters');
            passwordInput.value = '';
        }
    });


    // close popup when clicking outside content
    cardPopup.addEventListener('click', function (e) {
        if (e.target === cardPopup) {
            closeCardPopup();
        }
    });

    // start the game
    init();
});