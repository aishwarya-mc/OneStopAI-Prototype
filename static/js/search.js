document.addEventListener('DOMContentLoaded', function () {
    fetch('/fetch_aitools')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Store the data globally for filtering
            window.aiToolsData = data;

            // Populate the cards with data
            renderCards(data);
        })
        .catch(error => console.error('Error fetching AI tools:', error));

    // Add event listener for the search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredData = window.aiToolsData.filter(tool => 
            tool.name.toLowerCase().includes(query) ||
            tool.category.toLowerCase().includes(query) ||
            tool.cost.toLowerCase().includes(query) ||
            tool.tag.toLowerCase().includes(query)
        );
        renderCards(filteredData);
    });
});

// Function to render cards
function renderCards(data) {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = data.map(tool => `
        <div class="card">
            <div class="image" style="background-image: url('https://picsum.photos/id/${tool.id}/300/200');"></div>
            <div class="content">
                <a href="#" class="title">${tool.name}</a>
                <p class="desc">Category: ${tool.category}</p>
                <div class="tags-container">
                    <span class="tag tag-primary">${tool.tag}</span>
                    <span class="tag tag-price">${tool.cost}</span>
                </div>
                <a href="${tool.link}" class="action">Find out more →</a>
            </div>
        </div>
    `).join('');
}
