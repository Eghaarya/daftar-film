const scrollThreshold = 160; // Ubah ini sesuai kebutuhan, misalnya 200 piksel
const searchContainer = document.querySelector(".input-group");

window.addEventListener("scroll", function () {
    if (window.scrollY >= scrollThreshold) {
        searchContainer.classList.add("fixed-input-group");
        scrollToTop.style.display = "block";
    } else {
        searchContainer.classList.remove("fixed-input-group");
        scrollToTop.style.display = "none";
    }
});


$('#scrollToTop').on('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("focus", function () {
        this.setSelectionRange(0, this.value.length);
    });
});

function cariFilm() {
    $('#movie-list').html('');
    $('#countFilm').text('');

    let search;
    if ($('#search-input').val() == '') {
        search = 'naruto';
    } else {
        search = $('#search-input').val();
    }
    console.log(search);

    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'edbf7726',
            's': search
        },
        success: function (result) {
            if (result.Response == 'True') {

                // console.log(result);
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-4 col-md-2 border pt-2 mb-2">
                            <div class="see-detail" data-id="` + data.imdbID + `" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div class="card ">
                                    <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <p class="card-title mt-2 fs-6 text"><strong>` + data.Title + `</strong></p>
                                    <p class="card-text">` + data.Year + ` - ` + data.Type + `</p>
                                    <br>
                                    </div>
                                </div>
                            </div>
                        </div>
                   `);
                    return i;
                });
                if ($('#search-input').val() != '') {
                    $('#countFilm').text(movies.length + " Film ditemukan :");
                }

            } else {
                $('#movie-list').html('<h1 class="text-center">" <span class="text-danger">' + search + '</span> " Ngetik yang bener lahh!</h1>')
            }
        }
    })
};

cariFilm();

$('#search-button').on('click', function () {
    cariFilm();
});

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        const searchInput = document.getElementById("search-input");
        searchInput.blur();
        cariFilm();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({

        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'edbf7726',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`

                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4 d-flex align-items-center justify-content-center">
                            <img src="` + movie.Poster + `" class="img-fluid">
                        </div>

                        <div class="col-md-8 mt-2">
                            <ul class="list-group">
                                <li class="list-group-item"><h5 class="text-center">` + movie.Title + ` - (` + movie.Year + `)</h5></li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-3">
                                            <p>Genre</p>
                                        </div>
                                        <div class="col-1">
                                            <p>:</p>
                                        </div>
                                        <div class="col-8">
                                            <p>` + movie.Genre + `</p>
                                        </div>
                                    </div>               
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-3">
                                            <p>Rating</p>
                                        </div>
                                        <div class="col-1">
                                            <p>:</p>
                                        </div>
                                        <div class="col-8">
                                            <p>` + movie.imdbRating + ` ⭐ (` + movie.Rated + `)</p>
                                        </div>
                                    </div>               
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-3">
                                            <p>Released</p>
                                        </div>
                                        <div class="col-1">
                                            <p>:</p>
                                        </div>
                                        <div class="col-8">
                                            <p>` + movie.Released + `</p>
                                        </div>
                                    </div>               
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-3">
                                            <p>Durasi</p>
                                        </div>
                                        <div class="col-1">
                                            <p>:</p>
                                        </div>
                                        <div class="col-8">
                                            <p>` + movie.Runtime + `</p>
                                        </div>
                                    </div>               
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-3">
                                            <p>Aktor</p>
                                        </div>
                                        <div class="col-1">
                                            <p>:</p>
                                        </div>
                                        <div class="col-8">
                                            <p>` + movie.Actors + `</p>
                                        </div>
                                    </div>               
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-3">
                                            <p>Penjualan</p>
                                        </div>
                                        <div class="col-1">
                                            <p>:</p>
                                        </div>
                                        <div class="col-8">
                                            <p>` + movie.BoxOffice + `</p>
                                        </div>
                                    </div>               
                                </li>
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-3">
                                            <p>Sinopsis</p>
                                        </div>
                                        <div class="col-1">
                                            <p>:</p>
                                        </div>
                                        <div class="col-8">
                                            <p>` + movie.Plot + `</p>
                                        </div>
                                    </div>               
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                
                `)
            }
        }
    });
});