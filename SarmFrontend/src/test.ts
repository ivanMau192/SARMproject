// This file is required by karma.conf.js and loads recursively all the .spec and framework files


/**
 * Test Component
 *
 * @export
 */

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';


/**
 * @example
 * This is a good example
 * processTarget('yo')
 *
 * @returns The processed target number
 */

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

/**
 * @example
 * This is a good example
 * processTarget('yo')
 *
 * @returns The processed target number
 */
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);


// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
