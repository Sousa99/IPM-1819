const STRINGS_DESCRIPTIONS = {
	pt: {
		frame: 'Moldura',
		template: 'Molde',
		main: 'Principal',
		menu: 'Menu',

		settings: 'Definições',
		language_settings: 'Definições Língua',
		changed_language: 'Mudou Língua',
		lock_settings: 'Definições de Bloqueio',
		changed_lock: 'Mudou Bloqueio',
		no_lock: 'Nenhuma Proteção',
		pin_lock: 'PIN',
		pattern_lock: 'Padrão',
		fingerprint_lock: 'Impressão Digital',

		health: 'Saúde',
		health_help: 'Ajuda (Saúde)',
		heart_rate: 'Batimento Cardíaco',
		blood_pressure: 'Pressão Arterial',
		blood_oxygen: 'Oxigenação do Sangue',
		sleep_time: 'Tempo de Sono',
		sos: 'SOS',
		sos_help: 'Ajuda (SOS)',
		fitness: 'Fitness',
		fitness_help: 'Ajuda (Fitness)',
		energy: 'Energia',
		activity: 'Atividade',
		nutrition: 'Nutrição',
		choose_activity: 'Escolher atividade',
		choose_activity_help:'Ajuda(Escolha de Atividade)',
		activity_walk: 'Caminhada',
		activity_run: 'Corrida',
		activity_gym: 'Ginásio',
		activity_bike: 'Bicicleta',
		cancel_activity: 'Cancelar Atividade',
		stop_activity: 'Parar Atividade',
		new_measurement: 'Nova Medição'
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
		choose_activity: 'Choose Activity',
		choose_activity_help:'Help(Choose Activity)',
		activity_walk:'Walk',
		activity_run: 'Run',
		activity_gym: 'Gym',
		activity_bike: 'Bike',
		cancel_activity: 'Cancel Activity',
		stop_activity: 'Stop Activity',
		new_measurement: 'New Measurement'

	}
};

const STRINGS_OTHERS = {
	pt: {
		friends_group: 'GRUPO DE AMIGOS',
		help_health: 'Premir cada uma das setas\npara obter mais informações\nsobre cada uma opções dadas.\n\nSe necessitar de voltar para trás\npremir botão\nlateral direito superior.\n\nPara bloqueio do dispositivo\npremir botão\ndireito lateral inferior.',
		help_sos: 'Premir o botão circular\npara estar sempre\nem modo sos.\n\nAtravés do botão retangular\nque indica o tempo de atraso\nde emergência, pode mudar\nesse tempo premindo algumas\nvezes até a opção que preferir.',
		help_fitness: 'Premir cada uma das setas\npara obter mais informações\nsobre cada uma opções dadas.\n\nSe necessitar de voltar para trás\npremir botão\nlateral direito superior.\n\nPara bloqueio do dispositivo\npremir botão\ndireito lateral inferior.',
		help_choose_activity:'\nPremir uma das 4 das atividades.\nEm cada uma delas pode\ncomeçar a mesma.\n\nPor fim, tem 2 opções:\n\nCancelar a atividade- não fica\nguardado o progresso.\n\nParar a atividade- termina\na atividade\ncom o progresso guardado.'
	},
	en: {
		friends_group: 'FRIENDS GROUP',
		help_health: 'Hold each arrows\nto have more information\nabout each options.\n\nIf you want to turn back\nhold the upper right\nside button.\n\nAnd to lock screen,\nhold the lower right\nside button.',
		help_sos: 'Hold an cycle button\nto always be in sos mode.\n\nThrough the rectangle button\nthat have the emergency\ndelay time,you can change\nthis number,\nhold sometimes even your option\nthat you prefer.',
		help_fitness: 'Hold each arrows\nto have more information\nabout each options.\n\nIf you want to turn back\nhold the upper right\nside button.\n\nAnd to lock screen,\nhold the lower right\nside button.',
		help_choose_activity:'\nHold one of 4 activities.\nIn each one of activities\ncan start one of activities.\n\nFinally,you have 2 options:\n\nCancel the activity- the\nprogress wasn´t saved.\n\nStop the activity- finish\nthe activity with progress\nsaved.'
	}
};

