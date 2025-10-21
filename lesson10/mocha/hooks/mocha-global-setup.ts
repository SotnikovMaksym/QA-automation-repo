exports.mochaGlobalSetup = function() {
    console.log('Open browser before tests  run');
};
exports.mochaGlobalTeardown = function() {
    console.log('Close browser after tests are done');
};
