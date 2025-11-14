const userButton = document.getElementById('btnAccount');
const userLabel = document.getElementById('userLabel');
const userMenu = document.getElementById('Divaccount');
const cart = document.getElementById('cart');
const cartTotal = document.querySelector('.cartShoop div');
const cartPanel = document.getElementById('Divcart');

export let sesionActive = false;
export let Account;

document.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("fakeUser");

    if (savedUser) {
        //showWelcome(savedUser);
    } else {
       //document.getElementById("loginBox").style.display = "block";
    }
});

cartPanel.addEventListener("click", (e) => {
        // Si el clic fue directamente en el fondo (no dentro del cuadro)
        if (e.target === cartPanel) {
            cartPanel.style.display = "none";

        }
    });

userMenu.addEventListener("click", (e) => {
        // Si el clic fue directamente en el fondo (no dentro del cuadro)
        if (e.target === userMenu) {
            userMenu.style.display = "none";
            userMenu.innerHTML = "";
        }
    });

userButton.addEventListener('click', () => {
    if (sesionActive) {
        logOut()
    } else {
        logIn()
    }
});

cart.addEventListener('click', () => {
    if (sesionActive) {
        showCart()
    } else {
        logIn()
    }
});

export function logIn()
{
    userMenu.style.display = 'grid';
    userMenu.innerHTML = ""
    const div = document.createElement('div');
    div.classList.add('accountLogIn');

    const userLabel = document.createElement('label');
    userLabel.textContent = 'Usuario';
    userLabel.for = 'user';
    const user = document.createElement('input');
    user.type = 'text'; 
    user.placeholder = 'Usuario';
    user.name = 'user';


    const passLabel = document.createElement('label');
    passLabel.textContent = 'Contraseña';
    passLabel.for = 'pass';
    const pass = document.createElement('input');
    pass.type = 'password';
    pass.placeholder = 'Contraseña';
    pass.name = 'pass';
    const button = document.createElement('button');
    button.textContent = 'Iniciar Sesión';

    button.addEventListener('click', () => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userValue = user.value;
        const passValue = pass.value;

        const userFound = users.find(user => user.user === userValue && user.pass === passValue);

        if (userFound) {
            Account = userFound;
            sesionActive = true;
            userMenu.style.display = 'none';
            userMenu.innerHTML = "";
            showWelcome(userValue);
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });

    const buttonCreate = document.createElement('button');
    buttonCreate.textContent = 'Crear Cuenta';
    

    buttonCreate.addEventListener('click', () => {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userValue = user.value;
        const passValue = pass.value;
        const fakeUser = {
            user: userValue,
            pass: passValue,
            cart: []
        };
        if(passValue.length > 0 && userValue.length > 0)
        {
            Account = fakeUser;
            users.push(fakeUser);
            localStorage.setItem("users", JSON.stringify(users));

            sesionActive = true;
            userMenu.style.display = 'none';
            userMenu.innerHTML = "";
            showWelcome(userValue);
        }else{
            alert("El usuario y la contraseña no pueden estar vacios");
        }
    });

    const buttonCancel = document.createElement('button');
    buttonCancel.textContent = 'Cancelar';
    buttonCancel.addEventListener('click', () => {
        userMenu.style.display = 'none';
        userMenu.innerHTML = "";
    });


    userMenu.appendChild(div);
    div.appendChild(userLabel);
    div.appendChild(user);
    div.appendChild(passLabel);
    div.appendChild(pass);
    div.appendChild(button);
    div.appendChild(buttonCreate);
    div.appendChild(buttonCancel);
}
function logOut()
{
    // localStorage.removeItem("fakeUser");
    sesionActive = false;
    userButton.textContent = 'Iniciar Sesión';
    userLabel.textContent = 'Iniciar Sesión';
}

function showWelcome(user)
{
    userMenu.style.display = 'none';
    userMenu.innerHTML = ""
    
    userLabel.textContent = "Bienvenido, "+user;
    userButton.textContent = 'Cerrar Sesión';
    
    const span = document.createElement('span');
    span.textContent = Account.cart.length;
    cartTotal.appendChild(span);
}

