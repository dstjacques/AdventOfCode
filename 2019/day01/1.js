
function findFuel(mass) {
    return Math.floor(mass / 3.0) - 2;
}

function findFuelAdditional(mass) {
    var total = 0;
    var fuel = mass;
    while (1) {
        fuel = findFuel(fuel);
        if (fuel < 0) {
            break;
        }
        total += fuel;
    }
    return total;
}

console.assert(findFuel(12) === 2, 'findFuel 12');
console.assert(findFuel(14) === 2, 'findFuel 14');
console.assert(findFuel(1969) === 654, 'findFuel 1969');
console.assert(findFuel(100756) === 33583, 'findFuel 100756');

console.assert(findFuelAdditional(12) === 2, 'findFuelAdditional 12');
console.assert(findFuelAdditional(14) === 2, 'findFuelAdditional 14');
console.assert(findFuelAdditional(1969) === 966, 'findFuelAdditional 1969');
console.assert(findFuelAdditional(100756) === 50346, 'findFuelAdditional 100756');

var masses = [
'57351',
'149223',
'142410',
'129063',
'91757',
'52486',
'125555',
'124161',
'104558',
'110002',
'140284',
'131259',
'142148',
'69648',
'73179',
'89820',
'125606',
'70238',
'131217',
'99388',
'71989',
'126743',
'55136',
'128148',
'52974',
'131314',
'82350',
'126565',
'54418',
'105347',
'71981',
'146156',
'113626',
'117829',
'55419',
'91350',
'137748',
'113160',
'102462',
'100948',
'101731',
'131526',
'139132',
'51796',
'100849',
'122579',
'132301',
'51675',
'86607',
'140890',
'77532',
'81217',
'149549',
'113161',
'119361',
'109709',
'64495',
'103062',
'72313',
'140119',
'77352',
'91658',
'141341',
'91664',
'64771',
'88263',
'102357',
'149925',
'123608',
'88368',
'57809',
'65165',
'63937',
'78600',
'134725',
'58438',
'62763',
'131789',
'119646',
'65649',
'143975',
'142866',
'97922',
'64427',
'149451',
'84896',
'75863',
'53950',
'55625',
'146904',
'50460',
'99284',
'125904',
'85856',
'60281',
'79113',
'111661',
'145106',
'105568',
'147400'
];

function findTotalFuel(total, mass) {
    return total + findFuel(mass);
}

function findTotalFuelAdditional(total, mass) {
    return total + findFuelAdditional(mass);
}

console.log("Part 1: " + masses.reduce(findTotalFuel, 0));
console.log("Part 2: " + masses.reduce(findTotalFuelAdditional, 0));
console.log('Done');