import { CustomReporter } from './jasmine';

import { errorChalk, okChalk, titleChalk } from '../../src/text-styles.js';

let totalSpecsDefined = 0;
let totalSpecsPassed = 0;
let totalSpecsFailed = 0;

const indentSize = 4;
let indentLevel =  0;

const indent = () => " ".repeat(indentSize * indentLevel);

const itemizedConsoleReporter: CustomReporter =
{
    jasmineStarted: function(suiteInfo)
    {
        ({ totalSpecsDefined } = suiteInfo);
        totalSpecsFailed = 0;
        indentLevel = 0;
        console.log(titleChalk(`Running suite with ${totalSpecsDefined} total specs\n`));
    },

    suiteStarted: function(result)
    {
        console.log(indent() + titleChalk(result.fullName));
        indentLevel++;
    },

    suiteDone: function() {
        indentLevel--;

        console.log();
    },

    specDone: function(result)
    {
        if (result.failedExpectations.length === 0)
        {
            console.log(indent() + okChalk(result.fullName));
            totalSpecsPassed++;
        }
        else
        {
            console.log(indent() + errorChalk(result.fullName));
            totalSpecsFailed++;
        }
    },

    jasmineDone: function(result)
    {
        console.log();
        console.log(okChalk(`${totalSpecsPassed} passed`));
        console.log(errorChalk(`${totalSpecsFailed} failed`));

        const timeElapsed = (result.totalTime / 1000).toFixed(3);
        console.log(`${timeElapsed} seconds elapsed`);
    }
};

export
{
    itemizedConsoleReporter,
};
