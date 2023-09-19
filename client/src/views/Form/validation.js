const nameRegex = new RegExp(/^[a-zA-Z0-9 _]+$/);
const descriptionRegex = new RegExp(/^\s+|\s+$/);
const imageURLRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&=]*)/);

const validation = (data) => {
    let errors = {};

    if (!data.name) {
        errors.name = "This input can't be empty.";
    } else if (data.name.length > 30){
        errors.name = "The name cannot be longer than 30 characters."
    } else if (!nameRegex.test(data.name)){
        errors.name = "The name must contains letters, numbers and spaces only.";
    }

    if (!data.description){
        errors.description = "This field is required";
    } else if (descriptionRegex.test(data.description)) {
        errors.description = "Description cannot be empty or consist of only whitespace.";
    }

    if (data.platforms.length < 1) {
        errors.platforms = "Please add at least one platform."
    }

    if (!data.releaseDate) {
        errors.releaseDate = "Choose a release date.";
    }

    if (!data.rating) {
        errors.rating = "Rate the game.";
    }

    if (!data.image) {
        errors.image = "This input can't be empty.";
    } else if (!imageURLRegex.test(data.image)){
        errors.image = 'Image URL is not valid.';
    }

    if (data.genres.length < 1) {
        errors.genres = 'Please choose at least one genre.'
    }

    return errors;
}

export default validation;