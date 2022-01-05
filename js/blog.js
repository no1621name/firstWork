/**header links**/
let mainUrl = (function (arr){
    arr.forEach((el, ind) => {
        if(el.trim() == '') {
            arr.splice(ind, ind+1);
        }
    });
    arr.pop(arr.length-1);
    arr.push('index.html');
    return arr.join('/');
})(location.toString().split('/'));

let links = document.querySelectorAll('header nav a');
links.forEach((el, ind) => { 
    if(ind !== links.length-1){
        el.href = mainUrl + el.dataset.href;
    }
});


/**toggle menu**/
let toggleMenuBtn = document.querySelector('#toggleMenuBtn')
toggleMenuBtn.addEventListener('click', () => {
    document.querySelector('#toggleMenu').classList.toggle('active');
    toggleMenuBtn.classList.toggle('active');
})
/**articles list**/
let pagesList = chunk(miniArticles, 15); //check data.js
let page = document.querySelector('#articlesPage');
let paginationList = document.querySelector('#paginationList');

let thisPageIndex = +page.dataset.index; 

window.onload = init();

document.querySelectorAll('#articlesControl > button').forEach((el) => el.addEventListener('click', (event) => {
    if(event.target.classList.contains('button__pre')){
        render(calcIndex('pre', thisPageIndex, pagesList));
    } else if(event.target.classList.contains('button__next')){
        render(calcIndex('next', thisPageIndex, pagesList));
    }
}));

function init(){
    renderPaginationList();
    render(thisPageIndex);
}

function chunk(arr, size){
    let newArr = [];
    for (let i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}

function render(pageIndex){
    page.innerHTML = ``;
    paginationList.querySelectorAll('.is-active').forEach((el) => el.classList.remove('is-active'));
    document.querySelector(`button[data-index="${pageIndex}"`).classList.add('is-active');
    thisPageIndex = pageIndex; 
    page.dataset.index = `${pageIndex}`;
    for(let i = pagesList[pageIndex].length-1; i >= 0; i--){
        let article = document.createElement('div');
        article.classList.add('article');
        article.innerHTML = `
            <img src="${pagesList[pageIndex][i].img}" alt="img_${i}">
            <h4>${pagesList[pageIndex][i].heading} ${pageIndex} ${i}</h4>
            <p>${pagesList[pageIndex][i].description}</p>
            <div class="link">
                <button onclick="openArticle(event)">Открыть пост</button>
                <img src="img/blog__link__arrow.png" alt="arrow">
            </div>`
        article.dataset.articleIndex = i;
        page.append(article);
    }
}

function renderPaginationList(){
    for(let i = 0; i < pagesList.length; i++){
        let paginationItem = document.createElement('button');
        paginationItem.classList.add('pagination__item');
        paginationItem.dataset.index = i;
        if(i == thisPageIndex) paginationItem.classList.add('is-active');
        paginationItem.addEventListener('click', (event) => render(+event.target.dataset.index));
        paginationItem.dataset.index = i;
        paginationList.append(paginationItem);
    }
}

function calcIndex(side, ind, arr){
    if(side == 'next'){
        if(ind < arr.length - 1){
            return ind += 1;
        } else if(ind == arr.length-1){
            return ind = 0;
        }
    } else if(side == 'pre'){
        if(ind > 0){
            return ind -= 1;
        } else if (ind == 0){
            return ind = arr.length-1;
        }
    }
}


/**open article**/
let articlesList = chunk(articles, 15); //check data.js

let blogSection = document.querySelector('#blog');
let bigArticleSection = document.querySelector('#bigArticle');
let bigArticleBody = document.querySelector('#bigArticleBody');
let bigArticleAside = document.querySelector('#bigArticle aside #asideBody');

let pathBigArticleIndex = 0;

document.querySelector('header nav').lastElementChild.addEventListener('click', () => {
    blogSection.classList.remove('hide');
    bigArticleSection.classList.add('hide');
});

function openArticle(e){
    pathBigArticleIndex = 0;
    let thisArticleIndex = +e.target.parentElement.parentElement.dataset.articleIndex;
    let articleContent = articlesList[thisPageIndex][thisArticleIndex];
    blogSection.classList.add('hide');
    bigArticleSection.classList.remove('hide');
    renderOtherArticles(bigArticleAside, 2, thisArticleIndex);
    document.querySelectorAll('#bigArticleControl > button').forEach((el) => {
        el.onclick = null;   
        console.log(el.onclick) 
        el.onclick = function (event){
            if (event.target.classList.contains('big-article__button__pre')) {
                renderBigArticleText(calcIndex('pre', pathBigArticleIndex, articleContent.text), articleContent.text);
            } else if (event.target.classList.contains('big-article__button__next')) {
                renderBigArticleText(calcIndex('next', pathBigArticleIndex, articleContent.text), articleContent.text);
            }     
        };
        console.log(el.onclick)
    });    
    document.querySelector('#bigArticleH').innerHTML = articleContent.heading;
    renderBigArticleText(pathBigArticleIndex, articleContent.text);
}



function renderOtherArticles(body, count, articleInd){
    body.innerHTML = ``;
    for(let i = 1; i <= count; i++){
        let otherArticle = document.createElement('div');
        otherArticle.classList.add('article');
        if(articleInd >= pagesList[thisPageIndex].length-2){
            otherArticle.dataset.articleIndex = i;
            otherArticle.innerHTML = `
            <img src="${pagesList[thisPageIndex][i].img}" alt="img_${i}">
            <h4>${pagesList[thisPageIndex][i].heading} ${thisPageIndex} ${i}</h4>
            <p>${pagesList[thisPageIndex][i].description}</p>
            <div class="link">
                <button onclick="openArticle(event)">Открыть пост</button>
                <img src="img/blog__link__arrow.png" alt="arrow">
            </div>`;
        } else{
            otherArticle.dataset.articleIndex = articleInd + i;
            otherArticle.innerHTML = `
                <img src="${pagesList[thisPageIndex][articleInd+i].img}" alt="img_${articleInd+i}">
                <h4>${pagesList[thisPageIndex][articleInd+i].heading} ${thisPageIndex} ${articleInd + i}</h4>
                <p>${pagesList[thisPageIndex][articleInd+i].description}</p>
                <div class="link">
                    <button onclick="openArticle(event)">Открыть пост</button>
                    <img src="img/blog__link__arrow.png" alt="arrow">
                </div>`;
        }
        body.append(otherArticle);
    }
}

function renderBigArticleText(ind, arr){
    pathBigArticleIndex = ind;
    bigArticleBody.dataset.index = ind;
    bigArticleBody.innerHTML = ``;
    bigArticleBody.innerHTML = arr[ind];
} 


/**cheeck audit form**/
function checkForm(e){
    let inputs = e.target.parentElement.querySelectorAll('input');
    let filled = 0;
    inputs.forEach((el) => {
    if(el.value.trim() !== '' && !isNaN(el.value.trim())) filled++; 
    })
    if(filled !== inputs.length) document.querySelector('.warning').style.display = "block";
}