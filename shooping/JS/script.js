const cartTotal = document.querySelector('.cartShoop div');
const dropdownSearch = document.getElementById('selectField');
const itemDescription = document.getElementById('itemDescription');

const imagePreview = document.getElementById("imgPrev");
const productDescription = document.getElementById('previewDescr');
const productPrice = document.getElementById('productPrice');

const productPreview = document.querySelector(".productPreview");

itemDescription.addEventListener("click", (e) => {
        // Si el clic fue directamente en el fondo (no dentro del cuadro)
        if (e.target === itemDescription) {
            itemDescription.style.display = "none";
            imagePreview.innerHTML=''
            productDescription.innerHTML = '';
            productPrice.innerHTML = '';
        }
    });

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
        description : "",
        rating : {
            rate : 0,
            count : 0
        }
    }
    try{
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    const desc = await fetch('Resources/desc.json');
    const descData = await desc.json();

    data.forEach(element => {
        const product = Object.create(item);
        product.title = element.title;
        product.price = element.price;
        product.category = element.category;
        product.image = element.image;
        product.rating.rate = element.rating.rate;
        product.rating.count = element.rating.count;
        product.id = element.id;

        descData.forEach(d =>{
            if(d.id == product.id)
            {
                product.description = d.descripcion;
            }
        })

        stock.push(product);
        
    });
    }catch(error)
    {
        console.error(`Error al cargar productos`, error);
    }
};

const categories = new Map();
const dropdown = new Map();
fillStock().then(() => {

    stock.forEach(element => {
        if(categories.has(element.category))
        {
            categories.get(element.category).push(element);
        }else{
            categories.set(element.category, [element]);
        }
    });

    const firstOption = document.createElement('option');
    firstOption.value = 'Todos los elementos';
    firstOption.textContent = 'Todos los elementos';
    dropdownSearch.appendChild(firstOption);

    categories.forEach((element,key) => {
        const product = document.createElement('div');
        product.classList.add('product');
        product.id = "ID"+key;
        const title = document.createElement('h3');
        const contain = document.createElement('div');
        contain.classList.add('SubContain');

        const previous = document.createElement('div');
        const next = document.createElement('div');
        previous.classList.add('previous');
        next.classList.add('next');
        const btnPrevious = document.createElement('button');
        btnPrevious.innerHTML = '&lt';
        const btnNext = document.createElement('button');
        btnNext.innerHTML = '&gt';
        previous.appendChild(btnPrevious);
        next.appendChild(btnNext);

        const carousel = document.createElement('div');
        carousel.classList.add('carousel');

        element.forEach(e =>{

            const item = document.createElement('div');
            item.classList.add('item');
            const titleDiv = document.createElement('div');
            titleDiv.classList.add('titleDiv');
            const title = document.createElement('h3');
            titleDiv.appendChild(title);
            title.textContent = e.title;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('itemDiv');
            const image = document.createElement('img');
            image.src = e.image;
            item.appendChild(titleDiv);
            itemDiv.appendChild(image);
            item.appendChild(itemDiv);
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('buttonDiv');
            const button = document.createElement('button');
            button.innerHTML=`${e.price}$<br>Añadir al carrito`;

            button.addEventListener('click', () => {
                itemDescription.style.display = 'grid'
                
// imagePreview
// productDescription
// productPrice
                const image = document.createElement('img')
                image.src = e.image;
                const title = document.createElement('h3');
                title.textContent = e.title;

                const imageDiv = document.createElement('div');
                const titleDive = document.createElement('div');

                titleDive.append(title);
                imageDiv.append(image);
                imagePreview.append(titleDive);
                imagePreview.append(imageDiv);

                const description = document.createElement('p');
                description.textContent = e.description;

                const rating = document.createElement('span');
                rating.innerHTML = `Rating: ${e.rating.rate} &starf;`;
                
                productDescription.append(description);
                productDescription.append(rating);

                const addCart = document.createElement('button');
                addCart.innerHTML=`${e.price}$<br>Añadir al carrito`;
                productPrice.append(addCart);
          
            });

            buttonDiv.appendChild(button);
            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('ratingDiv');
            const rating = document.createElement('span');
            rating.innerHTML = `Rating: ${e.rating.rate} &starf;`;
            ratingDiv.appendChild(rating);

            item.appendChild(buttonDiv);
            item.appendChild(ratingDiv);

            carousel.appendChild(item)
        });

        // ASIGNAR FUNCION DE LOS BOTONES

        btnPrevious.addEventListener('click', () => {
            carousel.scrollBy({
                left: -300, // cantidad de desplazamiento
                behavior: 'smooth'
            });
        });

        btnNext.addEventListener('click', () => {
            carousel.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });

        ////añadir

        contain.appendChild(previous);
        contain.appendChild(carousel);
        contain.appendChild(next);

        title.textContent = key;
        product.appendChild(title);
        product.appendChild(contain);
        container.append(product);
        if(!dropdown.has(key))
        {
            dropdown.set(key, product.id);
        }
        
        
    });
    dropdown.forEach((element, key) => {
        const option = document.createElement('option');
        option.value = element;
        option.textContent = key;
        dropdownSearch.appendChild(option);
        });
    dropdownSearch.addEventListener('change', (event) => {
        const selectedOption = event.target.value;
        if (selectedOption === 'Todos los elementos') {
            dropdown.forEach((element, key) => {
                if(key != 'Todos los elementos')
                {
                    const item = document.getElementById(element);
                    item.style.display = 'block';
                }
            });
            // selectedProduct.style.display = 'block';
        }else{

            dropdown.forEach((element, key) => {
                if(key != 'Todos los elementos')
                {
                    const item = document.getElementById(element);
                    if(element != selectedOption){
                        item.style.display = 'none';
                    }else{
                        item.style.display = 'block';
                    }
                }
            });
        }
    });
    

});
