import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Паролі не співпадають');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Створити аккаунт</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            id="name"
            placeholder="Введіт ім'я"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Ел. адреса</label>
          <input
            type="email"
            id="email"
            placeholder="Введіть e-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="Введіть пароль"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Підтвердити пароль</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Введіть пароль ще раз"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Зареєструватись
          </button>
        </div>
        <div>
          <label />
          <div>
            Уже маєте акаунт?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Увійти</Link>
          </div>
        </div>
      </form>
    </div>
  );
}