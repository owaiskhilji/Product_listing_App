import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database, getDoc, doc } from '../Firebase Config/config';
import  '../SaylaniTest/Detai.css';

function DetailPage() {
    const [itemData, setItemData] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const { id } = useParams();

    const getData = async () => {
        const docRef = doc(database, "data", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setItemData(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };

    return (
        <div className='main'>
            <h1 className='customer'>Detailed</h1>
            <table className='item-table'>
                <tbody>
                    <tr>
                        <td className='names'>Name:</td>
                        <td>{itemData.itemName}</td>
                    </tr>
                    <tr>
                        <td className='prices'>Price:</td>
                        <td>{itemData.itemPrice}</td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td>{itemData.itemDescription}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DetailPage;
