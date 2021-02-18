



document.addEventListener('DOMContentLoaded', function() {
    const splash = document.querySelector('.splash')
    console.log("test")
    document.querySelector('#searchButton').addEventListener('click', function(e) {
        e.preventDefault()
        splash.classList.add('fade-in')
        splash.classList.remove('d-none')
        splash.classList.remove('fade-out')
        const searchString = document.querySelector('#productSearch').value
        const urlEncodedSearchString = encodeURIComponent(searchString);
        fetch('https://api.rainforestapi.com/request?api_key=D323AD48C3F24BBB8F957FB6024D62C4&type=search&amazon_domain=amazon.com&search_term=' + urlEncodedSearchString + '&sort_by=featured' )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const searchResults = document.querySelector('#results')
                let resultsHTML = renderSearches(data.search_results)
                searchResults.innerHTML = resultsHTML;
                searchData = data.Search
                splash.classList.add('fade-out')
                splash.classList.remove('fade-in')
                setTimeout(() =>{
                    splash.classList.add('d-none')
                }, 2000);
            })
    })
})

function renderSearches(resultsArray) {
    const resultHtmlArray = resultsArray.map(function(currentResult) {
        if (currentResult.position == 1 || currentResult.position == 2 || currentResult.position == 3){
        return `<div>
            <h2>${currentResult.title}<h2>
            <img src="${currentResult.image}" class="picture" alt="product image">
            <div>`
        }
    });
        return resultHtmlArray.join('');
}
