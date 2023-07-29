import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";

import {
  usePayOrderMutation,
  useGetPayClientIdQuery,
} from "../slices/ordersApiSlice";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);

  //PayPal config start
  const [payOrder, { isLoading: loadinPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      //Load PayPal script
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, errorPayPal, loadingPayPal]);
  //PayPal config end

  // async function onApproveTest() {
  //   const details = {
  //     payer: {},
  //   };
  //   await payOrder({ orderId, details });
  //   refetch();
  //   toast.success("Payment Successfull");
  // }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successfull");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    });
  }

  function onError(err) {
    toast.error(err?.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" />
      ) : (
        <>
          <h1>Order : {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name : </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email : </strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address : </strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode} -{" "}
                    {order.shippingAddress.country},
                  </p>
                  {order.isDelivered ? (
                    <Message>Delivered on {order.deliveredAt}</Message>
                  ) : (
                    <Message variant="danger">Not delivered </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method : </strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message>Payed on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not payed </Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} X ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items : </Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>

                    <Row>
                      <Col>Shipping : </Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>

                    <Row>
                      <Col>TAX : </Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>

                    <Row>
                      <Col>Total : </Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadinPay && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <div>
                          {/* <Button
                            onClick={onApproveTest}
                            style={{ marginBottom: "10px" }}
                          >
                            Test pay order
                          </Button> */}
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;