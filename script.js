const questions = [
    {
        text: "Es viernes por la noche. ¿Cuál es tu plan ideal?",
        options: [
            { text: "Cena tranquila con amigos y una copa de vino.", type: "X" },
            { text: "Buscar el lugar más 'instagrammable' de la ciudad.", type: "M" },
            { text: "Scrollear TikTok en cama hasta las 3 AM.", type: "Z" },
            { text: "Jugar Roblox o ver streamers mientras chateo.", type: "A" }
        ]
    },
    {
        text: "¿Qué formato prefieres para consumir contenido?",
        options: [
            { text: "Televisión por cable o revistas.", type: "X" },
            { text: "Blogs, Podcasts y Facebook.", type: "M" },
            { text: "Videos cortos (Reels/TikTok) y memes.", type: "Z" },
            { text: "Streams en vivo y contenido interactivo.", type: "A" }
        ]
    },
    {
        text: "¿Cómo defines tu relación con el trabajo?",
        options: [
            { text: "Trabajo duro para tener estabilidad.", type: "X" },
            { text: "Busco un propósito y flexibilidad.", type: "M" },
            { text: "Quiero ser mi propio jefe / Emprender online.", type: "Z" },
            { text: "¿Trabajar? Yo quiero ser creador de contenido.", type: "A" }
        ]
    }
];

// Base de datos de Resultados
const resultsData = {
    "X": {
        title: "GENERACIÓN X",
        emoji: "📼",
        desc: "Eres el puente entre lo analógico y lo digital. Independiente, cínico con el marketing y valoras la autenticidad sin filtros. Tienes alma de rock clásico."
    },
    "M": {
        title: "MILLENNIAL",
        emoji: "🥑",
        desc: "Nostálgico pero tecnológico. Valoras las experiencias sobre las cosas. Tu vida es una búsqueda constante de propósito y buen café."
    },
    "Z": {
        title: "GEN Z",
        emoji: "👾",
        desc: "Nativo digital puro. Tu humor es roto y rápido. Valoras la inmediatez, el activismo y la identidad fluida. Eres el trendsetter actual."
    },
    "A": {
        title: "GEN ALPHA",
        emoji: "🤖",
        desc: "El futuro ya está aquí. Para ti, la barrera entre lo físico y lo digital no existe. Impaciente, visual y extremadamente conectado."
    }
};

let currentQuestion = 0;
let userScores = { X: 0, M: 0, Z: 0, A: 0 };

// Referencias al DOM
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    loading: document.getElementById('loading-screen'),
    result: document.getElementById('result-screen')
};

function switchScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active', 'hidden'));
    screens[screenName].classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    userScores = { X: 0, M: 0, Z: 0, A: 0 };
    switchScreen('quiz');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').innerText = q.text;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Limpiar anteriores

    // Actualizar barra de progreso
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(opt.type);
        optionsDiv.appendChild(btn);
    });
}

function selectOption(type) {
    userScores[type]++;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showLoading();
    }
}

function showLoading() {
    switchScreen('loading');
    const msgs = ["Analizando patrones de consumo...", "Escaneando aura digital...", "Calculando nivel de cringe...", "Finalizando..."];
    let i = 0;
    const msgElement = document.getElementById('loading-msg');
    
    // Simular proceso de carga cambiante
    const interval = setInterval(() => {
        msgElement.innerText = msgs[i];
        i++;
        if (i >= msgs.length) clearInterval(interval);
    }, 800);

    // Ir al resultado después de 3.5 segundos
    setTimeout(() => {
        calculateResult();
    }, 3500);
}

function calculateResult() {
    // Encontrar la generación con mayor puntaje
    const winner = Object.keys(userScores).reduce((a, b) => userScores[a] > userScores[b] ? a : b);
    
    const data = resultsData[winner];
    
    document.getElementById('result-title').innerText = data.title;
    document.getElementById('result-emoji').innerText = data.emoji;
    document.getElementById('result-desc').innerText = data.desc;
    
    switchScreen('result');
}

function restartQuiz() {
    switchScreen('start');
}
