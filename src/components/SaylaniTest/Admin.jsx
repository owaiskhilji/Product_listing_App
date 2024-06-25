import React, { useState } from 'react';
import "./Admin.css"
import { app, database, addDoc, collection, getStorage, ref, uploadBytesResumable, getDownloadURL } from '../Firebase Config/config';

function Admin() {
    let [itemName, setItemName] = useState('');
    let [itemDiscription, setItemDiscription] = useState('');
    let [itemPrice, setItemPrice] = useState('');
    let [picUpload, setPicUpload] = useState('');

    async function uploadImage(file) {
        const storage = getStorage(app);
        try {
            let storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + Math.round(progress) + "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // When upload is complete, get the download URL
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            console.log("File available at", downloadURL);
                            // Call addDataToFirestore when URL is available
                            addDataToFirestore(downloadURL);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function addDataToFirestore(imageUrl) {
        try {
            console.log("Adding data to Firestore with imageUrl:", imageUrl);
            const docRef = await addDoc(collection(database, "data/"), {
                itemName: itemName,
                itemPrice: itemPrice,
                itemDiscription: itemDiscription,
                imageUrl: imageUrl
            });

            console.log("Document written with ID: ", docRef.id);
            console.log('Data stored Successfully');
        } catch (e) {
            console.log("Error adding document: ", e.message);
        }
        // Reset form fields after data is stored
        setItemName('');
        setItemPrice('');
        setItemDiscription('');
        setPicUpload('');
    }

    async function handleUploadAndAdd() {
        if (picUpload) {
            await uploadImage(picUpload);
        }
    }

    return (
        <>
            <div className='formmain'>
        <h1  className='head'>Admin</h1>
                <div className="name">
                    <label className="label1">Name</label>
                    <input type="text" className="input1" placeholder="write name here"
                        value={itemName}
                        onChange={(e) => {
                            setItemName(e.target.value);
                        }} />
                </div>

                <div className="price">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" placeholder="write price here"
                        value={itemPrice}
                        onChange={(e) => {
                            setItemPrice(e.target.value);
                        }} />
                </div>

                <div className="dis">
                    <label className="form-label">Discription</label>
                    <textarea className="form-control" rows="3"
                        value={itemDiscription}
                        onChange={(e) => {
                            setItemDiscription(e.target.value);
                        }}></textarea>
                </div>

                <div className="image">
                    <label className="form-label">Upload Image</label>
                    <input type="file" className="form-control" style={{ cursor: 'pointer' }}
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setPicUpload(e.target.files[0]);
                            }
                        }} />
                </div>
                <div className='btn'>
                    <button className='btn btn-lg btn-primary' onClick={() => handleUploadAndAdd()}>Add </button>
                </div>

            </div>
        </>
    );
}

export default Admin;