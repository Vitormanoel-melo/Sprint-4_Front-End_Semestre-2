// MAP

/*  o método map mapeia todos os itens de um array e executa uma função "callback" para cada item e 
    retorna um novo array do mesmo tamanho

    Neste seguinte caso, doubles recebe numbers chamando método map, que recebe como parâmetro
    uma função anonima que tem "num", esse num representa cada numero que está vindo do array, e essa função 
    retorna o num vezes 2. 
*/

// array de números
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num){
    return num * 2;
});

// array anterior
console.log(numbers);
// [1, 4, 9]

// novo array
console.log(doubles);
// [2, 8, 18]


// converte de fahrenheit para celsius
var fahrenheit = [0, 32, 45, 46, 47, 91, 93, 121];
var celsius = fahrenheit.map(function(item)
{
    return Math.round( (item - 32) * 5 / 9 )
})

console.log(celsius)


// FILTER
var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// função que retorna apenas números pares
function buscarNumerosPares(numero){
    // divide o numero por 2, e verifica se o resto é zero
    if(numero % 2 == 0){
        // se atender a condição do if, retorna o numero
        return numero;
    }
}

// o array numerosPares recebe o array numeros, chamando o método filter, que 
// por sua vez recebe a função buscarNumerosPares, dessa maneira, o array numerosPares
// vai receber apenas os valores pares do array numeros
var numerosPares = numeros.filter(buscarNumerosPares);
console.log(numerosPares);


// REDUCE

// somatória
let valores = [1.5, 2, 4, 10]
let somatoria = valores.reduce(function(total, item)
{
    return total + item
});

console.log(somatoria)

// média
var valores = [1.5, 2, 4, 10]
var media = valores.reduce( (total, item, indice, array) =>
{
    total+=item
    if(indice === array.length - 1){
        return total / array.length; 
    }
    return total;
}, 0);

console.log(media)