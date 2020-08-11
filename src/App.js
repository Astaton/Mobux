import React, { Component } from "react";
import SearchBar from "./SearchBar";
import BigDogPic from "./BigDogPic";
import DogPic from "./DogPic";
import ResultPageExplorer from "./ResultPageExplorer";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogData: "Search for a good boy?",
      dogsOnPage: [],
      selectedDogImgUrl: "",
      status: "error",
      page: 1,
    };
    this.searchForBreed = this.searchForBreed.bind(this);
    this.picClickHandler = this.picClickHandler.bind(this);
    this.hideBigPic = this.hideBigPic.bind(this);
    this.changePageHandler = this.changePageHandler.bind(this);
  }

  componentDidMount() {}

  searchForBreed(breed) {
    const request = new XMLHttpRequest();
    const componentThis = this;

    request.open("get", `https://dog.ceo/api/breed/${breed}/images`);
    request.onload = function () {
      const response = JSON.parse(request.responseText);
      console.log(response);
      componentThis.setState(
        {
          dogData: response.message,
          status: response.status,
          breed: breed,
          page: 1,
        },
        () => {
          console.log(componentThis.state.status);
          if (componentThis.state.status === "success") {
            componentThis.updatePicsOnPage();
          }
        }
      );
    };
    request.send();
  }

  updatePicsOnPage() {
    const end = this.state.page * 9;
    const start = end - 9;
    const dogsOnPage = this.state.dogData.slice(start, end);
    this.setState({ dogsOnPage });
  }

  changePageHandler(num) {
    const newPage = this.state.page + num;
    this.setState({ page: newPage }, () => {
      this.updatePicsOnPage();
    });
  }

  picClickHandler(imgUrl) {
    const bigPicElem = document.getElementById("bigPicContainer");
    bigPicElem.classList.add("showBigPic");
    this.setState({ selectedDogImgUrl: imgUrl });
  }

  hideBigPic() {
    console.log("runnning hideBigPic");
    const bigPicElem = document.getElementById("bigPicContainer");
    bigPicElem.classList.remove("showBigPic");
  }

  render() {
    return (
      <div className="App">
        <BigDogPic
          breed={this.state.breed}
          imgUrl={this.state.selectedDogImgUrl}
          hideBigPic={this.hideBigPic}
        />
        <SearchBar searchForBreed={this.searchForBreed} />
        {this.state.status === "success" ? (
          <div id="displayWrapper">
            <p>{`Your search for ${this.state.breed}s found ${this.state.dogData.length} images`}</p>
            <div id="displayBox">
              {this.state.dogsOnPage.map((pup, index) => (
                <DogPic
                  key={index + pup}
                  imgUrl={pup}
                  breed={this.state.breed}
                  picClickHandler={this.picClickHandler}
                />
              ))}
            </div>
            <ResultPageExplorer
              changePageHandler={this.changePageHandler}
              page={this.state.page}
              dogData={this.state.dogData}
            />
          </div>
        ) : (
          <div>
            <p>
              {this.state.breed
                ? `An error occured while searching for ${this.state.breed}s`
                : ""}
            </p>
            <p>{this.state.dogData}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
