async function getData () {
    try {
        const response1 = await fetch('https://imagined-source.com');
        if (response1.ok) {
            const json1 = await response1.json();
            return getItemById(json1, 100);
        }
    } catch (e) {
        console.log(e.message);
    }
    try {
        const response2 = await fetch('https://jsonplaceholder.typicode.com/todos/');

        if (response2.ok) {
            const json2 = await response2.json();
            return getItemById(json2, 100);
        }
    } catch (e) {
        console.log(e.message);
    }
    createError();
}

function getItemById (json, id) {
    return json.find(item => item.id === id);
}

function createError () {
    throw new Error('Can\'t reach both resources');
}

(async () => {
    try {
        const item = await getData();
        console.log(item);
    } catch (e) {
        console.log(e.message);
    }
})();
