function Caso(titulo, fecha, selected, descripcion, link, lugar, latitud, longitud, muertos, heridos) {
    this.titulo = titulo;
    this.fecha = fecha;
    this.selected = selected;
    this.descripcion = descripcion;
    this.link = link;
    this.lugar = lugar;
    this.latitud = latitud;
    this.longitud = longitud;
    this.muertos = muertos;
    this.heridos = heridos;

}
function LoadData() {

    let titutlo = document.getElementById("titulo").value;
    let fecha = document.getElementById("fecha").value;
    let selected = document.getElementById("selected").value;
    let descripcion = document.getElementById("descripcion").value;
    let link = document.getElementById("url").value;
    let lugar = document.getElementById("lugar").value;
    let latitud = document.getElementById("latitud").value;
    let longitud = document.getElementById("longitud").value;
    let muertos = document.getElementById("muertos").value;
    let heridos = document.getElementById("heridos").value;
    if (titutlo != "" && fecha != "" && selected != "" && descripcion != "" && link != "" && lugar != "" && latitud != "" && longitud != "" && muertos != "" && heridos != "") {
        Swal.fire({
            title: 'Caso Registrado!',
            text: 'Puede verlo en la seccion de "Casos Registrados"',
            icon: 'success',
            confirmButtonText: 'OK'
        })

    }





    let Data = [new Caso(titutlo, fecha, selected, descripcion, link, lugar, latitud, longitud, muertos, heridos)];


    if (localStorage.getItem("Data") != null) {
        let oldData = Array.from(JSON.parse(localStorage.getItem("Data")));
        Data = Data.concat(oldData);
        localStorage.setItem("Data", JSON.stringify(Data));
        Swal.fire({
            title: 'Caso Registrado!',
            text: 'Puede verlo en la seccion de "Casos Registrados"',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    } else {
        localStorage.setItem("Data", JSON.stringify(Data));
    }
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// super simple router - go to page specified in hash, otherwise go to "default"
function router(route) {
    const pageName = route ? route : $('.default.page').attr('data-page-name');
    const $page = $(`[data-page-name="${pageName}"]`);
    $('.page').css('display', 'none');
    $('[data-page]').removeClass('active');
    $(`[data-page="${pageName}"]`).addClass('active');
    $page.css('display', 'block');
}
router();

// fake loader
let progress = 0;
const fakeLoaderInterval = window.setInterval(function () {
    const $lp = $('.loading-progress');
    progress = progress + getRandomArbitrary(10, 25)
    $lp.css('transform', `translateX(${progress}%)`);

    if (progress >= 75) {
        window.clearInterval(fakeLoaderInterval);
        $lp.css('transform', 'translateX(100%)');
        setTimeout(() => $('.loading').css('transform', 'translateY(calc(100% + 10px))'), 400);
    }
}, getRandomArbitrary(100, 500));

// navigation
$('.main-nav li a').on('click', e => {
    const $this = $(e.currentTarget);
    const route = $this.attr('data-page');

    $('.main-nav li a').removeClass('active');
    $this.addClass('active');
    router(route);
});
$(".nav a").on("click", function () {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});