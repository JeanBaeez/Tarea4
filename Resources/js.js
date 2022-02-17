




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

function createGrafico() {
    let chart = document.createElement("canvas");
    chart.setAttribute("id", "grafico");
    chart.setAttribute("width", "400");
    chart.setAttribute("height", "200");
    chart.setAttribute("style", "margin: 0 auto;");
    chart.setAttribute("class", "container");

    document.body.appendChild(chart);
    let chart1 = document.createElement("canvas");
    chart1.setAttribute("id", "grafico1");
    chart1.setAttribute("width", "400");
    chart1.setAttribute("height", "200");
    chart1.setAttribute("style", "margin: 0 auto;");
    chart1.setAttribute("class", "container");
    document.body.appendChild(chart1);
    let chart2 = document.createElement("canvas");
    chart2.setAttribute("id", "grafico2");
    chart2.setAttribute("width", "400");
    chart2.setAttribute("height", "200");
    chart2.setAttribute("style", "margin: 0 auto;");
    chart2.setAttribute("class", "container");
    document.body.appendChild(chart2);
    let chart3 = document.createElement("canvas");
    chart3.setAttribute("id", "grafico3");
    chart3.setAttribute("width", "400");
    chart3.setAttribute("height", "200");
    chart3.setAttribute("style", "margin: 0 auto;");
    chart3.setAttribute("class", "container");
    document.body.appendChild(chart3);
    let chart4 = document.createElement("canvas");
    chart4.setAttribute("id", "grafico4");
    chart4.setAttribute("width", "2000px");
    chart4.setAttribute("height", "900px");
    chart4.setAttribute("style", "margin: 0 auto;");
    chart4.setAttribute("class", "container chart");
    document.body.appendChild(chart4);
    LoadChart();

}
function CreateSecondCHart() {

}

function LoadChart() {

    let Data = JSON.parse(localStorage.getItem("Data"));

    let Robo = Data.filter((obj) => obj.selected === "Robo").length;
    let Atraco = Data.filter((obj) => obj.selected === "Atraco").length;
    let Homicidio = Data.filter((obj) => obj.selected === "Homicidio").length;
    let Otros = Data.filter((obj) => obj.selected === "Otros").length;

    let PorDelito = [Robo, Atraco, Homicidio, Otros];
    let data = [1, 2, 3, 4, 5];

    const ctx = document.getElementById("grafico").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Robo', 'Atraco', 'Homicidio', 'Etc'],
            datasets: [{
                label: ['Casos'],
                data: PorDelito,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    const ctx1 = document.getElementById("grafico1").getContext('2d');

    const Dias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];

    let day = [];

    let Dia = [];
    let tipo = [];

    let arr = new Array(Data);



    const myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: [Dias],
            datasets: [{
                label: 'Casos Por Dia',
                data: [tipo],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    const ctx2 = document.getElementById("grafico2").getContext('2d');
    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'F'],
            datasets: [{
                label: 'Calificaciones por eq',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var nuevoARR = [];

    for (let index = 0; index < Data.length; index++) {
        const element = Data[index];
        nuevoARR.push(element.fecha);

    }

    console.log(nuevoARR);
    let fechas = nuevoARR;
    let date = new Date();
    let days = [];
    fechas.forEach(element => {
        console.log(element);
        date = new Date(element).getDay();
        if (element.length > 0) {
            days.push(date);
        }

    });
    days.sort(function (a, b) { return a - b });
    let d = GetCurrentWeek(days);
    console.log(d);






    const ctx3 = document.getElementById("grafico3").getContext('2d');
    const myChart3 = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"],
            datasets: [{
                label: 'Homicidios Por Dia',
                data: [d],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    const ctx4 = document.getElementById("grafico4").getContext('2d');
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let mes = new Array(fechas).filter(function (e) { return e != "" });
    let m = [];


    for (let index = 0; index < mes[0].length; index++) {



        let newDate = new Date(mes[0][index]);
        newDate = newDate.getMonth();
        switch (newDate) {
            case 0:
                m.push("Enero");
                break;

            case 1:
                m.push("Febrero");
                break;

            case 2:
                m.push("Marzo");
                break;

            case 3:
                m.push("Abril");
                break;

            case 4:
                m.push("Mayo");
                break;

            case 5:
                m.push("Junio");
                break;

            case 6:
                m.push("Julio");
                break;

            case 7:
                m.push("Agosto");
                break;

            case 8:
                m.push("Septiembre");
                break;

            case 9:
                m.push("Octubre");
                break;

            case 10:
                m.push("Noviembre");
                break;

            case 11:
                m.push("Diciembre");
                break;


        }
    };
    console.log(mes);
    console.log(m);
    let eneroCount = m.filter(x => x === "Enero").length;
    let febreroCount = m.filter(x => x === "Febrero").length;
    let marzoCount = m.filter(x => x === "Marzo").length;
    let abrilCount = m.filter(x => x === "Abril").length;
    let mayoCount = m.filter(x => x === "Mayo").length;
    let junioCount = m.filter(x => x === "Junio").length;
    let julioCount = m.filter(x => x === "Julio").length;
    let agostoCount = m.filter(x => x === "Agosto").length;
    let septiembreCount = m.filter(x => x === "Septiembre").length;
    let octubreCount = m.filter(x => x === "Octubre").length;
    let noviembreCount = m.filter(x => x === "Noviembre").length;
    let diciembreCount = m.filter(x => x === "Diciembre").length;




    const myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: [meses],
            datasets: [{
                label: "Comparacion de Meses",
                data: [eneroCount, febreroCount, marzoCount, abrilCount, mayoCount, junioCount, julioCount, agostoCount, septiembreCount, octubreCount, noviembreCount, diciembreCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',


                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }

        }
    });
}
function GetCurrentWeek(datos) {

    let Week = [];


    for (let index = 0; index < datos.length; index++) {
        const element = datos[index];


        switch (element) {
            case 0: {
                Week.push("Sunday");
                break;
            }
            case 1: {
                Week.push("Monday");
                break;
            }
            case 2: {
                Week.push("Tuesday");
                break;
            }
            case 3: {
                Week.push("Wednesday");
                break;
            }
            case 4: {
                Week.push("Thursday");
                break;
            }
            case 5: {
                Week.push("Friday");
                break;
            }
            case 6: {
                Week.push("Saturday");
                break;
            }

        }

    }
    return Week;
}