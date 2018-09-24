import React, { Component } from "react";

import PlayBack from "./../components/PlayBack";
import"./Search.css";
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            artist: null, //IMPORTANT
            tracks: []
        }
    }


    // MAIN SEARCH FUNCTION
    search() {
        //-----------API SETUP-----------
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = BASE_URL + "q=" + this.state.query + "&type=track&market=US&limit=50&offset=0";


        /*
          accessToken expires every one hour.
          In order to get accessToken start "web-api-auth-examples"
        */
        let accessToken = "BQCxox-FnSUrdO5CR8vHQ3ubwdDeR6Cu01H4FEtIr9bkGz-cxGoPQhnJ5856RrGZV7HHwq7fIPF0EMgZw1cHCSWBa9Zs1nHTRwph5-TArdAMGN-h7JtmV0rsU2hdf0tkRdZlzgSyPKw81aDQH7sHOQ5OXHMHDg2kyrwCIOgmUNqxB_c_xwi8o47f2w&refresh_token=AQB_3NEf6etv85DpSO0pIvgU4FUdx_DPDJ5sd-1j7RhBSJkUF3LPJk_ypUV-QgAhRGDdkmoSKjteyIXI-N00qzbkynFlqojjhI954MNzvAfA2uRHUNcoJdv3ke_fU-uroP8Baw";

        let myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        // FETCH!!!!
        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {

                console.log(json);
                this.setState({
                  tracks: json.tracks.items
                });
            });

    }
    render() {
        return <div className="search">
            <p> Music Spotify Player Search</p>

            <div className="InputGroup">
              <input type="text" placeholder="Search for an track" value={this.state.query} onChange={event => {
                  this.setState({ query: event.target.value });
                }} onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.search();
                  }
                }} />
              <button onClick={() => this.search()}>
                <img src={require("./../img/search.png")} alt="" style={{ width: 25 }} />
              </button>
            </div>

            {this.state.tracks !== null ? <div>


                <PlayBack tracks={this.state.tracks} />
              </div> : <p />}
          </div>;


    }
}
export default Search;