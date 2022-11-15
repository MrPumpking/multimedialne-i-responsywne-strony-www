console.group('Podpunkt A');
const tab = ['Jabłko', 'Pomarańcza', 'Banan', 'Gruszka', 'Kiwi'];
console.log({ tab, length: tab.length });
console.log(`Pierwsze słowo: ${tab[0]}. Długość: ${tab[0].length}`);
console.log(
  `Ostatnie słowo: ${tab[tab.length - 1]}. Długość: ${
    tab[tab.length - 1].length
  }`
);
console.groupEnd();

console.group('Podpunkt B');
console.group('for');
for (let i = 0; i < tab.length; i++) {
  console.log(`${tab[i].toLocaleUpperCase()}. Długość: ${tab[i].length}`);

  if (i === tab.length - 1) {
    console.log('PAW');
  }
}
console.groupEnd();

console.group('for...of');
for (const word of tab) {
  console.log(`${word.toLocaleUpperCase()}. Długość: ${word.length}`);

  if (tab.lastIndexOf(word) === tab.length - 1) {
    console.log('PAW');
  }
}
console.groupEnd();

console.group('forEach');
tab.forEach((word, i) => {
  console.log(`${word.toLocaleUpperCase()}. Długość: ${word.length}`);

  if (i === tab.length - 1) {
    console.log('PAW');
  }
});
console.groupEnd();

console.group('map');
const uppercased = [
  ...tab.map((word, i) => {
    const el = `${word.toLocaleUpperCase()}. Długość: ${word.length}`;
    console.log(el);

    if (i === tab.length - 1) {
      console.log('PAW');
    }

    return el;
  }),
  'PAW',
];
console.groupEnd();
console.groupEnd();

console.group('Podpunkt C');
tab.unshift('Początek');
tab.push('Koniec');
console.log(`Długość tablicy: ${tab.length}`);
console.table(tab);
console.groupEnd();

console.group('Podpunkt D');

if (tab.length === 3) {
  tab.splice(2, 1);
}

console.table(tab);
console.groupEnd();

console.group('Podpunkt E');

const users = [
  { name: 'Marek', age: 15 },
  { name: 'Adrian', age: 80 },
  { name: 'Kacper', age: 15 },
  { name: 'Karol', age: 17 },
  { name: 'Ania', age: 23 },
  { name: 'Asia', age: 90 },
];

console.group('filter');
const adults = users.filter((user) => user.age >= 18).map((user) => user.name);
console.log(adults);
console.groupEnd();

console.group('for');
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 18) {
    console.log(users[i].name);
  }
}
console.groupEnd();

console.group('for...of');
for (const user of users) {
  if (user.age >= 18) {
    console.log(user.name);
  }
}
console.groupEnd();

console.group('forEach');
users.forEach((user) => {
  if (user.age >= 18) {
    console.log(user.name);
  }
});
console.groupEnd();

console.group('reduce');
const adults2 = users.reduce((arr, user) => {
  if (user.age >= 18) {
    arr.push(user.name);
  }
  return arr;
}, []);
console.log(adults2);
console.groupEnd();

console.group('flatMap');
const adults3 = users.flatMap((user) => {
  if (user.age >= 18) {
    return user.name;
  }
  return [];
});
console.log(adults3);
console.groupEnd();

console.groupEnd();
