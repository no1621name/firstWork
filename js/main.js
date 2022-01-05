/**hover class**/
document.querySelectorAll('header .header__info .header__info__content nav .menu__main li a').forEach( (el) => {
    el.addEventListener('mouseenter', () => el.classList.add('hover'));
    el.addEventListener('mouseout', () => el.classList.remove('hover'));
})


/**render partners images**/
function renderImages(partnersAmount){ 
    let partnersContainer = document.querySelector('#partnersContainer');
    for(let i = 1; i <= partnersAmount; i++){
        let a = document.createElement('a');
        a.href = '/'
        a.innerHTML = `<img src="img/image_${i}.png" alt="image_${i}">`;
        partnersContainer.append(a);
    }
}
renderImages(17);


/**cases slider**/
new Splide( '.splide__cases', {
    type: 'loop',
    focus: 'center',
    updateOnMove: true,
    classes: {
        arrow: 'splide__arrows my__arrow',
        pagination : 'splide__pagination my__pagination',
		page: 'splide__pagination__page my__page',
    }
}).mount();

/**reviews slider**/
let reviewIndex = 0;

let reviewsList = document.querySelector('#sliderReviewsList');
let nextButton = document.querySelector('#sliderReviewsButtonNext');
let preButton = document.querySelector('#sliderReviewsButtonPre');
let paginationList = document.querySelector('#sliderReviewsPaginationList');

/**renderPaginationList**/
(function(){
    for(let i = 0; i < reviewsArr.length; i++){
        let page = document.createElement('li');
        page.innerHTML = `<button class="slider__reviews__pagination__page" data-index="${i}" onclick="renderReviewsSlider(+event.target.dataset.index)"></button>`;
        paginationList.append(page);
    }
})();

window.onload = renderReviewsSlider(reviewIndex);

nextButton.addEventListener('click', () => renderReviewsSlider(calcIndex('next')));
preButton.addEventListener('click', () => renderReviewsSlider(calcIndex('pre')));

function renderReviewsSlider(ind){
    reviewsList.innerHTML = ``; 
    paginationList.querySelectorAll('.is-active').forEach((el) => el.classList.remove('is-active'));
    document.querySelector(`button[data-index="${ind}"]`).classList.add('is-active');
    reviewIndex = ind;
    let slide = document.createElement('li');
    slide.classList.add('slider__reviews__slide');
    slide.innerHTML = `
    <div class="slider__reviews__slide__body">
        <p>${reviewsArr[ind].text}</p>
        <div class="slider__reviews__slide__client">
            <img src="${reviewsArr[ind].image}" alt="client ${reviewsArr[ind].name}">
            <div class="slider__reviews__slide__client__text">
                <h6>${reviewsArr[ind].name}</h6>
                <p>${reviewsArr[ind].about}</p>
            </div>    
        </div>
    </div>`;
    reviewsList.append(slide);
}

function calcIndex(side){
    if(side == 'next'){
        if(reviewIndex < reviewsArr.length - 1){
            return reviewIndex += 1;
        } else if(reviewIndex == reviewsArr.length-1){
            return reviewIndex = 0;
        }
    } else if(side == 'pre'){
        if(reviewIndex > 0){
            return reviewIndex -= 1;
        } else if (reviewIndex == 0){
            return reviewIndex = reviewsArr.length-1;
        }
    }
}


/**check audit form**/
function checkForm(e){
    let inputs = e.target.parentElement.querySelectorAll('input');
    let filled = 0;
    inputs.forEach((el) => {
    if(el.value.trim() !== '' && !isNaN(el.value.trim())) filled++;
    })
    if(filled !== inputs.length) document.querySelector('.warning').style.display = "block";
}

/**blog**/
let blogList = chunk(miniArticles, 3); //check data.js
let lastBlogList = blogList[blogList.length-1];
document.querySelector('.blog__content').innerHTML = ``;
for(let i = lastBlogList.length-1; i >= 0; i--){
    document.querySelector('.blog__content').dataset.index = blogList.length-1;
    let article = document.createElement('div');
    article.classList.add('article');
    article.innerHTML = `
        <img src="${lastBlogList[i].img}" alt="img_${i}">
        <h4>${lastBlogList[i].heading} ${blogList.length-1} ${i}</h4>
        <p>${lastBlogList[i].description}</p>
        <div class="link">
            <a href="blog.html">Открыть пост</a>
            <img src="img/blog__link__arrow.png" alt="arrow">
        </div>`
    article.dataset.articleIndex = i;
    document.querySelector('.blog__content').append(article)
}


function chunk(arr, size){
    let newArr = [];
    for (let i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}

/**adaptive**/
let toggleMenuBtn = document.querySelector('#toggleMenuBtn');

toggleMenuBtn.addEventListener('click', () => {
    document.querySelector('#toggleMenu').classList.toggle('active');
    toggleMenuBtn.classList.toggle('active');
});

if(window.innerWidth < 768){
    new Splide( '.splide__main', {
        perPage: 1.5,
        perMove: 1,
        speed: 900,
        focus: 'center',
        trimSpace: false,
        rewind: true,
        trimSpace: true,
    } ).mount()
}