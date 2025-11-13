const main = document.getElementById('main');
const content = document.getElementById('container');

function lerp(a, b, t) {
    return a + (b - a) * t;
    }

function smoothstep(t) {
    return t * t * (3 - 2 * t);
}
function smoothLerp(a, b, t) {
    // Aseguramos que t esté entre 0 y 1
    t = Math.max(0, Math.min(1, t));
    t = smoothstep(t);
    return a + (b - a) * t;
}


function intro()
{
    main.classList.add('mainIntro');
    content.style.opacity = '0';
    content.style.display = 'none';
    let contador = 0;
    const intro = document.createElement('div');
    intro.classList.add('intro');
    const img = document.createElement('img');
    img.src = 'Resources/carritoImage.png';
    const span = document.createElement('span');
    span.style.width = `${contador}%`;

    
    function fadeOut()
    {
        if(contador > 0)
        {
            contador--;
            span.style.opacity = `${(contador/100)}`;
            img.style.opacity = `${(contador/100)}`;
            setTimeout(fadeOut, 10); // vuelve a ejecutar después de 10 ms
        }else{
            intro.remove();
            contador = 50;
            smoothAnimation();
            main.classList.remove('mainIntro');
            content.style.display = 'block';
            setTimeout(fadeProductsIn, 1000);
        }
    }
    let time = 0;
    function fadeProductsIn()
    {
        if(time < 1)//opacity
        {
            time = smoothLerp(time,1.1,0.1);
            content.style.opacity = `${time}`;
            console.log(time)
            setTimeout(fadeProductsIn, 10);
        }
    }
    const spanTitle = document.querySelector('.title');
    function smoothAnimation() {
        if (contador > 1.01) {
            contador = smoothLerp(contador, 3, 0.1);
            spanTitle.style.left = `${contador}%`;
            spanTitle.style.transform = `translate(-${contador}%, 0%)`;
            setTimeout(smoothAnimation, 10); // vuelve a ejecutar después de 10 ms
        }
    }
    

    function loading() {
        function smoothAnimation() {
        if (contador < 99.01) {
            contador = smoothLerp(contador, 100, 0.1);
            span.style.width = `${contador}%`;
            setTimeout(smoothAnimation, 10); // vuelve a ejecutar después de 10 ms
        }else{
            span.classList.add('spanGlow');
            fadeOut();
        }
        };
        smoothAnimation();
        // if(contador < 100)
        // {
        //     contador++;
        //     span.style.width = `${contador}%`;
        //     setTimeout(loading, 10); // vuelve a ejecutar después de 10 ms
        // }else{
        //     span.classList.add('spanGlow');
        //     fadeOut()
        // }
    }
    loading();
    intro.appendChild(img);
    intro.appendChild(span);
    main.appendChild(intro);
}
intro()
