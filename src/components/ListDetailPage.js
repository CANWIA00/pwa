import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {Button, ListGroup} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function ListDetailPage() {
    const { id } = useParams();  // Get the shopping list ID from the URL
    const [shoppingList, setShoppingList] = useState([]);  // State for storing shopping list data
    const [selectedItems, setSelectedItems] = useState([]); // State to track selected items

    // Fetch shopping list details from the server
    const fetchShoppingListDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/shoppingList/${id}`);
            if (response.status === 200) {
                const data = await response.json();
                setShoppingList(data);
                console.log(data, "fetched data");
            } else {
                console.error("Failed to fetch shopping lists:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching shopping lists:", error);
        }
    };

    // Fetch the shopping list data when the component mounts or when `id` changes
    useEffect(() => {
        fetchShoppingListDetails();
    }, [id]);

    // Toggle the selection state of an item
    const handleItemClick = (itemId) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                // Deselect the item if it's already selected
                return prevSelectedItems.filter(id => id !== itemId);
            } else {
                // Select the item if it's not selected
                return [...prevSelectedItems, itemId];
            }
        });
    };

    return (

        <div className="container mx-auto min-h-screen flex flex-col ">
            <Header/>
            <main className="flex-grow p-4 mt-5">
                <h1>Shopping Title : {shoppingList.title}</h1>
                <h6>Date: {new Date(shoppingList.createdAt).toLocaleDateString()}</h6>

                {/* Check if the shopping list has items */}
                {shoppingList.items && shoppingList.items.length > 0 ? (
                    <ListGroup>
                        {/* Table headers */}
                        <tr className="d-flex bg-primary text-white rounded">
                            <th>#</th>
                            <th>Product Name</th>
                            <th>and</th>
                            <th>Quantity</th>
                        </tr>

                        {/* Loop through items and render each one */}
                        {shoppingList.items.map((item, index) => (
                            <ListGroup.Item
                                className={` text-primary list-group-item list-group-item-action shadow-sm ${selectedItems.includes(item.id) ? 'list-group-item-primary' : ''}`}
                                key={item.id}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                }}
                                onClick={() => handleItemClick(item.id)}  // Handle item click
                            >
                                <h4>{index + 1}-</h4>
                                <h6 className="ms-1">{item.name}</h6>
                                <h6 className="ms-3">{item.quantity}</h6>
                                <h6 className="ms-1">{item.type}</h6>
                                {selectedItems.includes(item.id) && (
                                    <span className="ms-3 badge text-bg-success rounded-pill">done</span>
                                )}

                                <FaShoppingCart className="fs-1 ms-auto "/>
                                {/* Conditionally render the icon with transition effect */}
                                {selectedItems.includes(item.id) && (
                                    <FaCheck className="fs-1 ms-3 text-success "/>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                ) : (
                    <p>No items available.</p>
                )}
            </main>
            <div className=" fixed-bottom d-flex justify-content-center">
                <Link to={"/"} className={"w-50"}>
                    <Button className={"w-50"} style={{marginBottom: "100px"}}><h4>Finish the Shopping List</h4>
                    </Button>
                </Link>
            </div>
            <Footer/>
        </div>
    );
}

export default ListDetailPage;
