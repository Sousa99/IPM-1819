const STRINGS_DESCRIPTIONS = {
	pt: {
		frame: 'Moldura',
		template: 'Molde',
		main: 'Principal',
		menu: 'Menu',

		settings: 'Definicoes',
		language_settings: 'Definicoes Lingua',
		changed_language: 'Mudou Lingua',
		lock_settings: 'Definicoes de Bloqueio',
		changed_lock: 'Mudou Bloqueio',
		no_lock: 'Nenhuma Protecao',
		pin_lock: 'PIN',
		pattern_lock: 'Padrao',
		fingerprint_lock: 'Impressao Digital',

		health: 'Saude',
		health_help: 'Ajuda (Saude)',
		heart_rate: 'Batimento Cardiaco',
		blood_pressure: 'Pressao Arterial',
		blood_oxygen: 'Oxigenacao do Sangue',
		sleep_time: 'Tempo de Sono',
		sos: 'SOS',
		sos_help: 'Ajuda (SOS)',
		fitness: 'Fitness',
		fitness_help: 'Ajuda (Fitness)',
		energy: 'Energia',
		activity: 'Atividade',
		nutrition: 'Nutricao',
		choose_activity: 'Escolher atividade'
	},

	en: {
		frame: 'Frame',
		template: 'Template',
		main: 'Main',
		menu: 'Menu',

		settings: 'Settings',
		language_settings: 'Language Settings',
		changed_language: 'Changed Language',
		lock_settings: 'Lock Screen Settings',
		changed_lock: 'Changed Lock',
		no_lock: 'No Lock',
		pin_lock: 'PIN',
		pattern_lock: 'Pattern Lock',
		fingerprint_lock: 'Fingerprint Lock',

		health: 'Health',
		health_help: 'Help (Health)',
		heart_rate: 'Heart Rate',
		blood_pressure: 'Blood Pressure',
		blood_oxygen: 'Blood Oxygen',
		sleep_time: 'Sleep Time',
		sos: 'SOS',
		sos_help: 'Help (SOS)',

		fitness: 'Fitness',
		fitness_help: 'Help (Fitness)',
		energy: 'Energy',
		activity: 'Activity',
		nutrition: 'Nutrition',
		choose_activity: 'Choose Activity'
	}
};

const STRINGS_OTHERS = {
	pt: {
		friends_group: 'GRUPO DE AMIGOS',
		help: 'Ajuda'
	},
	en: {
		friends_group: 'FRIENDS GROUP',
		help: 'Help'
	}
};

const STRINGS_SETTINGS = {
	pt: {
		lock_protection: 'Protecao de Ecra',
		language: 'Lingua',
		portuguese: 'Portugues',
		english: 'Ingles',
		message_changed_language: 'Mudou a lingua\npredefinida para\nPortugues',
		none: 'Nenhuma',
		pin: 'PIN',
		pattern: 'Padrao',
		fingerprint: 'Impressao Digital',
		message_changed_lock: 'Mudou o tipo de\nbloqueio do dispositivo',
		touch_screen_to_unlock: 'Toque no ecra para desbloquear'
	},
	en: {
		lock_protection: 'Screen Lock',
		language: 'Language',
		portuguese: 'Portuguese',
		english: 'English',
		message_changed_language: 'Changed predefined\nlanguage to\nEnglish',
		none: 'None',
		pin: 'PIN',
		pattern: 'Pattern',
		fingerprint: 'Fingerprint',
		message_changed_lock: 'Changed predefined\nlock method',
		touch_screen_to_unlock: 'Touch the screen to unlock device'
	}
};

const STRINGS_HEALTH = {
	pt: {
		fitness: 'FITNESS',
		sos: 'SOS',
		health: 'SAUDE',
		heart_rate: 'Batimento Cardiaco',
		blood_pressure: 'Pressao Arterial',
		blood_oxygen: 'Oxigenacao do Sangue',
		sleep_time: 'Tempo de Sono',
		at_the_moment: 'No Momento',
		today: 'Hoje',
		week: 'Semana',
		bad: 'MAU',
		ok: 'OK',
		good: 'BOM',
		excellent: 'EXCELENTE',
		systolic: 'Sistolica',
		diastolic: 'Diastolica',
		report: 'Relatorio',
		live: 'No Momento',
		emergency_delay: 'Atraso da Emergencia',
		energy: 'Energia',
		activity: 'Atividade',
		nutrition: 'Nutricao',
		units: 'Unidades',
		distance: 'Distancia',
		steps: 'Passos',
		elevation: 'Elevacao',
		start_activity: 'COMECAR ATIVIDADE',
		vitamins: 'Vitaminas',
		proteins: 'Proteinas',
		water: 'Water',
		fat: 'Gorduras',
		calcium: 'Calcio',
		call_emergency: 'CHAMAR EMERGENCIA',
		press_3_seconds: 'Premir por 3 segundos',
		help_on_the_way: 'AJUDA A CAMINHO',
		press_5_seconds_cancel: 'Premir por 5 segundos\npara cancelar',
		km: 'Km',
		floors: 'Andares',
		cal: 'Cal'
	},
	en: {
		fitness: 'FITNESS',
		sos: 'SOS',
		health: 'HEALTH',
		heart_rate: 'Heart Rate',
		blood_pressure: 'Blood Pressure',
		blood_oxygen: 'Blood Oxygen',
		sleep_time: 'Sleep Time',
		at_the_moment: 'Live',
		today: 'Today',
		week: 'Weekly',
		bad: 'BAD',
		ok: 'OK',
		good: 'GOOD',
		excellent: 'EXCELLENT',
		systolic: 'Systolic',
		diastolic: 'Diastolic',
		report: 'Report',
		live: 'Live Monitoring',
		emergency_delay: 'Emergency Delay',
		energy: 'Energy',
		activity: 'Activity',
		nutrition: 'Nutrition',
		units: 'Units',
		distance: 'Distance',
		steps: 'Steps',
		elevation: 'Elevation',
		start_activity: 'START ACTIVITY',
		vitamins: 'Vitamins',
		proteins: 'Proteins',
		water: 'Water',
		fat: 'Fat',
		calcium: 'Calcium',
		call_emergency: 'CALL EMERGENCY',
		press_3_seconds: 'Hold for 3 seconds',
		help_on_the_way: 'HELP ON THE WAY',
		press_5_seconds_cancel: 'Hold for 5 seconds\nto cancel',
		km: 'Km',
		floors: 'Floors',
		cal: 'Cal'
	}
};

var language;
var descriptions;
var others;
var settings;
var health;

change_language('pt');
function change_language(change) {
	language = change;
	switch (change) {
		case 'pt':
			descriptions = STRINGS_DESCRIPTIONS.pt;
			others = STRINGS_OTHERS.pt;
			settings = STRINGS_SETTINGS.pt;
			health = STRINGS_HEALTH.pt;
			break;
		case 'en':
			descriptions = STRINGS_DESCRIPTIONS.en;
			others = STRINGS_OTHERS.en;
			settings = STRINGS_SETTINGS.en;
			health = STRINGS_HEALTH.en;
			break;
	}
}
