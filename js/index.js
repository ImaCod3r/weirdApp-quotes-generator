// Elements
const quoteEl = document.querySelector('.quote');
const authorEl = document.querySelector('.author');
const regenerateBtn = document.getElementById('regenerate');
const copyBtn = document.getElementById('copy');

async function generatePhrase() {
    quoteEl.classList.remove('typed');

    try {
        const response = await fetch("./phrases.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomPhrase = data[randomIndex];

            if (randomPhrase && randomPhrase.frase && randomPhrase.autor) {
                quoteEl.textContent = randomPhrase.frase;
                authorEl.textContent = randomPhrase.autor;
                quoteEl.classList.add('typed');
            } else {
                throw new Error('Invalid phrase data');
            }

        } else {
            throw new Error('No phrases available');
        }
    } catch (error) {
        console.error('Error fetching phrase:', error);
        quoteEl.textContent = "Erro ao carregar frase.";
        authorEl.textContent = "";
    }
}

function copyPhrase() {
    const phrase = `"${quoteEl.textContent}" - ${authorEl.textContent}`;

    navigator.clipboard.writeText(phrase)
        .then(() => {
            copyBtn.textContent = "Copiado!";
            setTimeout(() => {
                copyBtn.textContent = "Copiar";
            }, 3000);
        })
        .catch(err => {
            console.error('Failed to copy text:', err);
            alert('Falha ao copiar a frase. Tente novamente.');
        });
}

// Events
regenerateBtn.addEventListener('click', generatePhrase);
copyBtn.addEventListener('click', copyPhrase);
window.onload = generatePhrase;