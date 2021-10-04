function show_data(sat) {
    fetch(`./satellite/${sat}/`)
    .then(response => response.text()
    )
    .then(text => {
        document.querySelector('#data').innerHTML = text;
    });
}

document.addEventListener('DOMContentLoaded', function(){

    document.querySelectorAll('li').forEach(data => {
        data.onclick = function() {
            //show_products(this.dataset.key);
            show_data(this.dataset.satellite);
        }
    });
});