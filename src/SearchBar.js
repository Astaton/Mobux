import React, { Component } from "react";

class SearchBar extends Component {
  searchOnEnter({ keyCode }) {
    if (keyCode === 13) {
      this.clickHandler();
    }
  }

  componentDidMount() {
    const searchInputElem = document.getElementById("searchInput");
    searchInputElem.addEventListener("keyup", (evt) => this.searchOnEnter(evt));
  }

  componentWillUnmount() {
    const searchInputElem = document.getElementById("searchInput");
    searchInputElem.removeEventListener("keyup", (evt) =>
      this.searchOnEnter(evt)
    );
  }

  clickHandler() {
    const searchInputElem = document.getElementById("searchInput");
    const breed = searchInputElem.value.toLowerCase();
    if (breed) {
      searchInputElem.value = "";
      this.props.searchForBreed(breed);
    }
  }

  render() {
    return (
      <div className="searchWrapper">
        <label htmlFor="searchInput">
          Enter the breed of dog to search for
        </label>
        <br></br>
        <input
          type="text"
          id="searchInput"
          name="searchInput"
          defaultValue="poodle"
        />
        <button onClick={() => this.clickHandler()}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
