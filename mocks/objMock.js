const objMock = {
  uuid: '6f388586-3798-4638-a934-1e041f70ea0f',
  link: 'https://www.naranjax.com/promoX%20f',
  name: 'Santiago',
  price: 200,
  email: 'santiago.carrizo.hs@naranjax.com',
  active: true,
  online: false,
  arr: [
    '20 hs',
    'los dias martes',
    '$500',
    200,
    ['450', 200, '20hs'],
    {
      title: 'promocion',
      description: 'promo 50% de descuento.',
      value: 50,
    },
  ],
  legal: 'Valido de 20hs a 21 hs los dias Martes tope de reintegro $1000',
  address: {
    street: 'paso',
    number: 2525,
    cp: '700%',
  },
};

const objMockAccessible = {
  uuid: '6f388586-3798-4638-a934-1e041f70ea0f',
  link: 'https://www.naranjax.com/promoX%20f',
  name: 'Santiago',
  price: 200,
  email: 'santiago.carrizo.hs@naranjax.com',
  active: true,
  online: false,
  arr: [
    '20 hs',
    'los dias martes',
    '$500',
    200,
    ['450', 200, '20hs'],
    {
      title: 'promocion',
      description: 'promo 50% de descuento.',
      value: 50,
    },
  ],
  legal: 'Valido de 20hs a 21 hs los dias Martes tope de reintegro $1000',
  address: {
    street: 'paso',
    number: 2525,
    cp: '700%',
  },
  accessibility: {
    uuid: '6f388586-3798-4638-a934-1e041f70ea0f',
    link: 'https://www.naranjax.com/promoX%20f',
    name: 'Santiago',
    price: 200,
    email: 'santiago.carrizo.hs@naranjax.com',
    active: true,
    online: false,
    arr: [
      '20 horas',
      'los dias martes',
      'pesos 500',
      200,
      ['450', 200, '20 horas'],
      {
        title: 'promocion',
        description: 'promo 50 porciento de descuento.',
        value: 50,
      },
    ],
    legal:
      'Valido de 20 horas a 21 horas los dias Martes tope de reintegro pesos 1000',
    address: {
      street: 'paso',
      number: 2525,
      cp: '700 porciento',
    },
  },
};

module.exports = {
  objMock,
  objMockAccessible,
};
