interface Result
{
    type: string;
}

interface ExpectationResult extends Result
{
    matcherName: string;
    message: string;
    stack: string;
    passed: boolean;
    expected: any;
    actual: any;
}

interface DeprecationWarning extends Result
{
    message: string;
    stack: string;
}

interface Order
{
    new (options: { random: boolean; seed: number | string }): any;
    random: boolean;
    seed: number | string;
    sort<T>(items: T[]): T[];
}

interface JasmineStartedInfo
{
    totalSpecsDefined: number;
    order: Order;
}

interface CustomReportExpectation
{
    matcherName: string;
    message: string;
    passed: boolean;
    stack: string;
}

interface FailedExpectation extends CustomReportExpectation
{
    actual: string;
    expected: string;
}

interface PassedExpectation extends CustomReportExpectation {}

interface DeprecatedExpectation
{
    message: string;
}

interface SuiteResult
{
    id: string;
    description: string;
    fullName: string;
    failedExpectations: FailedExpectation[];
    deprecationWarnings: DeprecatedExpectation[];
    status: string;
    duration: number | null;
    properties: { [key: string]: unknown } | null;
}

interface SpecResult extends SuiteResult
{
    passedExpectations: PassedExpectation[];
    pendingReason: string;
    debugLogs: DebugLogEntry[] | null;
}

interface DebugLogEntry
{
    message: String;
    timestamp: number;
}

interface JasmineDoneInfo
{
    overallStatus: string;
    totalTime: number;
    incompleteReason: string;
    order: Order;
    failedExpectations: ExpectationResult[];
    deprecationWarnings: ExpectationResult[];
}

interface CustomReporter
{
    jasmineStarted?(suiteInfo: JasmineStartedInfo, done?: () => void): void | Promise<void>;
    suiteStarted?(result: SuiteResult, done?: () => void): void | Promise<void>;
    specStarted?(result: SpecResult, done?: () => void): void | Promise<void>;
    specDone?(result: SpecResult, done?: () => void): void | Promise<void>;
    suiteDone?(result: SuiteResult, done?: () => void): void | Promise<void>;
    jasmineDone?(runDetails: JasmineDoneInfo, done?: () => void): void | Promise<void>;
}

export type
{
    CustomReportExpectation,
    CustomReporter,
    DebugLogEntry,
    DeprecatedExpectation,
    DeprecationWarning,
    ExpectationResult,
    FailedExpectation,
    JasmineDoneInfo,
    JasmineStartedInfo,
    Order,
    PassedExpectation,
    Result,
    SpecResult,
    SuiteResult,
};

