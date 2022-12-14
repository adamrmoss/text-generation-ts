import { Chance } from 'chance';

import { capitalize } from '../src/strings.js';
import { WordAnalyzer } from '../src/word-analyzer.js';
import { WordGenerator } from '../src/word-generator.js';

describe('WordGenerator', () =>
{
    const maxFailedAttempts = 10240;
    let chance: Chance.Chance;
    let analyzer: WordAnalyzer;
    let generator: WordGenerator;

    beforeEach(() =>
    {
        chance = new Chance(1519);
    });

    describe('generating states', () =>
    {
        beforeEach(() =>
        {
            const sampleStates =
            [
                'Alabama',       'Alaska',      'Arizona',
                'Arkansas',      'California',  'Carolina',
                'Colorado',      'Connecticut', 'Dakota',
                'Delaware',      'Florida',     'Georgia',
                'Hampshire',     'Hawaii',      'Idaho',
                'Illinois',      'Indiana',     'Iowa',
                'Jersey',        'Kansas',      'Kentucky',
                'Louisiana',     'Maine',       'Maryland',
                'Massachusetts', 'Mexico',      'Michigan',
                'Minnesota',     'Mississippi', 'Missouri',
                'Montana',       'Nebraska',    'Nevada',
                'Ohio',          'Oklahoma',    'Oregon',
                'Pennsylvania',  'Rhode',       'Tennessee',
                'Texas',         'Utah',        'Vermont',
                'Virginia',      'Washington',  'Wisconsin',
                'Wyoming',       'York'
            ];

            analyzer = new WordAnalyzer(2, 4);
            analyzer.analyzeWords(sampleStates);
            generator = new WordGenerator(analyzer, chance);
        });

        it('generates some good states', () =>
        {
            const generatedStates = generateNames(50);

            const expectedStates = [
                'Tennecticut',      'Hampshington',       'Connessee',
                'Ma',               'Wisconsington',      'Minnebraska',
                'Massippi',         'Nebraskansas',       'Pennsas',
                'Tennesota',        'Mexiconnecticut',    'Georegon',
                'Arkansylvania',    'Connessachusetts',   'Missippi',
                'Loraska',          'Wisconnecticut',     'Alaskansas',
                'Pennsington',      'Wiscon',             'Marylaware',
                'Mississiana',      'Mexicolouisissippi', 'Connebraska',
                'Pennesota',        'Arkan',              'Pennessee',
                'Ware',             'Mexiconnesota',      'Connesota',
                'Ut',               'Missississippi',     'Connsylvania',
                'Louissippi',       'Minnebras',          'Nebrado',
                'Marylawashington', 'Illinoisiana',       'Virgington',
                'Co',               'Mont',               'Da',
                'Missachusetts',    'Washigan',           'Lorado',
                'Louis',            'Massouri',           'Massissippi',
                'Delahoma',         'Vermontucky'
            ];

            expect(generatedStates).toEqual(expectedStates);
        });
    });

    describe('generating given names', () =>
    {
        beforeEach(() =>
        {
            const sampleNames =
            [
                'Aaron',   'Adam',     'Alan',    'Alex',
                'Andrew',  'Anthony',  'Austin',  'Brendan',
                'Brent',   'Bryan',    'Charlie', 'Chris',
                'Doug',    'Emory',    'Jace',    'James',
                'Jason',   'Jennifer', 'Jessica', 'Jim',
                'John',    'Kene',     'Kenny',   'Keshav',
                'Kevin',   'Kyle',     'Lynette', 'Mark',
                'Matthew', 'Michael',  'Mit',     'Prabu',
                'Randall', 'Ricardo',  'Richard', 'Robert',
                'Rodney',  'Roya',     'Ryan',    'Sharique',
                'Shawn',   'Skipp',    'Steve',   'Steven',
                'Tavares', 'Tej',      'Tim',     'Todd',
                'Tom',     'Trent',    'Will',    'Wright',
                'Yakov'
            ];

            analyzer = new WordAnalyzer(2, 4);
            analyzer.analyzeWords(sampleNames);
            generator = new WordGenerator(analyzer, chance);
        });

        it('generates some good names', () =>
        {
            const generatedNames = generateNames(50);

            const expectedNames =
            [
                'Micharlie',    'Charique',    'Austeve',
                'Ry',           'Matthony',    'Sharicardo',
                'Michard',      'Rique',       'Ryanthony',
                'Bren',         'Shav',        'Stevendan',
                'Shardoug',     'Chael',       'Do',
                'Ricares',      'Stin',        'Kesharique',
                'Chard',        'An',          'Kenette',
                'Shares',       'Richarlie',   'Randan',
                'Tavarique',    'Sharica',     'Sharlie',
                'Michris',      'Austeven',    'Rica',
                'Brendanthony', 'Ya',          'Brendall',
                'Ryandrew',     'Jessicardo',  'Richris',
                'Lyne',         'Alandrew',    'Anthew',
                'Sharichris',   'Shardo',      'Brendandrew',
                'Royakov',      'Bryandrew',   'Richael',
                'Alanthony',    'Emoryan',     'Ricarique',
                'Keshares',     'Emoryandrew'
            ];

            expect(generatedNames).toEqual(expectedNames);
        });
    });

    describe('generating continents', () =>
    {
        beforeEach(() =>
        {
            const sampleContinents =
            [
                'Acheron',   'Africa',    'America',
                'Arborea',   'Arcadia',   'Arctica',
                'Asgard',    'Asia',      'Atlantica',
                'Atlantis',  'Australia', 'Avalonia',
                'Baltica',   'Caledonia', 'California',
                'Celestia',  'China',     'Cimmeria',
                'Columbia',  'Ecotopia',  'Elysium',
                'Eriador',   'Europa',    'Freedonia',
                'Gondwana',  'Hyrule',    'India',
                'Islandia',  'Kalaharia', 'Kazakhstania',
                'Kenorland', 'Kerguelia', 'Kumaria',
                'Laurasia',  'Laurentia', 'Lemuria',
                'Limbo',     'Narnia',    'Northumbria',
                'Oceania',   'Pacifica',  'Pangaea',
                'Pannotia',  'Persia',    'Rodinia',
                'Siberia',   'Vaalbara',  'Zealandia'
            ];

            analyzer = new WordAnalyzer(2, 5);
            analyzer.analyzeWords(sampleContinents);
            generator = new WordGenerator(analyzer, chance);
        });

        it('generates some good continent', () =>
        {
            const generatedContinents = generateNames(50);

            const expectedContinents =
            [
                'Elia',           'Caledon',        'Na',
                'Atland',         'Celestra',       'Atlaurasia',
                'Kalaharborea',   'Atlandwana',     'Acheronia',
                'Kalaharcadia',   'Landia',         'Laura',
                'Kazakhstia',     'Kazakhstra',     'Ca',
                'Kumarborea',     'Is',             'Kazakhstantis',
                'Landwana',       'Eria',           'Atlaurasgard',
                'Africaledonia',  'Norland',        'Pacificalifornia',
                'Aria',           'Ameria',         'Atlandia',
                'Europannotopia', 'Pacimmeria',     'Kenorthumbria',
                'Lantica',        'Kenorlaurasia',  'Atlania',
                'Zealand',        'Siumbria',       'Vaalia',
                'Elysiumbria',    'Islaurentia',    'Rodindia',
                'Pa',             'Kenorlandwana',  'Europannotia',
                'Arbornia',       'Califorland',    'Kenorthumbia',
                'Ariador',        'Kenorlandiador', 'Lanticalimbo',
                'Columbria',      'Lifornia'
            ];

            expect(generatedContinents).toEqual(expectedContinents);
        });
    });

    function generateNames(n: number): string[]
    {
        const names: string[] = [];

        for (let i = 0; i < n; i++)
        {
            names.push(generateName());
        }

        return names;
    }

    function generateName(): string
    {
        return capitalize(generateUnique());
    }

    function generateUnique(): string
    {
        for (let i = 0; i < maxFailedAttempts; i++)
        {
            const previouslyGeneratedWords = [...generator.generatedWords];
            const generatedWord = generator.generateWord();

            if (!previouslyGeneratedWords.includes(generatedWord))
            {
                return generatedWord;
            }
        }

        throw new Error('Failed to Generate');
    }
});

