import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../services/appApi";
import "./DashboardProducts.css";
import Pagination from "../Pagination/Pagination";

function DashboardProducts() {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    // removing the product
    const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
    function handleDeleteProduct(id) {
        // logic here
        if (window.confirm("Are you sure?")) deletProduct({ product_id: id, user_id: user._id });
    }

    function TableRow({ pictures, _id, name, price }) {
        return (
            <tr>
                <td>
                    <img src={pictures[0].url} className="dashboard-product-preview" alt="img_dashboard"/>
                </td>
                <td>{_id}</td>
                <td className="dashboard_product--name">{name}</td>
                <td>$ {price}</td>
                <td className="dashboard_product--btn">
                    <Button onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}
                        className="dashboard_product--btn_delete"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </Button>
                    <Link to={`/product/${_id}/edit`} className="btn dashboard_product--btn_edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                </td>
            </tr>
        );
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product ID</th>
                    <th className="dashboard_product--name">Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>
                <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />
            </tbody>
        </Table>
    );
}

export default DashboardProducts;