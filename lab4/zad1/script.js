const names = [
  'Grzegorz',
  'Wiktoria',
  'Mateusz',
  'Ania',
  'Sandra',
  'Kasia',
  'Izabela',
  'Weronika',
];

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];

const countries = [
  { name: 'Nigeria', continent: 'Africa' },
  { name: 'Nepal', continent: 'Asia' },
  { name: 'Angola', continent: 'Africa' },
  { name: 'Poland', continent: 'Europe' },
  { name: 'Kenya', continent: 'Africa' },
  { name: 'Greece', continent: 'Europe' },
  { name: 'France', continent: 'Europe' },
  { name: 'China', continent: 'Asia' },
];

let people = [
  { id: 123, name: 'Rick Deckard', email: 'rick@bladerunner.org' },
  { id: 456, name: 'Roy Batty', email: 'roy@replicant.io' },
  { id: 789, name: 'J.F. Sebastian', email: 'j.f@tyler.com' },
  { id: 258, name: 'Pris', email: 'pris@replicant.io' },
];

let duplicateName = [
  'John',
  'Paul',
  'George',
  'Ringo',
  'Paul',
  'Paul',
  'Ringo',
];

const showResult = (result) => {
  const li = document.createElement('li');
  li.innerHTML = result;
  document.querySelector('#app').appendChild(li);
};

// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)
const namesWithR = names.filter((name) => name.includes('r'));
showResult(JSON.stringify(namesWithR));

// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
//    sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
//    inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste.
//    Nesteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2
const onlyLessThan9 = numbers.every((number) => number < 9);
showResult(onlyLessThan9);

const hasLessThan6 = numbers.some((number) => number < 6);
showResult(hasLessThan6);

numbers = numbers.map((number) => ++number);

const onlyOddNumbers = numbers.filter((number) => number % 2 !== 0);
const oddNumbersSum = onlyOddNumbers.reduce((sum, number) => sum + number, 0);
showResult(oddNumbersSum);

// 3. Na stronach internetowych wyświetlają się kraje z Europy
const europeCountries = countries
  .filter((entry) => entry.continent === 'Europe')
  .map((entry) => entry.name);
showResult(JSON.stringify(europeCountries));

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.
const replicantEmailsSurnames = people
  .filter((person) => person.email.endsWith('replicant.io'))
  .map((person) => {
    const trimmed = person.name.trim();

    if (trimmed.includes(' ')) {
      return trimmed.split(' ')[1];
    }

    return trimmed;
  });
showResult(JSON.stringify(replicantEmailsSurnames));

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu
const dedupedNames = [...new Set(duplicateName)];
showResult(JSON.stringify(dedupedNames));
