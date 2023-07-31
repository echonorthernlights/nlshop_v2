import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

import { useGetProductsQuery } from "../../slices/productsApiSlice";

const ProductListScreen = () => {
  const deleteHandler = () => {};
  const { data: products, isLoading, refetch, error } = useGetProductsQuery();
  console.log(products);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
