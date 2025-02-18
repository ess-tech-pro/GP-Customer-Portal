import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import các file dịch
import enCommon from "./public/locales/en/common.json";
import viCommon from "./public/locales/vi/common.json";
import enRegisterGame from "./public/locales/en/registerGame.json";
import viRegisterGame from "./public/locales/vi/registerGame.json";
import enPublicGame from "./public/locales/en/publicGame.json";
import viPublicGame from "./public/locales/vi/publicGame.json";

// Khởi tạo i18n
i18n
  .use(initReactI18next) // Tích hợp React với i18n
  .init({
    resources: {
      en: {
        common: enCommon,
        registerGame: enRegisterGame,
        publicGame: enPublicGame,
      },
      vi: {
        common: viCommon,
        registerGame: viRegisterGame,
        publicGame: viPublicGame,
      },
    },
    fallbackLng: "en", // Ngôn ngữ mặc định
    ns: ["common", "registerGame", "publicGame"], // Danh sách namespace
    defaultNS: "common", // Namespace mặc định
    debug: false, // Log trong môi trường phát triển
    interpolation: {
      escapeValue: false, // Không cần escape vì React đã xử lý
    },
  });

export default i18n;
