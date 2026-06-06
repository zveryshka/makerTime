
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
                    <h3>${hero.localized_name}</h3>
                    <p>Атрибут: ${hero.primary_attr}</p>
                    <p>Тип: ${hero.attack_type}</p>
                    <p>Швидкість: ${hero.move_speed}</p>
                    <p>Дальність: ${hero.attack_range}</p>
                    <p>Броня: ${hero.base_armor}</p>
                </div>
                <div class="card-back">
                    
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
