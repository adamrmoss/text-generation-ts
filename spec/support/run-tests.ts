import Jasmine from 'jasmine';
import { itemizedConsoleReporter } from 'jasmine-itemized-console-reporter';

console.log(process.argv);

var jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');

const random = process.argv.includes('-randomized');
jasmine.loadConfig({ random });

if (process.argv.includes('-itemized'))
{
    jasmine.clearReporters();
    jasmine.addReporter(itemizedConsoleReporter)
}

console.log('Running Jasmine');
jasmine.execute();
