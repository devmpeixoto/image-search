// Chave de acesso à API do Unsplash
const accessKey = "udzLv51MEnc4bRCdyt4iMrR6lMKtMXDQYXN5ImZYbfg";

// Selecionar elementos da página:
const formEl = document.querySelector('form'); // Formulário de pesquisa
const inputEl = document.getElementById('search-input'); // Caixa de entrada de pesquisa
const searchResults = document.querySelector('.search-results'); // Elemento para mostrar os resultados
const showMore = document.getElementById('show-more-button'); // Botão "Mostrar Mais"

// Variáveis de controle
let inputData = ""; // Armazena os dados da entrada do usuário
let page = 1; // Página atual de resultados

// Função para criar o HTML de um bloco de imagem e link
function createImageBlock(result) {
    return `
        <div class="search-result">
            <img src="${result.urls.small}" alt="${result.alt_description}">
            <a href="${result.links.html}" target="_blank">${result.alt_description}</a>
        </div>
    `;
}

// Função assíncrona para buscar imagens na API do Unsplash
async function searchImages() {
    inputData = inputEl.value; // Armazena o valor da entrada do usuário
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // Faz uma solicitação assíncrona para a API
    const response = await fetch(url);
    const data = await response.json(); // Converte a resposta em um objeto JSON

    const results = data.results; // Armazena os resultados da pesquisa

    if (page === 1) {
        searchResults.innerHTML = ""; // Limpa os resultados se estiver na primeira página
    }

    // Criar blocos de imagem e link usando map e join
    const imageBlocks = results.map(createImageBlock).join('');
    searchResults.innerHTML += imageBlocks;
    
    page++; // Incrementa o número da página para a próxima busca

    // Mostra o botão "Mostrar Mais" se houver mais páginas para carregar
    if (page > 1) {
        showMore.style.display = 'block';
    }
}

// Adiciona um ouvinte de evento para o envio do formulário de pesquisa
formEl.addEventListener('submit', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    page = 1; // Redefine a página para a primeira
    searchImages(); // Chama a função de busca de imagens
})

// Adiciona um ouvinte de evento para o clique no botão "Mostrar Mais"
showMore.addEventListener('click', function () {
    searchImages(); // Chama a função de busca de imagens
})