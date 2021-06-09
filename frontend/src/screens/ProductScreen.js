import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        createReview(productId, { comment, name: userInfo.name })
      );
    } else {
      alert('Введіть коментар');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Назад до перегляду</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                </li>
                <li>Ціна : грн{product.price}</li>
                <li>
                  Опис:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Бренд{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Ціна</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Статус</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">Є у наявності</span>
                        ) : (
                          <span className="danger">Немає у наявності</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Додати у кошик
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <ul>
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Напишіть відгук про покупку</h2>
                    </div>
                    <div>
                      <label htmlFor="comment">Коментар</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Підтвердити
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    <Link to="/signin">Увійдіть</Link>, щоб написати коментар
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}