

import { useTranslation } from 'react-i18next';

const Examples = () => {
    const { t } = useTranslation();

    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold text-center my-8">{t('welcome')}</h2>
            <h2 className="text-3xl font-semibold text-center my-8">{t('description')}</h2>
        </div>
    );
}

export default Examples;
