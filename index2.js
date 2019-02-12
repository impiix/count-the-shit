var activeModules = [
    { name: 'module 1' },
    { name: 'module 2' },
    { name: 'module 11' },
    { name: 'module 3' },
    { name: 'module 10' }
];
var customModuleRe = new RegExp('\\d+');
var getCustomModuleNumber = function () {
    var max = 0;
    for (var i = 0; i < activeModules.length; i++) {
        var current = customModuleRe.exec(activeModules[i].name);
        if (current) {
            var num = parseInt(current[0]);
            if (!isNaN(num) && num > max) {
                max = num;
            }
        }
    }
    return max;
};

console.log(getCustomModuleNumber());

var r = array.map( x => {
    x.c = Number(x.b) - Number(x.a);
    return x
})


let activeModules1 = [
    { name: 'module 1' },
    { name: 'module 2' },
    { name: 'module 11' },
    { name: 'module 3' },
    { name: 'module 10' }
];

let getCustomModuleNumber1 =
    () => activeModules1
        .map(a => /\d+/.exec(a.name))
        .filter(a => a && a[0])
        .map(a => parseInt(a[0]))
        .reduce((a, b) =>
            Math.max(a, b),
            0);


console.log(getCustomModuleNumber1());

