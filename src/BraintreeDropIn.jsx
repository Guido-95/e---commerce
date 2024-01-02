import React, { useEffect, useState } from 'react';
import * as dropin from 'braintree-web-drop-in';
import { order } from './redux/reducers/api-reducers';
import {useSelector,useDispatch} from 'react-redux';
const PaymentComponent = ({ tokenizationKey,total }) => {
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const products = useSelector(state => state.products)
  const {userLogin,cart} = products;
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenizationKey) {
      dropin.create(
        {
          authorization: tokenizationKey,
          container: '#payment-container',
        },
        (createErr, instance) => {
          if (createErr) {
            // console.error(createErr);
            return;
          }

          setBraintreeInstance(instance);
        }
      );
    }
  }, [tokenizationKey]);

  const handlePayment = () => {
    // Simula una richiesta di pagamento con successo
    console.log('Simulazione di pagamento con successo.');
    // Puoi anche reimpostare lo stato di BraintreeInstance o fare altre azioni necessarie
    setBraintreeInstance(null);
  };

  return (
    <div>
        Card Number: 4111 1111 1111 1111
      <div id="payment-container"></div>
      {/* Pulsante di simulazione pagamento */}
      <button
        onClick={()=>{ dispatch(order([cart.filter(product=> product.userId === userLogin.id ),total])); handlePayment()}}
        className="braintreePayButton"
        type="button"
        disabled={!braintreeInstance}
      >
        Buy
      </button>
    </div>
  );
};

export default PaymentComponent;
