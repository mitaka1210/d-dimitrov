//! ERROR input default state

export const validateInput = (username, password, firstName, lastName, email, confirmPassword) => {
    const storedLang  = localStorage.getItem("i18nextLng") || 'en'; // Достъп до localStorage само в браузъра
    let errors = {};
    console.log("pesho valid", firstName);

    // Проверка дали всички полета са попълнени
    if (!username) {
        errors.username = storedLang === 'en' ? 'Username is required' : 'Потребителското име е задължително';
    }
    if (!firstName) {
        errors.firstName = storedLang === 'en' ? 'Username is required' : 'Име е задължително';
    }
    if (!lastName) {
        errors.lastName = storedLang === 'en' ? 'Family Name is required' : 'Фамилията е задължително';

    }
    if (!email) {
        errors.email = storedLang === 'en' ? 'Email is required' : 'Емайла е' +
            ' задължителен';

    }
    if (!password) {
        errors.password = storedLang === 'en' ? 'password is required' : 'Паролата' +
            ' е задължителна';

    }
    if (!confirmPassword) {
        errors.confirmPassword = storedLang === 'en' ? 'confirmPassword is' +
            ' required' : 'Повторете паролата задължително';

    }
    // Проверка дали паролите съвпадат
    if (password !== confirmPassword) {
        errors.password = storedLang === 'en' ? 'Password is not same' : 'Паролите не съвпадата';

    }
    // Проверка за минимална дължина на паролата
    if (password && password.length < 6) {
        errors.password = storedLang === 'en' ? 'Password min length is 6' : 'Паролата трябва да е повече от 6 символа';

    }
    // Проверка за валиден имейл
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
        errors.email = storedLang === 'en' ? 'Email is required' : 'Моля' +
            ' въведете валиден имейл';

    }

    return errors;
};
