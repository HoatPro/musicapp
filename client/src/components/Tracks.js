import React, { Component } from "react";
import Headers from "./Header";
import Navigator from "./Navigation";
import "./Tracks.css";
class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: [],
      albums: [],
      categories: [],
      playlists: [],
      items: []
    }; //IMPORTANT
  }
  async componentDidMount() {
    await this.showCategory();
  }
  showCategory() {
    //-----------API SETUP-----------
    const BASE_URL =
      "https://api.spotify.com/v1/playlists/37i9dQZF1DX0F4i7Q9pshJ/tracks?";
    let FETCH_URL = BASE_URL + "q=" + this.state.query + "market=ES&limit=50";

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
          items: json.items
        });
      });
  }
  render() {
    return (
      <div className="Tracks">
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
                    <div className="artist__info__type">Music</div>
                    <div className="artist__info__name">Tracks </div>
                  </div>
                </div>
              </div>
              <div className="artist__content">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <td>Tên bài hát</td>
                      <td>Nghệ sĩ</td>
                      <td>Tracks ID</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.track.album.name}</td>

                        <td>{item.track.album.artists[0].name}</td>
                        <p>{item.track.id}</p>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Tracks;
