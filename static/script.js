
let allHeroes = [];

const container = document.getElementById('hero-container');
const loader = document.getElementById('loader');


function renderHeroes(heroes) {
    container.innerHTML = '';
    heroes.forEach(hero => {
        const div = document.createElement('div');
        div.className = 'hero-card';

        div.onclick = () => div.classList.toggle('flipped');

        div.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <h3>${hero.localized_name}</h3>
                    <img src="https://cdn.cloudflare.steamstatic.com${hero.img}" alt="${hero.localized_name}">
                    
                    <p> ${hero.primary_attr == "str" ? "👊🏿" : hero.primary_attr == "agi" ? "🍃" : "🧠"}</p>
                    <p>Атрибут</p> 
                    <p> ${hero.primary_attr == "str" ? "Сила" : hero.primary_attr == "agi" ? "Спритність" : "Інтелект"}</p>

                    <p>${hero.attack_type == "Melee" ? "⚔" : "🏹"}</p>
                    <p>Тип</p> 
                    <p>${hero.attack_type == "Melee" ? "Ближнє" : "Дальнє"}</p>
                   <i class="fa-solid fa-wind"></i> <p>Швидкість</p> <p>${hero.move_speed}</p>
                   <i class="fa-solid fa-gun"></i> <p>Дальність</p> <p>${hero.attack_range}</p>
                    <i class="fa-solid fa-shield"></i><p>Броня</p> <p>${hero.base_armor}</p>
                </div>
                <div class="card-back">
                <p>Про-піки: ${hero.pro_pick}</p>
                <p>Про-віни: ${hero.pro_win}</p>
                <p>Про-бани: ${hero.pro_ban}</p>
                <p>Паб-піки: ${hero.pub_pick}</p>
                <p>Паб-віни: ${hero.pub_win}</p>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}


async function fetchHeroes() {
    try {
        const response = await fetch('https://api.opendota.com/api/heroStats');
        if (!response.ok) throw new Error('Помилка завантаження');

        allHeroes = await response.json();
        loader.style.display = 'none';

        renderHeroes(allHeroes);
    } catch (error) {
        loader.innerText = 'Щось пішло не так: ' + error.message;
    }
}


function filterHeroesBySelect() {
    const select = document.getElementById('hero-select');
    const value = select.value;

    if (value === 'all') {
        renderHeroes(allHeroes);
    } else {

        const filtered = allHeroes.filter(hero => hero.primary_attr === value);
        renderHeroes(filtered);
    }
}


fetchHeroes();
