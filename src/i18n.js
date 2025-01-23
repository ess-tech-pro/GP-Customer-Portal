import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import các file dịch
import enTranslation from './public/locales/en/translation.json'
import viTranslation from './public/locales/vi/translation.json'

// Khởi tạo i18n
i18n
	.use(initReactI18next) // Tích hợp React với i18n
	.init({
		resources: {
			en: {
				translation: enTranslation, // Dịch tiếng Anh
			},
			vi: {
				translation: viTranslation, // Dịch tiếng Việt
			},
		},
		fallbackLng: 'en', // Ngôn ngữ mặc định
		debug: true, // Log trong môi trường phát triển
		interpolation: {
			escapeValue: false, // Không cần escape vì React đã xử lý
		},
	})

export default i18n
