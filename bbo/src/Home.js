import React, { useEffect, useState } from 'react'
import "./Home.css";
import Product from './Product';
import Book1 from './book1.jpeg'
import { db } from './firebase';

function Home() {

    const [books, setBooks] = useState([]);

    const fetchBooks=async()=>{
        console.log('hello reading db');
        const bookRef = db.collection('books');
        const snapshot = await bookRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }  

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());

            setBooks(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })))
        });
        console.log(bookRef);
        console.log(snapshot.docs);
        console.log('this is the home result',books);
      }

    useEffect(() => {
    fetchBooks();
    }, [])
    
    return (
        <div className='home'>
            <br></br>
            <div className="home_row">
                
                {books.slice(1,4).map(item => (
                    <Product
                        id={item.id}
                        title={item.data.title}
                        image={item.data.cover}
                        price={item.data.price}
                        rating={item.data.rating}
                    />
                ))}
            
            </div>  
            <div className="home_row">
                {books.slice(12,14).map(item => (
                    <Product
                        id={item.id}
                        title={item.data.title}
                        image={item.data.cover}
                        price={item.data.price}
                        rating={item.data.rating}
                    />
                ))}
            </div>
            <div className="home_row">
                {books.slice(25,28).map(item => (
                    <Product
                        id={item.id}
                        title={item.data.title}
                        image={item.data.cover}
                        price={item.data.price}
                        rating={item.data.rating}
                    />
                ))}
            </div>         
        </div>
    )
}

export default Home
