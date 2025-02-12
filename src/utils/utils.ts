export const getValueByLang = (name, lang) => {
    const field = name.find(item => item.lang === lang);
    return field ? field.value : "Unknown";
};

export const formattedOptionTypes = (options) => {
    return options ? options.map(option => ({ value: option, label: option })) : [];
};