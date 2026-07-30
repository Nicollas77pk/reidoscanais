container.innerHTML += `

<div class="event-card">


    <div class="event-image">

        <img src="${evento.poster}">


        <span class="event-badge">

            ⏰ ${evento.start_time.substring(11,16)}

        </span>


    </div>



    <div class="event-info">


        <h3 class="event-title">

            ${evento.title}

        </h3>



        <p class="event-meta">

            ${evento.competition} · ${evento.start_time.substring(11,16)}

        </p>


    </div>


</div>

`;
