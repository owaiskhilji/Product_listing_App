import React, { useEffect, useState } from 'react';
import "./Admintable.css"
import { database, getDocs, collection, doc, deleteDoc } from '../Firebase Config/config';
import { Link } from 'react-router-dom';

function AdminTable() {
    const [dataArray, setDataArray] = useState([]);

    let deleteData = async (id) => {
        try {
            await deleteDoc(doc(database, "data", id));
            // After successful deletion, fetch the updated data
            getData();
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "data"));
            const newDataArray = [];
            querySnapshot.forEach((doc) => {
                newDataArray.push(doc);
            });
            setDataArray(newDataArray);
        } catch (error) {
            console.error("Error getting data:", error);
        }
    }

    return (
        <>
        <div className="admin-buttons">
            <button className='add-product-btn'> <Link to='/admin'>Add Product</Link></button>
            <button className='logout-btn'>Logout</button>
        </div>
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {dataArray.map((currentElement, currentIndex) => {
                        return (
                            <tr key={currentIndex}>
                                <td>{currentIndex + 1}</td>
                                <td>{currentElement.data().itemName}</td>
                                <td>{currentElement.data().itemPrice}</td>
                                <td>{currentElement.data().itemDiscription}</td>
                                <td>
                                    <button className='delete-btn' onClick={() => deleteData(currentElement.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default AdminTable;
