const mainContent = document.getElementById("mainContent");
const homeLink = document.getElementById("homeLink");
const catalogLink = document.getElementById("catalogLink");

homeLink.addEventListener("click", function (event) {
    event.preventDefault();
    showHomePage();
});

catalogLink.addEventListener("click", function (event) {
    event.preventDefault();
    loadCatalog();
});

function showHomePage() {
    mainContent.innerHTML = `
        <section class="hero">
            <h1>Ласкаво просимо до кафе</h1>
            <p>Оберіть категорію в каталозі та перегляньте доступні позиції меню.</p>
            <button class="btn" onclick="loadCatalog()">Відкрити каталог</button>
        </section>
    `;
}

async function loadCatalog() {
    try {
        const response = await fetch("data/categories.json");

        if (!response.ok) {
            throw new Error("Не вдалося завантажити категорії");
        }

        const categories = await response.json();

        let html = `
            <h2 class="section-title">Каталог</h2>
            <div class="category-grid">
        `;

        categories.forEach(category => {
            html += `
                <div class="category-card">
                    <h3>${category.name}</h3>
                    <p>${category.notes}</p>
                    <button class="btn" onclick="loadCategory('${category.shortname}')">
                        Відкрити
                    </button>
                </div>
            `;
        });

        html += `
                <div class="category-card special-card">
                    <h3>Specials</h3>
                    <p>Показати випадкову категорію з каталогу.</p>
                    <button class="btn" onclick="loadRandomCategory()">
                        Випадкова категорія
                    </button>
                </div>
            </div>
        `;

        mainContent.innerHTML = html;
    } catch (error) {
        mainContent.innerHTML = `<p class="error">Помилка завантаження каталогу.</p>`;
        console.error(error);
    }
}

async function loadCategory(shortname) {
    try {
        const response = await fetch(`data/${shortname}.json`);

        if (!response.ok) {
            throw new Error("Не вдалося завантажити категорію");
        }

        const categoryData = await response.json();

        let html = `
            <h2 class="section-title">${categoryData.categoryName}</h2>
            <div class="items-grid">
        `;

        categoryData.items.forEach(item => {
            html += `
                <div class="item-card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="price">${item.price}</div>
                </div>
            `;
        });

        html += `</div>`;

        mainContent.innerHTML = html;
    } catch (error) {
        mainContent.innerHTML = `<p class="error">Помилка завантаження категорії.</p>`;
        console.error(error);
    }
}

async function loadRandomCategory() {
    try {
        const response = await fetch("data/categories.json");

        if (!response.ok) {
            throw new Error("Не вдалося завантажити категорії");
        }

        const categories = await response.json();
        const randomIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomIndex];

        loadCategory(randomCategory.shortname);
    } catch (error) {
        mainContent.innerHTML = `<p class="error">Помилка завантаження випадкової категорії.</p>`;
        console.error(error);
    }
}

showHomePage();
