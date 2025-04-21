document.addEventListener("DOMContentLoaded", function() {
    fetch('/fetch_aitools')
        .then(response => response.json())
        .then(data => {
            const categories = {};

            data.forEach(tool => {
                if (!categories[tool.category]) {
                    categories[tool.category] = [];
                }
                categories[tool.category].push(tool);
            });

            const categoriesContainer = document.getElementById('categories');

            Object.keys(categories).forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category');

                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoryDiv.appendChild(categoryTitle);

                const cardsDiv = document.createElement('div');
                cardsDiv.classList.add('cards');

                categories[category].forEach(tool => {
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');

                    const cardTitle = document.createElement('h3');
                    cardTitle.textContent = tool.name;
                    cardDiv.appendChild(cardTitle);

                    const cardDescription = document.createElement('p');
                    cardDescription.textContent = `Category: ${tool.category}`;
                    cardDiv.appendChild(cardDescription);

                    const tagsContainer = document.createElement('div');
                    tagsContainer.classList.add('tags-container');

                    const tagPrimary = document.createElement('span');
                    tagPrimary.classList.add('tag', 'tag-primary');
                    tagPrimary.textContent = tool.tag;
                    tagsContainer.appendChild(tagPrimary);

                    const tagPrice = document.createElement('span');
                    tagPrice.classList.add('tag', 'tag-price');
                    tagPrice.textContent = tool.cost;
                    tagsContainer.appendChild(tagPrice);

                    cardDiv.appendChild(tagsContainer);

                    const cardLink = document.createElement('a');
                    cardLink.href = tool.link;
                    cardLink.classList.add('action');
                    cardLink.textContent = 'Find out more →';
                    cardDiv.appendChild(cardLink);

                    cardsDiv.appendChild(cardDiv);
                });

                categoryDiv.appendChild(cardsDiv);
                categoriesContainer.appendChild(categoryDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching AI tools:', error);
        });
});
