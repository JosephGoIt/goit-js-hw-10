const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_hgVLmozRnWu8KA5AwXcTnQHagnoN82mIVmdHKvikbJsJw7KLhHIWKYVzJ3B5sXy5";
const breedsURL = `${BASE_URL}/breeds?api_key=${API_KEY}`;

export function fetchBreeds() {
    return fetch(breedsURL)
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Error fetching breeds: ${res.status}`);
            }
            return res.json();
        });
}

export function fetchCatByBreed(breedId) {
    const catByBreedURL = `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`;
    return fetch(catByBreedURL)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error fetching cat by breed: ${res.status}`);
            }
            return res.json();
    });
}
