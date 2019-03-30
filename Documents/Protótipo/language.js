const STRINGS_DESCRIPTIONS = {
    pt: [
        "Moldura", "Molde", "Principal", "Impressao Digital", "Menu",
        "Definicoes", "Definicoes Lingua", "Mudou Lingua",
        "Saude", "Ajuda (Saude)", "Batimento Cardiaco", "Pressao arterial", "Oxigenacao do sangue", "Tempo de sono",
        "SOS", "No momento", "Atraso da emergencia"
    ],
    en: [
        "Frame", "Template", "Main", "Fingerprint Lock", "Menu",
        "Settings", "Language Settings", "Changed Language",
        "Health", "Help (Health)", "Heart Rate", "Blood pressure", "Blood Oxygen", "Sleep Time",
        "SOS", "Live monitoring", " Emergency delay"
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
        "FITNESS", "SOS", "SAUDE", "Batimento Cardiaco", "Pressao Arterial", "Oxigenacao do Sangue", "Tempo de Sono",
        "NO MOMENTO", "HOJE", "SEMANA", "BOM",
        "SISTOLICA", "DIASTOLICA", "RELATORIO",
        "HOJE", "SEMANA", "RELATORIO",
        "HOJE", "SEMANA", "RELATORIO",
        "FITNESS", "SOS", "SAUDE","NO MOMENTO" ," ATRASO DA EMERGENCIA"

    ],
    en: [
        "FITNESS", "SOS", "HEALTH", "Heart Rate", "Blood Pressure", "Blood Oxygen", "Sleep Time",
        "LIVE", "TODAY", "WEEKLY", "GOOD",
        "SYSTOLIC", "DIASTOLIC", "REPORT",
        "TODAY", "WEEKLY", "REPORT",
        "TODAY", "WEEKLY", "REPORT",
        "FITNESS", "SOS", "HEALTH", "LIVE MONITORING", "EMERGENCY DELAY"
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