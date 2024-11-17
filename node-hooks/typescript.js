import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Not used now
//register('nodejs-loaders/dev/alias', pathToFileURL('./'));
register('nodejs-loaders/dev/tsx', pathToFileURL('./'));
