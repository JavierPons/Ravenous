
import './App.css';
import BusinessList from './components/businessList/businessList';
import SearchBar from './components/searchBar/searchBar';
import React, { Component } from 'react';
import Yelp from './util/Yelp';
import './App.css';


class App extends React.Component {
    constructor(state){
        super(state);
    this.state = {
        businesses : []
    };
    this.searchYelp.bind(this);
    }
    searchYelp(term,location,sortBy){
        Yelp.search(term, location, sortBy).then(businesses =>{
            setState:(
                businesses: businesses )
        });
    }  
  render() {
    return (
      <div className="App">
  <h1>ravenous</h1>
<SearchBar searchYelp={this.searchYelp} />
 
 <BusinessList businesses={businesses}/> 
</div>
    );
  }
}

export default App;


