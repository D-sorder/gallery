const URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const gallery = document.querySelector(".gallery");
const btn = document.querySelector(".gallery-heading__btn");
const loader = document.querySelector(".loader");
const loaderImg = document.querySelector(".loader__img");
let rotationSpeed = 2;

btn.addEventListener("click", async ()=>{
    gallery.classList.add("active");
    await fetch(URL)
        .then(async (response) => await response.json())
        .then((data) => {
            loader.classList.add("active");
            //if (loaderImg) rotation();
            data.forEach((image) => {
                setTimeout(()=>{
                    let imageURL = image.url;
                    let img = `
                    <div class="gallery__item">
                        <img src="${imageURL}" alt="Изображение котека"
                    </div>`;
                    gallery.insertAdjacentHTML("beforeend", img); 
                }, 0);
            });
        })
        .catch((err) => console.error("error:", err))
        .finally(setTimeout(() => loader.classList.remove("active"), 2000));
});

// function rotation() {
//     console.log(1);
//     loaderImg.style.transform = "rotate(" + rotationSpeed + "deg)";
//     rotationSpeed+=2;
//     setTimeout(rotation(), 1000);
// };

// неполучилось сделать анимацию( как она начинается она вызывается 10тыс раз в 2 секунду (какое бы время я не ставил в сетТаймаут) и страница ломается



