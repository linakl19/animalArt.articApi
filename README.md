Animal Art Showcase

Welcome to the Animal Art Showcase! This website allows you to explore a curated selection of animal-themed artworks from the Art Institute of Chicago. Whether you love horses, elephants, or peacocks, you can discover stunning pieces of art featuring your favorite animals.

Features

Browse animal-themed artworks.
View detailed information about each artwork and the artist.
Responsive design for an optimal viewing experience on all devices.
Installation

Clone the repository:
bash
Copy code
git clone https://github.com/linakl19/animal-art-showcase.git
Navigate to the project directory:
bash
Copy code
cd animal-art-showcase
Open index.html in your web browser.
Usage

Open the index.html file in your preferred web browser.
Select an animal from the navigation bar to view related artworks.
Click on an artwork to see detailed information about it and the artist.
Code Overview

HTML
The HTML structure includes a header, navigation bar, main content area, and footer. The navigation bar allows users to select different animals to view related artworks.

JavaScript
The JavaScript code handles fetching data from the Art Institute of Chicago API and updating the DOM with artwork and artist details. Key functions include:

displayArtworkContent(artwork_id, img_id): Fetches and displays artwork details.
displayArtistContent(artist_id): Fetches and displays artist details.
updateArtworkTitleDiv(data): Updates the artwork title section.
updateArtworkImage(data, img_id): Updates the artwork image.
updateArtworkInfoTable(data): Updates the artwork info table.
updateArtistInfo(data): Updates the artist info table.
CSS
The style.css file contains styles for the layout and design of the website, ensuring a responsive and visually appealing user interface.

API

This project uses the Art Institute of Chicago API to fetch public domain artworks and artist information.

Base URL: https://api.artic.edu/api/v1/
Endpoints used:
/artworks/search: Searches for artworks.
/agents/{id}: Fetches details about an artist.
Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the existing style and passes all tests.
