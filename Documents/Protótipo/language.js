const STRINGS_DESCRIPTIONS = {
    pt: [
        "Moldura", "Molde", "Principal", "Menu",
        "Definicoes", "Definicoes Lingua", "Mudou Lingua", "Definicoes de Bloqueio", "Mudou Bloqueio", "Nenhuma Protecao", "PIN", "Padrao", "Impressao Digital",
        "Saude", "Ajuda (Saude)", "Batimento Cardiaco", "Pressao arterial", "Oxigenacao do sangue", "Tempo de sono",
        "SOS", "Ajuda (SOS)",
    ],
    en: [
        "Frame", "Template", "Main", "Menu",
        "Settings", "Language Settings", "Changed Language", "Lock Screen Settings", "Changed Lock", "No Lock", "PIN", "Pattern Lock", "Fingerprint Lock",
        "Health", "Help (Health)", "Heart Rate", "Blood pressure", "Blood Oxygen", "Sleep Time",
        "SOS", "Help (SOS)",
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
        "Protecao de Ecra",
        "Lingua", "Portugues", "Ingles", "Mudou a lingua\npredefinida para\nPortugues",
        "Nenhuma", "PIN", "Padrao", "Impressao Digital", "Mudou o tipo de\nbloqueio do dispositivo"
    ],
    en: [
        "Screen Lock",
        "Language", "Portuguese", "English", "Changed predefined\nlanguage to\nEnglish",
        "None", "PIN", "Pattern", "Fingerprint", "Changed predefined\nlock method"
    ]
}

const STRINGS_HEALTH = {
    pt: [
        "FITNESS", "SOS", "SAUDE", "Batimento Cardiaco", "Pressao Arterial", "Oxigenacao do Sangue", "Tempo de Sono",
        "NO MOMENTO", "HOJE", "SEMANA", "BOM",
        "SISTOLICA", "DIASTOLICA", "RELATORIO",
        "HOJE", "SEMANA", "RELATORIO",
        "HOJE", "SEMANA", "RELATORIO",
        "FITNESS", "SOS", "SAUDE", "NO MOMENTO", "ATRASO DA EMERGENCIA"

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