export function updateCart()
{
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(user => user.user === Account.user && user.pass === Account.pass);
    if (userIndex !== -1) {
        users[userIndex].cart = Account.cart; 
        localStorage.setItem("users", JSON.stringify(users)); 

        const span = document.createElement('span');
        span.textContent = Account.cart.length;
        cartTotal.innerHTML = "";
        cartTotal.appendChild(span);
    } else {
        console.error("No se encontró el usuario en el localStorage.");
    }
}

// export function showCart()
// {
//     cartPanel.style.display = 'grid';
//     cartPanel.innerHTML = "";
//     const div = document.createElement('div');
//     div.classList.add('cartDiv');
//     const title = document.createElement('h1');
//     title.textContent = 'Carrito de compras';
//     const close = document.createElement('button');
//     close.textContent = 'Cerrar';
//     close.addEventListener('click', () => {
//         cartPanel.style.display = 'none';
//         cartPanel.innerHTML = "";
//     });
//     close.classList.add('Btnclose');
//     const buy = document.createElement('button');
//     buy.textContent = 'Comprar';
//     buy.classList.add('Btnclose');
//     buy.addEventListener('click', () => {
//         cartPanel.style.display = 'none';
//         cartPanel.innerHTML = "";
//         Account.cart = [];
//         //span.textContent = Account.cart.length;
//     });

//     div.appendChild(title);
//     div.appendChild(close);
//     cartPanel.appendChild(div);
//     Account.cart.forEach((e) => {
//         const item = document.createElement('div');
//         item.classList.add('cartItem');

//         const img = document.createElement('img');
//         img.src = e.image;

//         const title = document.createElement('span');
//         title.textContent = e.title;
//         title.title = e.title;

//         const price = document.createElement('span');
//         price.textContent = "$"+e.price;

//         const remove = document.createElement('button');
//         remove.textContent = 'Quitar';
//         remove.addEventListener('click', () => {
//             const index = Account.cart.indexOf(e);
//             if (index !== -1) {
//                 Account.cart.splice(index, 1);
//                 showCart();
//             }
//         });

//         item.appendChild(img);
//         item.appendChild(title);
//         item.appendChild(price);
//         item.appendChild(remove);
//         div.appendChild(item);
//     });
// }

export function showCart() {
    cartPanel.style.display = 'grid';
    cartPanel.innerHTML = "";

    const div = document.createElement('div');
    div.classList.add('cartDiv');

    const title = document.createElement('h1');
    title.textContent = 'Carrito de compras';

    const close = document.createElement('button');
    close.textContent = 'Cerrar';
    close.addEventListener('click', () => {
        cartPanel.style.display = 'none';
        cartPanel.innerHTML = "";
    });
    close.classList.add('Btnclose');

    const buy = document.createElement('button');
    buy.textContent = 'Comprar';
    buy.classList.add('Btnclose');
    buy.addEventListener('click', () => {
        cartPanel.style.display = 'none';
        cartPanel.innerHTML = "";
    });

    div.appendChild(title);
    div.appendChild(close);
    div.appendChild(buy);

    // Contenedor de items con scroll
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add('cartItemsContainer');
    div.appendChild(itemsContainer);

    Account.cart.forEach((e) => {
        const item = document.createElement('div');
        item.classList.add('cartItem');

        const img = document.createElement('img');
        img.src = e.image;

        const title = document.createElement('span');
        title.textContent = e.title;
        title.title = e.title;

        const price = document.createElement('span');
        price.textContent = "$"+e.price;

        const remove = document.createElement('button');
        remove.textContent = 'Quitar';
        remove.addEventListener('click', () => {
            const index = Account.cart.indexOf(e);
            if (index !== -1) {
                Account.cart.splice(index, 1);
                updateCart();
                showCart();
            }
        });

        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(price);
        item.appendChild(remove);
        itemsContainer.appendChild(item);
    });

    cartPanel.appendChild(div);
}
