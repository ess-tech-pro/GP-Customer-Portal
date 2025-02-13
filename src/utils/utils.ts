export const getValueByLang = (name, lang) => {
  const field = name.find(item => item.lang === lang);
  return field ? field.value : "Unknown";
};

export const formattedOptionTypes = (options) => {
  return options ? options.map(option => ({ value: option, label: option })) : [];
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const getCurrentLanguage = () => localStorage.getItem("currentLanguage") || "en";
