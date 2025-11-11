const cartTotal = document.querySelector('.cartShoop div');

const span = document.createElement('span');
span.textContent = '0';
cartTotal.appendChild(span);

const container = document.getElementById('container');
const stock = [];

async function fillStock()
{
    const item =
    {
        id : 0,
        title : "",
        price : 0,
        category : "",
        image : "",
        rating : {
            rate : 0,
            count : 0
        }
    }
    try{
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    data.forEach(element => {
        const product = Object.create(item);
        product.title = element.title;
        product.price = element.price;
        product.category = element.category;
        product.image = element.image;
        product.rating.rate = element.rating.rate;
        product.rating.count = element.rating.count;
        product.id = element.id;
        stock.push(product);
        
    });
    }catch(error)
    {
        console.error(`Error al cargar productos`, error);
    }
};

const categories = new Map();

fillStock().then(() => {

    stock.forEach(element => {
        if(categories.has(element.category))
        {
            categories.get(element.category).push(element);
        }else{
            categories.set(element.category, [element]);
        }
    });
    categories.forEach((element,key) => {
        const product = document.createElement('div');
        product.classList.add('product');
        const title = document.createElement('h3');
        const contain = document.createElement('div');

        const previous = document.createElement('div');
        const next = document.createElement('div');
        previous.classList.add('previous');
        next.classList.add('next');

        const carousel = document.createElement('div');
        carousel.classList.add('carousel');

        // element.forEach(e =>{

        //     const item = document.createElement('div');
        //     item.classList.add('item');
        //     const title = document.createElement('h3');
        //     title.textContent = e.title;
        //     const image = document.createElement('img');
        //     item.appendChild(title);

        //     carousel.appendChild(item)
        // });
        
        contain.style.display = "flex"

        contain.appendChild(previous);
        contain.appendChild(carousel);
        contain.appendChild(next);

        title.textContent = key;
        product.appendChild(title);
        product.appendChild(contain);
        container.append(product);
    })

});
