document.addEventListener('DOMContentLoaded', function () {
    fetch('/fetch_aitools')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Populate the cards with data
            const cardContainer = document.querySelector('.card-container');
            cardContainer.innerHTML = data.map(tool => `
                <div class="card">
                    <div class="image" style="background-image: url('https://picsum.photos/id/${tool.id}/300/200');"></div>
                    <div class="content">
                        <a href="${tool.link}" class="title">${tool.name}</a>
                        <p class="desc">Category: ${tool.category}</p>
                        <div class="tags-container">
                            <span class="tag tag-primary">${tool.tag}</span>
                            <span class="tag tag-price">${tool.cost}</span>
                        </div>
                        <a href="${tool.link}" class="action">Find out more →</a>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching AI tools:', error));
        
});
