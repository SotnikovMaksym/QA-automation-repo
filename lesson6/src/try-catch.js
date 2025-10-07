async function getData () {
    try {
        const response1 = await fetch('https://jsonplaceholder.typicode.com/__not-found__');
        if (!response1.ok) {
            throw new Error('First source can\'t be reached');
        } else {
            const json1 = await response1.json();
            return getItemById(json1, 100);
        }
    } catch (e) {
        if (e.message.includes('First source can\'t be reached')) {
            const response2 = await fetch('https://jsonplaceholder.typicode.com/todos');
            if (!response2.ok) throwError();
            const json2 = await response2.json();
            return getItemById(json2, 100);
        } else {
            throw e;
        }
    }
}

function throwError () {
    throw new Error('Two sources can\'t be reached');
}

function getItemById (json, id) {
    return json.find(item => item.id === id);
}

(async () => {
    try {
        const item = await getData();
        console.log(item);
    } catch (e) {
        console.log(e.message);
    }
})();
