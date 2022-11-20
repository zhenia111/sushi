const tableItems = [
    {
        id:1,
        title:"Филадельфия хит ролл",
        muted:"6",
        weight:"180",
        price:"300",
        src:"img/roll/philadelphia.jpg"
    },
    {
        id:2,
        title:"Калифорния темпура",
        muted:"6",
        weight:"205",
        price:"250",
        src:"img/roll/california-tempura.jpg"
    },
    {
        id:3,
        title:"Запеченый ролл «Калифорния»",
        muted:"6",
        weight:"182",
        price:"230",
        src:"img/roll/zapech-california.jpg"
    },
    {
        id:4,
        title:"Филадельфия",
        muted:"6",
        weight:"230",
        price:"320",
        src:"img/roll/philadelphia.jpg"
    },
];
//находим место куда будет вставлять контент
const ItemsWrapper = document.querySelector('.sushi-table');

//создаем новую строку + добаляем в строку на каждом i
function putItemOnSite(itemsArr){
    let tableItemstring = '';
    itemsArr.forEach(item =>{
        tableItemstring+=`
        <div class="col-md-6">
                        <div class="card mb-4" data-id="01">
                            <img class="product-img" src=${item.src} alt="">
                            <div class="card-body text-center">
                                <h4 class="item-title">${item.title}</h4>
                                <p><small data-items-in-box class="text-muted">${item.muted}шт.</small></p>

                                <div class="details-wrapper">
                                    <div class="items counter-wrapper">
                                        <div class="items__control" data-action="minus">-</div>
                                        <div class="items__current" data-counter>1</div>
                                        <div class="items__control" data-action="plus">+</div>
                                    </div>

                                    <div class="price">
                                        <div class="price__weight">${item.weight}г.</div>
                                        <div class="price__currency">${item.price}</div><span> ₽</span>
                                    </div>
                                </div>
                                <div class="fast-addition">
                                    <div class="fast-addition-1">1</div>
                                    <div class="fast-addition-5">5</div>
                                    <div class="fast-addition-10">10</div>
                                </div>
                                <button data-cart type="button" class="btn btn-block btn-outline-warning">+ в
                                    корзину</button>

                            </div>
                        </div>
                    </div>
        `;
    })
    ItemsWrapper.innerHTML = tableItemstring;
};

putItemOnSite(tableItems);

//задача создать импут в него вводить чать или любую букву и по тайтлу сравнивать содержит ли он такую букву и выводить(показывать) на сайте
 //создали импут в HTML и получили его в константу

const inputbody = document.querySelector('.input-secher');

inputbody.addEventListener('input',()=>{
    const inputResult = inputbody.value;
    const filtredTableItems = tableItems.filter(item=>item.title.toLowerCase().includes(inputResult.toLowerCase()));

    putItemOnSite(filtredTableItems);
});



ItemsWrapper.addEventListener('click',(event)=>{
   
    
    if(event.target.classList.contains('fast-addition-1')){
        const cardWrapper = event.target.closest('.card');
        const counter = cardWrapper.querySelector('[data-counter]');
        counter.innerHTML = +counter.innerHTML + 1;
    }

    if(event.target.classList.contains('fast-addition-5')){
        const cardWrapper = event.target.closest('.card');
        const counter = cardWrapper.querySelector('[data-counter]');
        counter.innerHTML = +counter.innerHTML + 5;
    }

    if(event.target.classList.contains('fast-addition-10')){
        const cardWrapper = event.target.closest('.card');
        const counter = cardWrapper.querySelector('[data-counter]');
        counter.innerHTML = +counter.innerHTML + 10;
    }

})
