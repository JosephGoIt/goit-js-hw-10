import { fetchBreeds, fetchCatByBreed} from "./cat-api";
import SlimSelect from "slim-select";

const breedSelectEl = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");

errorEl.classList.add("is-hidden");

// Function to load breeds
function chooseBreed() {
    fetchBreeds()
        .then(populateBreeds)
        .catch(onError);
}

// Function to populate breed options
function populateBreeds(data) {
    loaderEl.classList.replace("loader", "is-hidden");
    let optionsMarkup = data.map(({ name, id }) => `<option value="${id}">${name}</option>`).join("");
    breedSelectEl.insertAdjacentHTML("beforeend", optionsMarkup);
    breedSelectEl.classList.remove("is-hidden");

    // Initialize SlimSelect after options are loaded
    //Sir ang panget ng SlimSelect, di ko na lang ginamit
    // const slimSelect = new SlimSelect({select: breedSelectEl, settings: {alwaysOpen:false,}});
}

chooseBreed();

// Function to handle breed selection change
function handleBreedChange(e) {
    loaderEl.classList.replace("is-hidden", "loader");
    catInfoEl.classList.add("is-hidden");
    const breedId = e.target.value;
    fetchCatByBreed(breedId)
        .then(data => {
            const { url, breeds } = data[0];
            const { name, description, temperament } = breeds[0];
            catInfoEl.innerHTML = `
                <img src="${url}" alt="${name}" width="400"/>
                <div class="box">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p>${temperament}</p>
                </div>
            `;
            catInfoEl.classList.remove("is-hidden");
            loaderEl.classList.add("is-hidden");
        })
        .catch(onError);
}

// Function to handle error
function onError(error) {
    errorEl.textContent = `Error: ${error.message}`;
    errorEl.classList.remove("is-hidden");
    breedSelectEl.classList.add("is-hidden");
}

// Event listener for breed selection change
breedSelectEl.addEventListener("change", handleBreedChange);