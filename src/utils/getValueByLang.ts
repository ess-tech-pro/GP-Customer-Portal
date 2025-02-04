export const getValueByLang = (name, lang) => {
    const field = name.find(item => item.lang === lang);
    return field ? field.value : "Unknown";
};
