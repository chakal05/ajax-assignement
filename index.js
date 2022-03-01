// Get  elements from document
let results = document.querySelector('.result');
let textResult = document.querySelector('.resultText');
let loading = document.querySelector('.loading');
let errorHandler = document.querySelector('.errorHandler');
let defaultText = document.querySelector('.click');

// Function to populate result list
const populateList = async (category, query) => {
	// Show 'loading...' while waiting for data
	loading.classList.remove('hide');
	loading.classList.add('show');

	// Hide default text
	defaultText.classList.add('hide');

	// First empties list, if not empty
	while (results.firstChild) {
		results.removeChild(results.firstChild);
		textResult.classList.add('hide');
	}

	// Gets data from Api
	try {
		const res = await fetch(
			`https://quote-garden.herokuapp.com/api/v3/${query}/`
		);
		const data = await res.json();
		let response = data.data;

		// Gets 8 elements and put them in the list with styles
		response.slice(1, 9).map((item) => {
			let li = document.createElement('li');
			li.classList.add(
				'margin-3',
				'shadow',
				'rounded',
				'centerText',
				'padding-5'
			);

			// Gives title to the result list
			textResult.textContent = category;
			textResult.classList.remove('hide');

			// If item does not contain a quoteText property, uses item
			li.textContent = item.quoteText || item.toUpperCase();

			results.appendChild(li);

			// Remove 'loading...'
			loading.classList.remove('show');
			loading.classList.add('hide');
		});
	} catch (error) {
		// Handles and displays error
		errorHandler.textContent = error;
	}
};

// Buttons handlers
const getQuotes = () => {
	populateList('QUOTES', 'quotes');
};

const getAuthors = () => {
	populateList('AUTHORS', 'authors');
};

const getGenres = () => {
	populateList('GENRES', 'genres');
};
