import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        'Ви не визначили свою локацію на карті. Продовжити?'
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push('/payment');
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push('/map');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Адреса Доставки</h1>
        </div>
        <div>
          <label htmlFor="fullName">Ім'я та Прізвище</label>
          <input
            type="text"
            id="fullName"
            placeholder="Введіть Ім'я та Прізвище"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Адреса</label>
          <input
            type="text"
            id="address"
            placeholder="Введіть адресу"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">Місто</label>
          <input
            type="text"
            id="city"
            placeholder="Введіть місто"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Код поштової скриньки</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Введіь код скриньки"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Країна</label>
          <input
            type="text"
            id="country"
            placeholder="Введіть країну"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Виберіть на карті
          </button>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Продовжити
          </button>
        </div>
      </form>
    </div>
  );
}