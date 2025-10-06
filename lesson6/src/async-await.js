async function getData () {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    console.log(response.ok, response.status);
    const json = await response.json();
    const item = getItemById(json, 100);
    return item;
}

function getItemById (json, id) {
    return json.find(item => item.id === id);
}

(async () => {
    const item = await getData();
    console.log(item);
})();
