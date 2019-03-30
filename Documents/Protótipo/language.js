const STRINGS_DESCRIPTIONS = {
    pt: [
        "Moldura", "Molde", "Principal", "Impressao Digital", "Menu",
        "Definicoes", "Definicoes Lingua", "Mudou Lingua",
        "Saude", "Ajuda (Saude)"
    ],
    en: [
        "Frame", "Template", "Main", "Fingerprint Lock", "Menu",
        "Settings", "Language Settings", "Changed Language",
        "Health", "Help (Health)"
    ]
};

const STRINGS_OTHERS = {
    pt: [
        "GRUPO DE AMIGOS",
        "Ajuda"
    ],
    en: [
        "FRIENDS GROUP",
        "Help"
    ]
}

const STRINGS_SETTINGS = {
    pt: [
        "Protecao de Ecra", "Lingua", "Portugues", "Ingles", "Mudou a lingua\npredefinida para\nPortugues"
    ],
    en: [
        "Screen Lock", "Language", "Portuguese", "English", "Changed predefined\nlanguage to\nEnglish"
    ]
}

const STRINGS_HEALTH = {
    pt: [
        "FITNESS", "SOS", "SAUDE"
    ],
    en: [
        "FITNESS", "SOS", "HEALTH"
    ]
}

var language;
var descriptions;
var others;
var settings;
var health;

change_language("pt");

function change_language(change) {
    language = change;
    switch (change) {
        case "pt":
            descriptions = STRINGS_DESCRIPTIONS.pt;
            others = STRINGS_OTHERS.pt;
            settings = STRINGS_SETTINGS.pt;
            health = STRINGS_HEALTH.pt;
            break;
        case "en":
            descriptions = STRINGS_DESCRIPTIONS.en;
            others = STRINGS_OTHERS.en;
            settings = STRINGS_SETTINGS.en;
            health = STRINGS_HEALTH.en;
            break;
    }
}