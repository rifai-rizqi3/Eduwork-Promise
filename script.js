// variables
const generalBtn = document.getElementById('general');
const bisnisBtn = document.getElementById('bisnis');
const olahragaBtn = document.getElementById('olahraga');
const teknologiBtn = document.getElementById('teknologi');
const entertainmentBtn = document.getElementById('entertainment');
const searchBtn = document.getElementById('searchBtn');

const newsQuery = document.getElementById('newsQuery');
const newsType = document.getElementById('newsType');
const newsDetails = document.getElementById('newsDetails');

// array
let newsDataArr = [];

// apis
const API_KEY = 'f31c177f2442429c92757cfed2a8f3e1';
const HEADLINES_NEWS = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=';
const GENERAL_NEWS = 'https://newsapi.org/v2/top-headlines?country=id&category=general&apiKey=';
const BISNIS_NEWS = 'https://newsapi.org/v2/top-headlines?country=id&category=business&apiKey=';
const OLAHRAGA_NEWS = 'https://newsapi.org/v2/top-headlines?country=id&category=sports&apiKey=';
const TEKNOLOGI_NEWS = 'https://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey=';
const ENTERTAINMENT_NEWS = 'https://newsapi.org/v2/top-headlines?country=id&category=entertainment&apiKey=';
const SEARCH_NEWS = 'https://newsapi.org/v2/top-headlines?country=id&q=';

window.onload = function() {
    newsType.innerHTML='<h4 class="mt-3">Headlines</h4>';
    fetchHeadlinesNews();
};



generalBtn.addEventListener('click', function() {
    newsType.innerHTML='<h4 class="mt-3">General</h4>';
    fetchGeneralNews();
});

bisnisBtn.addEventListener('click', function() {
    newsType.innerHTML='<h4 class="mt-3">Bisnis</h4>';
    fetchBisnisNews();
});

olahragaBtn.addEventListener('click', function() {
    newsType.innerHTML='<h4 class="mt-3">Olahraga</h4>';
    fetchOlahragaNews();
});

teknologiBtn.addEventListener('click', function() {
    newsType.innerHTML='<h4 class="mt-3">Teknologi</h4>';
    fetchTeknologiNews();
});

entertainmentBtn.addEventListener('click', function() {
    newsType.innerHTML='<h4 class="mt-3">Entertainment</h4>';
    fetchEntertainmentNews();
});

searchBtn.addEventListener('click', function() {
    newsType.innerHTML='<h4 class="mt-3">Cari : '+newsQuery.value+'</h4>';
    fetchQueryNews();
});

const fetchHeadlinesNews = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();

}
const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchBisnisNews = async () => {
    const response = await fetch(BISNIS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchOlahragaNews = async () => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=id&category=sports&apiKey=f31c177f2442429c92757cfed2a8f3e1');
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchTeknologiNews = async () => {
    const response = await fetch(TEKNOLOGI_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();

}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+'&apikey='+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // error hendle
        console.log(response.status, response.statusText);
    }

    displayNews();
}

function displayNews() {

    newsDetails.innerHTML = '';

    if(newsDataArr.length == 0) {
        newsDetails.innerHTML = '<h5>No data found.</h5>'
        return;
    }

    newsDataArr.forEach(news => {

        let data = news.publishedAt.split('T');

        let col = document.createElement('div');
        col.className='col-sm-12 col-md-4 col-lg-3 p-2 card';

        let card = document.createElement('div');
        card.className = 'p-2';

        let image = document.createElement('img');
        image.setAttribute('height', 'matchparnt');
        image.setAttribute('width', '100%');
        image.src=news.urlToImage;

        let cardBody = document.createElement('div');

        let newsHeading = document.createElement('h5');
        newsHeading.className = 'card-title';
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement('h6');
        dateHeading.className = 'text-dark';
        dateHeading.innerHTML = data[0];

        let discription = document.createElement('p');
        discription.className='text-muted';
        discription.innerHTML = news.description;

        let link = document.createElement('a');
        link.className='btn btn-primary fw-semibold';
        link.setAttribute('target', '_blank');
        link.href = news.url;
        link.innerHTML='Read More';

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetails.appendChild(col);

    });

}