import Jasmine from 'jasmine';
import { itemizedConsoleReporter } from 'jasmine-itemized-console-reporter';

var jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');

if (process.argv.includes('-itemized'))
{
    jasmine.clearReporters();
    jasmine.addReporter(itemizedConsoleReporter)
}

console.log('Running Jasmine');
jasmine.execute();
