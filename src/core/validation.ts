const messages = {
  alpha: {
    priority: 0,
    message: '',
  },
  alphaNum: {
    priority: 0,
    message: '',
  },
  numeric: {
    priority: 0,
    message: 'This should be a numeric value',
  },
  between: {
    priority: 0,
    message: '',
  },
  email: {
    priority: 0,
    message: 'This field should be a valid email address',
  },
  ipAddress: {
    priority: 0,
    message: '',
  },
  macAddress: {
    priority: 0,
    message: '',
  },
  maxLength: {
    priority: 0,
    message: 'This field has a maximum length',
  },
  minLength: {
    priority: 0,
    message: 'This field has a minimum length',
  },
  required: {
    priority: 0,
    message: 'This field is required',
  },
  requiredIf: {
    priority: 0,
    message: '',
  },
  requiredUnless: {
    priority: 0,
    message: '',
  },
  sameAs: {
    priority: 0,
    message: '',
  },
  url: {
    priority: 0,
    message: '',
  },
  or: {
    priority: 0,
    message: '',
  },
  and: {
    priority: 0,
    message: '',
  },
  minValue: {
    priority: 0,
    message: '',
  },
  maxValue: {
    priority: 0,
    message: '',
  },
  zipcode: {
    message: 'This should be a valid zipcode',
  },
};

const zipcode = (val: string): boolean =>
  /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(val);

interface Param {
  name: string;
  value: string;
}

const getMessage = (validation: any) => {
  const errors = validation.$errors || [];
  return errors
    .map((error: any) => `${error.$message}`)
    .join(', ')
    .replace(/Value/g, 'This');
};

export { zipcode, getMessage };
