import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { db } from './firebase';
import SearchProduct from './SearchProduct';
import './Search.css'
import { useStateValue } from './StateProvider';

function Search() {

    // let location = useLocation();
  
    // console.log(location.state)
    // const skey = `${location.state}`
    // //const sskey = skey.toString();
    // console.log('the search word is ',skey);
    // //console.log('the search word is ',`${sskey}`);

    const [{sword},dispatch] = useStateValue()
    const [search, setSearch] = useState([])

    const fetchSearch=async()=>{
        const sskey = `${sword}`
        console.log('hello reading db');
        const searchRef = db.collection('books');
        const snapshot = await searchRef.where('genre', '==', sskey).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }  

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());

        setSearch(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        })))
        });
        console.log(searchRef);
        console.log(snapshot.docs);
        console.log('this is the search result',search);
      }

    useEffect(() => {
    fetchSearch();
    }, [])

    return (
        <div className='search'>
            <div className="div_search_title">
                </div><h3 className="search_title">Search by keyword :  {sword}</h3>
            <div className="search_result">
                {search.map(item => (
                    <SearchProduct
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

export default Search
