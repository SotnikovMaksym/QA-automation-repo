import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { CustomWorld } from './support/world';

setDefaultTimeout(60 * 1000);
setWorldConstructor(CustomWorld);
