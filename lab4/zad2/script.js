const apiURL = (path) => {
  return `http://localhost:3000${path}`;
};

const showResult = (result) => {
  const li = document.createElement('li');
  li.innerHTML = result;
  document.querySelector('#app').appendChild(li);
};

const getJSON = (path) => {
  return fetch(apiURL(path)).then((response) => response.json());
};

const run = async () => {
  const cities = await getJSON('/cities');

  // A: wyświetli na stronie tylko miasta z województwa małopolskiego
  const lesserPolandCities = cities
    .filter((city) => city.province.toLowerCase() === 'małopolskie')
    .map((city) => city.name);
  showResult(JSON.stringify(lesserPolandCities));

  // B: wyświetli miasta które w swojej nazwie posiadają dwa znaki ‘a’
  const doubleAInName = cities
    .filter((city) => /^.*a.*a.*$/.test(city.name))
    .map((city) => city.name);
  showResult(doubleAInName);

  // C: wyświetli piąte pod kątem gęstości zaludnienia miasto w Polsce
  const sortedByDensityDesc = [...cities].sort(
    (a, b) => b.dentensity - a.dentensity
  );
  showResult(sortedByDensityDesc[4].name);

  // D: dla wszystkich miast powyżej 100000 dodać (na końcu) city do nazwy.
  const citiesAbove100kCitizens = cities
    .filter((city) => city.people > 100000)
    .map((city) => `${city.name} city`);
  showResult(JSON.stringify(citiesAbove100kCitizens));

  // E: wyliczyć czy więcej jest miast powyżej 80000 mieszkańców czy poniżej wraz z informacją o ich liczbie.
  const citiesAbove80kCitizens = cities.filter((city) => city.people > 80000);
  const citiesAbove80kCount = citiesAbove80kCitizens.length;
  const citiesBelow80kCount = cities.length - citiesAbove80kCount;
  const cities80kResult =
    citiesAbove80kCount > citiesBelow80kCount ? 'powyżej' : 'poniżej';
  showResult(
    `Więcej jest miast ${cities80kResult} 80000 mieszkańców <br> Powyżej 80000: ${citiesAbove80kCount} miast <br> Poniżej 80000: ${citiesBelow80kCount} miast `
  );

  // F: jaka jest średnia powierzchnia miast z powiatów zaczynających się na literkę „P”
  const citiesWithTownshipStartingWithP = cities.filter((city) =>
    city.township.toLowerCase().startsWith('p')
  );
  const areaSum = citiesWithTownshipStartingWithP.reduce(
    (sum, city) => sum + city.area,
    0
  );
  const areaAvg = areaSum / citiesWithTownshipStartingWithP.length;
  showResult(
    `Średnia powierzchnia miast z powiatów zaczynających się na literkę "P": ${areaAvg}`
  );

  // G: odpowiedz na pytanie czy wszystkie miasta z województwa pomorskiego są większe od 5000 osób i ile jest takich miast.
  const citiesFromPomorskie = cities.filter(
    (city) => city.province.toLowerCase() === 'pomorskie'
  );
  const areAllAbove5000Citizens = citiesFromPomorskie.every(
    (city) => city.people > 5000
  );
  const citiesAbove5000Citizens = citiesFromPomorskie.filter(
    (city) => city.people > 5000
  );
  showResult(
    `Liczba miast z pomorskiego powyżej 5000 mieszkańców: ${citiesAbove5000Citizens.length} <br> Czy wszystkie miasta z pomorskiego mają powyżej 5000 mieszkańców? ${areAllAbove5000Citizens}`
  );
};

run();
