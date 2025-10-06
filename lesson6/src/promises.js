function getData () {
    return fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => {
            console.log(response.ok, response.status);
            return response.json();
        })
        .then(json => {
            const item = getItemById(json, 100);
            console.log(item);
            return item;
        })
        .catch(e => console.log(e));
}

function getItemById (json, id) {
    return json.find(item => item.id === id);
}

getData();
