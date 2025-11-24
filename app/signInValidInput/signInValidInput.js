export const validLoginInput = (username, password) => {
    const storedLang  = localStorage.getItem("i18nextLng") || 'en'; // Достъп до localStorage само в браузъра
    let errors = {};

    if (!username) {
        errors.username = storedLang === 'en' ? 'Username is required' : 'Потребителското име е задължително';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 6) {
        errors.password =  storedLang === 'en' ? 'Password must be at least 6 characters' : 'Паролата трябва да бъде поне 6 символа';
    }

    return errors;
};
