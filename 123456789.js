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

function insertRandomBrackets(numerals) {
    var first = Math.ceil(Math.random() * 8); //No brackerets after last value
    var second = Math.ceil(Math.random() * (9 - first)); //must be after first

    index = numerals.indexOf(first);
    if (numerals.charAt(index-1) != parseInt(numerals.charAt(index-1))) {
        var numerals1 = numerals.substr(0, index) + '('+ numerals.substr(index);

        index = numerals1.indexOf(second  + first);
            if (numerals1.charAt(index+1) != parseInt(numerals1.charAt(index+1))) {
                numerals = numerals1.substr(0, index + 1) + ')' + numerals1.substr(index + 1);
            }
    }
    return numerals;
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

for (var i = 0; i < 100000000 ;  i++) {
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
        if ( ( currentResult > upTo / probability || currentResult < -(upTo / probability )) && 1) { //If the number is to large or small, we probably won't find an answer
            break
        }
    }
    if (j == 10) {
        bracketNumber = Math.random() * 100;

        numerals = insertRandomBrackets(numerals);
        var number = eval(numerals);
        if (number > 0 && number < upTo && !results[number] && (number === parseInt(number))) {
            results[number] = number + ' = ' + numerals;
            count++;
            //console.log(results[number] + ' count: ' + count);
        }
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