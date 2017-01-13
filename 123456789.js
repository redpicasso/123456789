console.log('Starting calculations');

function writeResults(myArray) {
    require('fs').writeFile(
        'results.txt',
        JSON.stringify(myArray, function (key, value) {
                return (value == null) ? "" : value
            }
        ),
        function (err) {
            if (err) {
                console.error('File write issue');
            }
        }
    );
}

function readResults() {
    return require('fs').readFileSync(
        'results.txt',
        function read(err, data) {
            if (err) {
                throw err;
            }
        })
}

//var results = [];
var results = JSON.parse(readResults());
var hrTime  = process.hrtime();
var time1 = hrTime[0] + hrTime[1] / 1000000000;
var upTo = 11111;
var probability = .001;
var operators = ["", "+", "-", "*", "/", "**"];
var probabilities = [0, .16, .33, .5, .66, .83, 1];
//var probabilities = [0, .2, .4, .6, .8, .8, 1];
var numerals = '';
var count = 0;

for (var i = 0; i < 10000000 ;  i++) {
    numerals = '1';
    for (var j = 2; j < 10; j++) {
        operatorsRandom = Math.random();
        for (var k = 0; k < 6; k++) {
            if (operatorsRandom > probabilities[k] && operatorsRandom < probabilities[k + 1]) {
                numerals = numerals + operators[k];
                break;
            }
        }
        numerals = numerals + j;
        currentResult = eval(numerals);
        if ( ( currentResult > upTo / probability || currentResult < -(upTo / probability )) && 1) {
            break
        }
    }
    var number = eval(numerals);
    if (number > 0 && number < upTo && !results[number] && (number === parseInt(number))) {  //If the number is to large, we probably won't find an answer
        results[number] = number + ' = ' + numerals;
        count++;
        //console.log(results[number] + ' count: ' + count);
    }
}

count = 0;
results.forEach(function(solution) {
    if (solution) {
        console.log(solution);
        count++;
    }
})

hrTime  = process.hrtime();
var time2 = hrTime[0] + hrTime[1] / 1000000000;
writeResults(results);
console.log('Results: ' + count + ' in ' + (time2 - time1) + ' seconds');