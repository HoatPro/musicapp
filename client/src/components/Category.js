import React, { Component } from "react";
import Headers from './Header';
import Navigator from "./Navigation";
import { BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from "react-router";
import PropTypes from "prop-types";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: [],
      albums: [],
      categories: []
    }; //IMPORTANT
  }
  async componentDidMount() {
    await this.showCategory();
  }
  showCategory() {
    //-----------API SETUP-----------
    const BASE_URL = "https://api.spotify.com/v1/browse/categories?";
    let FETCH_URL = BASE_URL + "q=" + this.state.query + "limit=50";

    /*
      accessToken expires every one hour.
      In order to get accessToken start "web-api-auth-examples"
    */
    let accessToken = "BQCxox-FnSUrdO5CR8vHQ3ubwdDeR6Cu01H4FEtIr9bkGz-cxGoPQhnJ5856RrGZV7HHwq7fIPF0EMgZw1cHCSWBa9Zs1nHTRwph5-TArdAMGN-h7JtmV0rsU2hdf0tkRdZlzgSyPKw81aDQH7sHOQ5OXHMHDg2kyrwCIOgmUNqxB_c_xwi8o47f2w&refresh_token=AQB_3NEf6etv85DpSO0pIvgU4FUdx_DPDJ5sd-1j7RhBSJkUF3LPJk_ypUV-QgAhRGDdkmoSKjteyIXI-N00qzbkynFlqojjhI954MNzvAfA2uRHUNcoJdv3ke_fU-uroP8Baw";

    let myOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
      },
      mode: "cors",
      cache: "default"
    };

    // FETCH!!!!
    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          categories: json.categories.items
        });
      });
  }
  viewPlaylist(href) {
    console.log(href);
    //this.context.router.history.push("/category-name");
  }
  render() {
    return (
      <Router>
        <div>
          <Headers />
          <section className="content">
            <div className="content__left">
              <Navigator />
              <section className="playlist">
                <a href="">
                  <i className="fa fa-plus-circle newplaylist " />
                  New Playlist
                </a>
              </section>
            </div>
            <div className="content__middle">
              <div className="artist is-verified">
                <div className="artist__header">
                  <div className="artist__info">
                    <div className="profile__img" />
                    <div className="title_info">
                      <div className="artist__info__type">Category</div>
                      <div className="artist__info__name">
                        Thể loại & tâm trạng{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="artist__content">
                  {this.state.categories.map((category, index) => (
                    <div key={index} className="artist__content_load">
                      <img
                        src={category.icons[0].url}
                        alt=""
                        onClick={() => {
                          this.viewPlaylist(category.href);
                        }}
                      />
                      <br />

                      <a>{category.name}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}
export default Category;
