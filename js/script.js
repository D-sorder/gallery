const URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const gallery = document.querySelector(".gallery");
const btn = document.querySelector(".gallery-heading__btn");
const loader = document.querySelector(".loader");
const loaderImg = document.querySelector(".loader__img");
let rotationSpeed = 2;
let loaderInterval;

function rotation() {
    loaderImg.style.transform = "rotate(" + rotationSpeed + "deg)";
    rotationSpeed += 2;
}

btn.addEventListener("click", async ()=>{
    gallery.classList.add("active");
    loader.classList.add("active");
    loaderInterval = setInterval(rotation, 10);

    try {
        const response = await fetch(URL);
        const data = await response.json();
        
        const imageLoadPromises = data.map((image) => {
            return new Promise((resolve) => {
                let imgElement = document.createElement("img");
                imgElement.src = image.url;
                imgElement.alt = "РР·РѕР±СЂР°Р¶РµРЅРёРµ РєРѕС‚РµРєР°";
                imgElement.classList.add("gallery__item");

                imgElement.onload = resolve;
                
                let imgContainer = document.createElement("div");
                imgContainer.classList.add("gallery__item");
                imgContainer.appendChild(imgElement);
                
                gallery.appendChild(imgContainer);
            });
        });

        await Promise.all(imageLoadPromises);

    } catch (err) {
        console.error("error:", err);
    } finally {
        loader.classList.remove("active");
        clearInterval(loaderInterval);
    }
});

// function rotation() {
//     console.log(1);
//     loaderImg.style.transform = "rotate(" + rotationSpeed + "deg)";
//     rotationSpeed+=2;
//     setTimeout(rotation(), 1000);
// };

// неполучилось сделать анимацию( как она начинается она вызывается 10тыс раз в 2 секунду (какое бы время я не ставил в сетТаймаут) и страница ломается



