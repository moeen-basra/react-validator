import ReeValidate from './plugin';
import directive from './directive';
import mixin from './mixin';
import en from '../locale/en';
import * as Rules from './rules';
import mapFields from './core/mapFields';
import Validator from './core/validator';
import ErrorBag from './core/errorBag';
import { assign } from './utils';
import { ValidationProvider } from './components';

const version = '__VERSION__';

const rulesPlugin = ({ Validator }) => {
  Object.keys(Rules).forEach(rule => {
    Validator.extend(rule, Rules[rule].validate, assign({}, Rules[rule].options, { paramNames: Rules[rule].paramNames }));
  });

  // Merge the english messages.
  Validator.localize('en', en);
};

const install = ReeValidate.install;
ReeValidate.use(rulesPlugin);

export {
  install,
  directive,
  mixin,
  mapFields,
  Validator,
  ErrorBag,
  Rules,
  version,
  ValidationProvider
};

export default ReeValidate;
