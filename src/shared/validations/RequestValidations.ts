import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'is invalid',
    required: 'Required field',
  },
});

const validate = (schema, data) => {
  return schema
    .validate(data, { abortEarly: false })
    .then((_) => {
      return null;
    })
    .catch((err) => {
      return err.inner.map((item) => {
        return {
          path: item.path,
          message: item.message,
        };
      });
    });
};

export { yup, validate };
