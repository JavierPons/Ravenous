const clientId = '8-z8uUsHDsadhqXfugMtTw';
const secret = 'EI5T2qGAkzuKRkYOFXMIBdI9unGZgfNs7SIiCTdhD5PeFRzjrtxeqVCczkjac286L8W1uFGuGS13pmOmoWBrofJp_wr_B5bEg_45nVt5EvDySrqu5GRdOMnEJ9S8WnYx';
let accessToken;


const Yelp = {
  getAccessToken: function() {
    
  
    if (accessToken) {
      return new Promise(resolve => 
        resolve(accessToken));
    }
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
       method: 'POST'
 
   }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
       return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
        headers: { Authorization: `Bearer ${secret}` 
      }
     
      
      }).then(response => {
      return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
           
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zipcode,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            }));
      }
    });
    });
  }
}


export default Yelp;