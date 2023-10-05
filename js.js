document.addEventListener('DOMContentLoaded', () => {
    // When the DOM is fully loaded, execute this code block.

    const searchButton = document.querySelector("#searchButton");

    const cardName = document.querySelector("#cardName");
    const cardImage = document.querySelector("#cardImage");
    const cardType = document.querySelector("#cardType");
 const cardAttribute = document.querySelector("#cardAttribute");
const cardLevel = document.querySelector("#cardLevel");
    const cardDescription = document.querySelector("#cardDescription");
   const inputBar = document.querySelector("#inputBar");
    // Get a reference to the input element where the user enters the card name.

    searchButton.addEventListener('click', async () => {
        // Add a click event listener to the search button 

        const cardNameValue = inputBar.value.trim();


        console.log(cardNameValue, "cardname");
     

        if (cardNameValue) {
            // Check if the card name value is not empty.

            try {
                

                const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardNameValue)}`);
                // Send a request to the YugiOh card API with the entered card name

                if (response.status === 200) {
                    // Check if the response status code is 200

                    const card = response.data.data[0];

                    cardName.textContent = card.name;

                    cardImage.src = card.card_images[0].image_url;

                    cardType.textContent = `Card Type: ${card.type}`;

                    cardAttribute.textContent = `Attribute: ${card.attribute}`;

                    cardLevel.textContent = `Level/Rank: ${card.level}`;

                    cardDescription.textContent = `Card Description: ${card.desc}`;
                  // Set the card info like name and level and type

                } else {
                    // If the response status is not 200 log an error with the status and status text
                    console.error("Error fetching data:", response.status, response.statusText);

                    // Clear the card data from the HTML elements.
                    clearCardData();
                }
            } catch (error) {
                // If there's an error in the try block execute this code

                console.error("Error fetching data:", error);
                // Log an error message

                clearCardData();
                // Clears the card data
            }
        }
    });

    // Function to clear card data 
    function clearCardData() {
        cardName.textContent = "";
        cardImage.src = "";
        cardType.textContent = "";
        cardAttribute.textContent = "";
        cardLevel.textContent = "";
        cardDescription.textContent = "";
    }
});