const STRINGS_SETTINGS = {
	pt: {
		lock_protection: 'Proteção de Ecrã',
		language: 'Língua',
		portuguese: 'Português',
		english: 'Inglês',
		message_changed_language: 'Mudou a língua\npredefinida para\nPortuguês',
		none: 'Nenhuma',
		pin: 'PIN',
		pattern: 'Padrão',
		fingerprint: 'Impressão Digital',
		message_changed_lock: 'Mudou o tipo de\nbloqueio do dispositivo',
		touch_screen_to_unlock: 'Toque no ecrã para desbloquear'
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
		health: 'SAÚDE',
		heart_rate: 'Batimento Cardíaco',
		blood_pressure: 'Pressão Arterial',
		blood_oxygen: 'Oxigenação do Sangue',
		sleep_time: 'Tempo de Sono',
		at_the_moment: 'No Momento',
		today: 'Hoje',
		week: 'Semana',
		bad: 'Mau',
		ok: 'Ok',
		good: 'Bom',
		excellent: 'Excelente',
		low: 'Baixo',
		very_low: 'Muito Baixo',
		normal: 'Normal',
		elevated: 'Elevado',
		hypertension: 'Hipertensão',
		yes: 'Sim',
		no: 'Não',
		done: 'Completo',
		systolic: 'Sistólica',
		diastolic: 'Diastólica',
		report: 'Relatório',
		new_measurement: 'Nova Medição',
		live_monitoring: 'Monitorização Constante',
		emergency_delay: 'Atraso da Emergência',
		energy: 'Energia',
		activity: 'Atividade',
		nutrition: 'Nutrição',
		units: 'Unidades',
		distance: 'Distancia',
		steps: 'Passos',
		elevation: 'Elevação',
		start_activity: 'COMEÇAR ATIVIDADE',
		vitamins: 'Vitaminas',
		proteins: 'Proteinas',
		water: 'Agua',
		fat: 'Gorduras',
		calcium: 'Cálcio',
		weekly_health_report:' Relatório semanal de saúde',
		call_emergency: 'CHAMAR EMERGÊNCIA',
		press_3_seconds: 'Premir por 3 segundos',
		help_on_the_way: 'AJUDA A CAMINHO',
		press_5_seconds_cancel: 'Premir por 5 segundos\npara cancelar',
		km: 'Km',
		floors: 'Andares',
		cal: 'Cal',
		bpm: 'Bpm',
		hours: 'Horas',
		seconds: 's',
		minutes: 'm',
		mmHg: 'mmHg',
		start: 'Começar',
		stop: 'Parar',
		cancel: 'Cancelar',
		type: 'Tipo',
		duration: 'Duração',
		route:'rota',
		objective:'objetivo',
		share: 'Partilha',
		invite: 'convite',
		cancel_activity: 'Deseja mesmo cancelar\na actividade?\n\nIrá perder todo o progresso!',
		stop_activity: 'Deseja mesmo parar\na actividade?\n\nO progresso será guardado!',
		fast_heart_rate: 'Batimento cardíaco\nmuito acelerado',
		good_heart_rate: 'Batimento cardíaco\nno nível adequado',
		slow_heart_rate: 'Batimento cardíaco\nmuito lento'
	},
	en: {
		fitness: 'FITNESS',
		sos: 'SOS',
		health: 'HEALTH',
		heart_rate: 'Heart Rate',
		blood_pressure: 'Blood Pressure',
		blood_oxygen: 'Blood Oxygen',
		sleep_time: 'Sleep Time',
		weekly_health_report: 'Weekly Health Report',
		at_the_moment: 'Live',
		today: 'Today',
		week: 'Weekly',
		bad: 'Bad',
		ok: 'Ok',
		good: 'Good',
		excellent: 'Excellent',
		low: 'Low',
		very_low: 'Very Low',
		normal: 'Normal',
		elevated: 'Elevated',
		hypertension: 'Hypertension',
		yes: 'Yes',
		no: 'No',
		done: 'Done',
		systolic: 'Systolic',
		diastolic: 'Diastolic',
		report: 'Report',
		new_measurement: 'New Measurement',
		live_monitoring: 'Live Monitoring',
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
		cal: 'Cal',
		bpm: 'Bpm',
		hours: 'Hours',
		seconds: 's',
		minutes: 'm',
		mmHg: 'mmHg',
		start: 'Start',
		stop: 'Stop',
		cancel: 'Cancel',
		type: 'Type',
		duration: 'Duration',
		route:'route',
		objective: 'objective',
		share: 'Share',
		invite: 'invite',
		cancel_activity: 'Do you really wish to\ncancel activity?\n\nYou will lose all progress!',
		stop_activity: 'Do you really wish to\nstop this activity?\n\nThe progress will be saved!',
		fast_heart_rate: 'Heart Rate\ntoo high',
		good_heart_rate: 'Heart Rate\nat the right level',
		slow_heart_rate: 'Heart Rate\ntoo low'
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
