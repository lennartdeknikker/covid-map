import 'babel-polyfill';
import { AddDataVisualisation } from './datavis/index';
import * as settings from './datavis/settings.json';

// adds the datavisualisation to the html using the settings defined in settings.json.
AddDataVisualisation(settings);
