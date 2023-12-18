let translations = {};

document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();

    const savedLang = localStorage.getItem('language') || 'fr';
    translate(savedLang);

    document.getElementById('languageSwitcher').value = savedLang;

    //laguage icon
    icon="img/icon/"+savedLang+".png";
    document.getElementById('languageSwitcher').style.backgroundImage="url("+icon+")";

    document.getElementById('languageSwitcher').addEventListener('change', function () {
      
        translate(this.value);
        localStorage.setItem('language', this.value);
        //laguage icon
        icon="img/icon/"+this.value+".png";
        document.getElementById('languageSwitcher').style.backgroundImage="url("+icon+")";
    });

        
});

async function loadTranslations() {
    const response = await fetch('../translations.json');
    translations = await response.json();
}

function translate(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key] || el.textContent;
    });
}