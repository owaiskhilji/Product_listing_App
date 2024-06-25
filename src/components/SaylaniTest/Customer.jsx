import React, { useState, useEffect } from 'react';
import { database, getDocs, collection } from '../Firebase Config/config';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./customer.css";

function Customer() {
    const [dataArray, setDataArray] = useState([]);

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
            <h1 className='customer'>Customer</h1>
            <div className='customers'>
                {dataArray.map((currentElement, currentIndex) => (
                    <Card key={currentElement.id} className='card'>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`${currentElement.data().imageUrl}`}
                            alt="Product Image"
                            className='card-media'
                        />
                        <CardContent className='card-content'>
                            <Typography variant="h5" component="div" className='card-title'>
                                {currentElement.data().itemName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className='card-price'>
                                Price: {currentElement.data().itemPrice}
                            </Typography>
                        </CardContent>
                        <CardActions className='card-actions'>
                            <Button size="small"></Button>
                            <Button size="small"><Link to={`/detailPage/${currentElement.id}`}>View Detail</Link></Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default Customer;
