import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
const initialState = {
  value: 0,
  product:[],
  productDetail:{},
  userData:[],
  userLogin:{},
  cart:[],
  orders:[],
  popupCart:{},
  formError:false,
  loader: false,
  buyComplete:false,
  feedbackPayment:false,
}

export const counterSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    saveData :(state,action)=>{
      state.product = action.payload;
    },
    setErrorFalse:(state) =>{
      state.formError = false;
    },
    setLoader:(state,action) =>{
      if(action.payload ==='true'){
        state.loader = true;
      }else{
        state.loader = false;
      }
    },
    setPopupCart:(state,action)=>{
     
      state.popupCart = state.productDetail;   

    },
    
      // else if(state.userData.length === 0){
      //   if(state.userData.length === 0){
      //     state.userData.push({...action.payload, id:1})
      //   // altrimenti controlla qual è l'id più alto e assegnalo all'utente nuovo con id + 1
      //   }else{
      //     let idHigh = 0;
      //     state.userData.forEach(user => {
      //       if(user.id > idHigh){
      //         idHigh = user.id;
      //       }
      //     });
      //     state.userData.push({...action.payload, id:idHigh})
      //   }
      //   // assegnalo all'utente loggato
      //   state.userLogin = action.payload; 
      //   // aggiungi il campo isLogin all'utente
      //   action.payload['isLogin'] = true;
      //   // aggiungilo all'array di utenti
      //   state.userData.push(action.payload);
      // }
  

    setBuyCompleteToFalse:(state,action)=>{
      if(action.payload === 'buyComplete'){
        state.buyComplete = false;
        state.feedbackPayment = true;
      }
      if(action.payload === 'removeFeedBack'){
        state.buyComplete = false;
        state.feedbackPayment = false;
      }
      
    },
    order:(state,action) =>{
      // se ci sono ordini controlla l'id e creane uno con l'id successivo
      if(state.orders.length > 0){
        
        let idHigh = 0;
        state.orders.forEach(order=> {
          if(order.id > idHigh){
            idHigh = order.id;
          }
        })
        let order = {
          id: idHigh + 1,
          userId: state.userLogin.id,
          total:action.payload[1],
          prodotti: []
        };
        action.payload[0].forEach(product => {
          order.prodotti.push(product)
        });
        state.orders.push(order);
        state.popupCart = {};
        localStorage.setItem('orders', JSON.stringify(state.orders));
        let cartWithoutProductBuy = state.cart.filter(product => product.userId != state.userLogin.id)
        state.cart = cartWithoutProductBuy;
        localStorage.setItem('cart', JSON.stringify(state.cart));
        state.buyComplete = true;
      
      }else{
        let order = {
          id: 1,
          userId: state.userLogin.id,
          total:action.payload[1],
          prodotti: []
        };
        action.payload[0].forEach(product => {
          order.prodotti.push(product)
        });
        state.orders.push(order);
        state.popupCart = {};
        localStorage.setItem('orders', JSON.stringify(state.orders));
        let cartWithoutProductBuy = state.cart.filter(product => product.userId != state.userLogin.id)
        state.cart = cartWithoutProductBuy;
        localStorage.setItem('cart', JSON.stringify(state.cart));
        state.buyComplete = true;
       
        // Ora ordini è un oggetto contenente gli ordini
        // const arrayOrdini = Object.values(ordini);

      }
     
    },
    saveDataUser :(state,action)=>{
      // se l'utente inserisce un email già presente avvertilo che deve inserirne un'altra
      if(state.userData.some(account => account.email === action.payload.email)){
        state.formError = true;
        // altrimenti si può registrare
      }else{
        if(state.userData.length === 0){
          action.payload['isLogin'] = true;
          state.userData.push({...action.payload, id:1})
          state.userLogin = {...action.payload,id:1};
          localStorage.setItem('registrationData', JSON.stringify(state.userData));
          localStorage.setItem('userLogin', JSON.stringify({...action.payload,id:1}));
          state.formError = false;
        }else{
          let idHigh = 0;
          state.userData.forEach(user => {
            if(user.id > idHigh){
              idHigh = user.id;
            }
            state.formError = false;
          });
          state.userLogin = {...action.payload,id:idHigh + 1};
          localStorage.setItem('userLogin', JSON.stringify({...action.payload,id:idHigh + 1}));
          action.payload['isLogin'] = true;
          state.userData.push({...action.payload, id:idHigh + 1})
          localStorage.setItem('registrationData', JSON.stringify(state.userData));
        }
      }
    },
    login:(state,action) =>{
      // Recupera i dati dal localStorage utilizzando la chiave specifica
      const storedData = localStorage.getItem('registrationData');
      // Parsifica i dati JSON se esistono
      const parsedData = storedData ? JSON.parse(storedData) : null;
      if(!parsedData){
        state.formError = true;
      }else{
        const index = parsedData.findIndex((user) => user.email === action.payload.email);
        // action.payload.email === parsedData[index].email
        if(index !== -1 && action.payload.password === parsedData[index].password){
          state.userData[index]["isLogin"] = true;
          state.userLogin = state.userData[index];
          localStorage.setItem('userLogin', JSON.stringify(state.userLogin));
          localStorage.setItem('registrationData', JSON.stringify(state.userData));
          // localStorage.setItem('userLogin', JSON.stringify(state.userLogin));
        } else{
          state.formError = true;
        }
      }
    
    },
    verifyLogin:(state)=>{
      const storedDataUser = localStorage.getItem('registrationData');
      const parsedDataUser = storedDataUser ? JSON.parse(storedDataUser) : null;
      const cart = localStorage.getItem('cart');
      const parsedCart = cart ? JSON.parse(cart) : null;
      const storedOrders = localStorage.getItem('orders');
      const parsedOrders = storedOrders ? JSON.parse(storedOrders) : null;
      if(storedDataUser) {
        state.userData = parsedDataUser;
        let userIsLogin = state.userData.find(el => el.isLogin === true) || {};
        state.userLogin = userIsLogin;
        localStorage.setItem('userLogin', JSON.stringify(userIsLogin));
      }
      if(cart) {
        state.cart = parsedCart;
      }
      if(parsedOrders) {
        state.orders = parsedOrders;
      }
    },
    quit:(state) =>{
      state.userLogin = {};
      localStorage.setItem('userLogin', JSON.stringify({}));
      state.userData.forEach(user => {
        if (user.hasOwnProperty('isLogin')) {
          user.isLogin = false;
        }
      });
      localStorage.setItem('registrationData', JSON.stringify(state.userData));
    },
    deleteAccount:(state,action) =>{
      let indexUserAccountDelete = state.userData.findIndex(account => account.id === action.payload);
      state.userData.splice(indexUserAccountDelete, 1);
      state.userLogin = {};
      localStorage.setItem('registrationData', JSON.stringify(state.userData));
      localStorage.setItem('userLogin', JSON.stringify({}));
    },
    addCart: (state, action) => {
      const { id } = action.payload;
      // Verifica se il prodotto è già presente nel carrello
      const existingProduct = state.cart.find(product => product.id === id);
      if (existingProduct) {
        // Se il prodotto è già presente, aggiorna la quantità
        existingProduct.quantity += 1;
        existingProduct.userId = state.userLogin.id;
        // console.log(existingProduct)
      } else {
        // Se il prodotto non è presente, aggiungilo al carrello
        state.cart.push({ ...action.payload, quantity: 1, userId : state.userLogin.id });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCart:(state,action)=>{
      if(action.payload.action === 'remove'){
        state.cart.map(el=>{
          if(el.id === action.payload.id){
            if(el.quantity - 1 > 0){
              return {...el, quantity: el.quantity -= 1}
            }
          }
        })
      }
      if(action.payload.action === 'add'){
        state.cart.map(el=>{
          if(el.id === action.payload.id){
            if(el.quantity + 1 < 51){
              return {...el, quantity: el.quantity += 1}
            }
          }
        })
      }
      if(action.payload.action ==='delete'){
        let id = action.payload.id;
        const index = state.cart.findIndex(item => item.id === id);
        state.cart.splice(index, 1);
        if(id === state.popupCart.id){
          state.popupCart = {}
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  
    saveSingleProduct :(state,action)=>{
      state.productDetail = action.payload;
  },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,saveData,saveSingleProduct,saveDataUser,quit ,login,verifyLogin,addCart,updateCart,verifyUsersLogin,order,setErrorFalse,setLoader,setPopupCart,setBuyCompleteToFalse,deleteAccount} = counterSlice.actions

export const fetchData = ()=> async (dispatch)=>{
    dispatch(setLoader('true'))
    try {
      const productsResp = await axios.get('https://fakestoreapi.com/products');
      dispatch(saveData(productsResp.data));
    } catch (error) {
      // Gestisci gli errori come preferisci
      console.error('Errore nel recupero dei dati:', error);
      throw error;
    } finally {
      // Qui puoi inviare un'azione sincrona per indicare che il caricamento è completo
      dispatch(setLoader('false'))
    }
}
export const fetchSingleProduct = (id)=> async (dispatch)=>{
  dispatch(setLoader('true'))
  try {
    const productsResp = await axios.get(`https://fakestoreapi.com/products/${id}`);
    // console.log(productsResp)
    dispatch(saveSingleProduct(productsResp.data));
  } catch (error) {
    // Gestisci gli errori come preferisci
    console.error('Errore nel recupero dei dati:', error);
    throw error;
  } finally {
    // Qui puoi inviare un'azione sincrona per indicare che il caricamento è completo
    dispatch(setLoader('false'))
  }
 
  
}

export default counterSlice.reducer

