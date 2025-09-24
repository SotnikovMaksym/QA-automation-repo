let age = 30;
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

age = 15;
switch (true) {
    case (age <= 17):
        console.log('You don\'t have permissions');
        break;
    case (age >= 18):
        console.log('Welcome');
        break;
    case (age >= 30):
        console.log('You are too old:D');
        break;
    default:
        console.log('Wrong result');
}

age = 20;
switch (true) {
    case (age <= 17):
        console.log('You don\'t have permissions');
        break;
    case (age >= 18):
        console.log('Welcome');
        break;
    case (age >= 30):
        console.log('You are too old:D');
        break;
    default:
        console.log('Wrong result');
}

age = 'Hello';
switch (true) {
    case (age <= 17):
        console.log('You don\'t have permissions');
        break;
    case (age >= 18):
        console.log('Welcome');
        break;
    case (age >= 30):
        console.log('You are too old:D');
        break;
    default:
        console.log('Wrong result');
}
