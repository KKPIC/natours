/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51NkKenDTWh17KomRxzlE78cotNATyucEMkjfN5zSaLhC9UOEWaCmEuoUvl4a9jAwIbIehQPRDqZOwRbzCKAekSZh00cNYaOdxl'
  );
  try {
    // 1 Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);
    // 2 Create checkout form + charge card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

// OLD
// export const bookTour = async (tourId) => {
//     try {
//       // 1 Get checkout session from API
//       const session = await axios(
//         `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
//       );
//       console.log(session);
//       // 2 Create checkout form + charge card
//       await stripe.redirectToCheckout({
//         sessionId: session.data.session.id,
//       });
//     } catch (err) {
//       console.log(err);
//       showAlert('error', err);
//     }
//   };
