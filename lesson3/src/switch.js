const age = 16;
switch (age) {
    case 16:
        console.log('You don\'t have permissions');
        break;
    case 20:
        console.log('Welcome');
        break;
    case 30:
        console.log('You are too old:D');
        break;
    default:
        console.log('Wrong result');
}

const userName = 'Max';
switch (userName) {
    case 'John':
        console.log('You don\'t have permissions');
        break;
    case 'Max':
        console.log('Welcome');
        break;
    case 'Mark':
        console.log('You don\'t have permissions');
        break;
    default:
        console.log('Please fill in another name');
}

const a = 20;
switch (a) {
    case 10:
        console.log('a != 20');
        break;
    case 15:
        console.log('a != 20');
        break;
    case 20:
        console.log('a == 20');
        break;
    default:
        console.log('Wrong result');
}

const greeting = 'Hello';
switch (greeting) {
    case 'Hi':
        console.log('Wrong result 1');
        break;
    case 'Hello, Max':
        console.log('Wrong result 2');
        break;
    case 'Hi, John':
        console.log('Wrong result 3');
        break;
    default:
        console.log('Please fill in another greeting');
}
