function montarPagina(canais, destino="categorias"){


    const categorias = {};



    // Separar canais por categoria

    canais.forEach(canal=>{


        const categoria =
        canal.category || "Outros";



        if(!categorias[categoria]){

            categorias[categoria] = [];

        }


        categorias[categoria].push(canal);


    });



    const container =
document.getElementById(destino);



    if(!container) return;



    container.innerHTML = "";


Object.keys(categorias).forEach(nome=>{


    container.insertAdjacentHTML(
        "beforeend",
        criarCategoria(
            nome,
            categorias[nome]
        )
    );


});



    requestAnimationFrame(()=>{


    Object.keys(categorias).forEach(nome=>{


        iniciarSliderCategoria(
            gerarId(nome)
        );


    });


});





function gerarId(nome){

    return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/\s+/g,"");

}






function criarCategoria(nome,canais,destino="categorias"){


    const id = gerarId(nome);



    return `


<section class="categoria-section">


<div class="container">


<div class="section-top">


<h2>


<svg xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="section-icon">


<path d="m17 2-5 5-5-5"></path>


<rect
width="20"
height="15"
x="2"
y="7"
rx="2">
</rect>


</svg>


${nome}


</h2>




<div class="section-actions">


<button 
id="${id}Prev"
class="slider-btn">

‹

</button>



<button 
id="${id}Next"
class="slider-btn">

›

</button>



<a
href="categoria.html?categoria=${encodeURIComponent(nome)}"
class="ver-todos">

Ver todos →

</a>


</div>


</div>




<div 
id="${id}Slider"
class="categoria-slider">


${criarCards(canais)}


</div>



</div>


</section>


`;

}






function criarCards(canais){


    let html = "";



    canais
    .slice(0,20)
    .forEach(canal=>{


        html += `


<div 
class="canal-card"
onclick="abrirModal('${canal.id}')">


<div class="canal-logo">


<img

src="${canal.logo_url}"

alt="${canal.name}"

loading="lazy">


</div>



<div class="canal-info">


<h3>

${canal.name}

</h3>



<p>


<strong>Agora:</strong><br>


${canal.epg?.current?.title || 
"Programação indisponível"}


</p>



</div>



</div>


`;


    });



    return html;


}






function iniciarSliderCategoria(id){


    const slider =
    document.getElementById(id+"Slider");



    if(!slider) return;



    const card =
    slider.querySelector(".canal-card");



    if(!card) return;



    const largura =
    card.offsetWidth + 16;



    const next =
    document.getElementById(id+"Next");



    const prev =
    document.getElementById(id+"Prev");




    if(next){


        next.onclick = ()=>{


            slider.scrollBy({

                left: largura,

                behavior:"smooth"

            });


        };


    }





    if(prev){


        prev.onclick = ()=>{


            slider.scrollBy({

                left:-largura,

                behavior:"smooth"

            });


        };


    }





    let intervalo =
    setInterval(()=>{


        if(
            slider.scrollLeft + slider.clientWidth
            >=
            slider.scrollWidth - 20
        ){


            slider.scrollTo({

                left:0,

                behavior:"smooth"

            });


        }else{


            slider.scrollBy({

                left:largura,

                behavior:"smooth"

            });


        }



    },6000);




    slider.addEventListener("mouseenter",()=>{

        clearInterval(intervalo);

    });



    slider.addEventListener("mouseleave",()=>{


        intervalo=setInterval(()=>{


            if(
                slider.scrollLeft + slider.clientWidth
                >=
                slider.scrollWidth - 20
            ){


                slider.scrollTo({

                    left:0,

                    behavior:"smooth"

                });


            }else{


                slider.scrollBy({

                    left:largura,

                    behavior:"smooth"

                });


            }


        },6000);



    });



}


function adicionarCategoriaSlider(nome,canais,destino){


    const container =
    document.getElementById(destino);



    if(!container) return;



    container.insertAdjacentHTML(
        "beforeend",
        criarCategoria(nome,canais)
    );



    const id = gerarId(nome);



    requestAnimationFrame(()=>{

        iniciarSliderCategoria(id);

    });


}
