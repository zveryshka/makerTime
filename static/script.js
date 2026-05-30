
        // Твій скрипт (можна вставити прямо сюди або підключити окремим файлом)
        async function fetchHeroes() {
            const container = document.getElementById('hero-container');
            const loader = document.getElementById('loader');

            try {
                const response = await fetch('https://api.opendota.com/api/heroStats');
                if (!response.ok) throw new Error('Помилка завантаження');
                
                const heroes = await response.json();
                
                // Ховаємо лоадер після успішного запиту
                loader.style.display = 'none';

                heroes.forEach(hero => {
                    const div = document.createElement('div');
                    div.className = 'hero-card';
                    div.innerHTML = `
                        <h3>${hero.localized_name}</h3>
                        <p>Атрибут: ${hero.primary_attr.toUpperCase()}</p>
                        <p>Тип: ${hero.attack_type}</p>
                    `;
                    container.appendChild(div);
                });
            } catch (error) {
                loader.innerText = 'Щось пішло не так: ' + error.message;
            }
        }

        fetchHeroes();
