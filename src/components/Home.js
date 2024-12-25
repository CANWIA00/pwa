import {Button, ListGroup} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


export default function Home() {

    const [shoppingLists, setShoppingLists] = useState([{
        id: "",
        title: "",
    }]);

    const fetchShoppingList = async () => {
        try {
            const response = await fetch("http://localhost:8080/shoppingList/all");
            if(response.status === 200) {
                const data = await response.json();
                setShoppingLists(data);

            }else{
                console.error("Failed to fetch shopping lists:", response.statusText);
            }
        }catch (error) {
            console.error("Error fetching shopping lists:", error);
        }
    }

    const handleRemove = async (id) => {
        console.log(id);
        try {
            // Make the DELETE request to the API with the given item ID
            const response = await fetch(`http://localhost:8080/shoppingList/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {


                console.log(`Item with ID ${id} removed successfully`);
            } else {
                console.error(`Failed to remove item with ID ${id}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error removing item with ID ${id}:`, error);
        }
    };



    useEffect(() => {
        fetchShoppingList();
    },[]);


    return (
        <div id={"ListDetailsPage"} className="container mx-auto min-h-screen flex flex-col"  >
            <Header />

            <main className="flex-grow p-4 mt-5 " >
                {shoppingLists.length > 0 ? (
                    <ListGroup >
                        {shoppingLists.map(list => (

                                <ListGroup.Item key={list.id}
                                                className="bg-light d-flex align-items-center justify-content-between mb-3 shadow-sm rounded border">
                                    <Link to={`/shoppingList/${list.id}`} className="text-decoration-none text-start">
                                        <h3>{list.title}</h3>

                                    </Link>
                                    <Button className="float-end " variant="danger" onClick={() => handleRemove(list.id)}><h5>Delete</h5></Button>
                                </ListGroup.Item>

                        ))}
                    </ListGroup>
                ):(
                    <p>Loading...</p>
                )}


            </main>
            <div className=" fixed-bottom d-flex justify-content-center">
                <Link to="/listCreate" className={"w-50"}>
                    <Button className={"w-50"} style={{marginBottom:"100px"}} ><h4>Create New Shopping List</h4></Button>
                </Link>
            </div>
            <Footer />
        </div>
    );
}


