document.addEventListener("DOMContentLoaded", function() {
            const elements = document.querySelectorAll('.fade-in');

            function handleScroll() {
                elements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                        element.classList.add('show');
                    }
                });
            }

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Trigger once on load to show elements already in view
        });