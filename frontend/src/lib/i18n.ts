import { register, init, locale } from 'svelte-i18n';

register('es', () => import('../locales/es.json'));
register('en', () => import('../locales/en.json'));

init({
    fallbackLocale: 'en',
    initialLocale: 'en' // valor seguro por defecto
});

export { locale };
