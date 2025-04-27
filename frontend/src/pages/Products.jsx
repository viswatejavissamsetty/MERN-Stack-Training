import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = sessionStorage.getItem("userId");
  return config;
});

export function Products() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        setErrorMessage("Unable to fetch products");
      });
  }, []);

  function fetchAllOrders() {
    axios
      .get("http://localhost:3000/orders")
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        setErrorMessage("Unable to fetch orders");
      });
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  function onOrder(productId) {
    axios
      .post("http://localhost:3000/orders", {
        productId: productId,
        quantity: 1,
        address: "Pune",
      })
      .then((res) => {
        console.log(res);
        fetchAllOrders();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteOrder(orderId) {
    axios
      .delete("http://localhost:3000/orders/" + orderId)
      .then((res) => {
        console.log(res);
        fetchAllOrders();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <NavLink to="/create-product">Create product page</NavLink>

      <h1>Products List</h1>

      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}

      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Is Aailable</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.isAvailable ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => onOrder(product._id)}>Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.productId.name}</td>
              <td>{order.productId.description}</td>
              <td>{order.productId.price}</td>
              <td>{order.quantity}</td>
              <td>{order.address}</td>
              <td>
                <button type="button" onClick={() => deleteOrder(order._id)}>
                  Delete Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
