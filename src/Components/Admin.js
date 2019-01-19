import React, { Component } from 'react'
import {Navbar, Row} from 'reactstrap';
import { ExpansionList, ExpansionPanel } from 'react-md';
import { MdKeyboardArrowDown } from "react-icons/md";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatData : {},
      chatIds : [],
      gotTranscript : false,
      theName : ""
    }
  }

  componentDidMount() {
    // get all conversations.
    fetch('https://api-chatalyze.herokuapp.com/conversation/get_all_keys')
      .then((data) => data.json())
      .then((datajson) => {
        var temp = [];{}
        for(var key in datajson) {
          var arr = datajson[key].sort();
          var newKey = "";

          while(arr.length !== 0) {
            newKey = (arr.length > 1) ? newKey + arr.shift() + "&" : newKey + arr.shift();
          }

          temp[newKey] = {};
          var tempIds = this.state.chatIds;
          tempIds.push(newKey);

          this.setState({chatIds : tempIds});
        }
        this.setState({chatData : temp});
        console.log(this.state.chatData)
      });
  }

  toggleTranscript = () => {
    if(this.state.gotTranscript){
      console.log("YEEY" + this.state.chatData[this.state.theName]);

      return(
        <p>
          {JSON.stringify(this.state.chatData)}
        </p>
      )
    }
  }

  getTranscript(names) {
    const payload = {
      "chatId" : names
    }
    fetch('https://api-chatalyze.herokuapp.com/conversation/get_single_transcript', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((data) => data.json())
      .then((data) => {
        console.log(names);
        var tempChatData = {};
        tempChatData[names] = data;
        console.log("temp" + JSON.stringify(tempChatData));
        this.setState({chatData : tempChatData});
        console.log("now");
        console.log(this.state.chatData);
        this.setState({gotTranscript : !this.state.gotTranscript});
        this.setState({theName : names});
      });
  }

  render() {

    return(
      <div style={{backgroundColor: "white", height:"100vh"}}>
        <Navbar className="bg-dark fixed-top">
            <h3 className="mx-auto" style={{color: '#F6C344'}}>
                <span style={{color: "white"}}>Admin</span>
            </h3>
        </Navbar>
        <br />

        <ExpansionPanel footer={null} label="convos" expanderIcon={<MdKeyboardArrowDown size={35} />} >
          <ExpansionList>
            {
              this.state.chatIds.map((names, idx) => {
                var nameList = names.split("&");
                return <ExpansionPanel label={`${nameList.shift()} and ${nameList.shift()}`}
                  key={names} expanderIcon={<MdKeyboardArrowDown size={35} />} onClick={() => this.getTranscript(names)} >
                  {this.toggleTranscript()}
                </ExpansionPanel>
              })
            }
          </ExpansionList>
        </ExpansionPanel>

      </div>
    )
  }
}

export default Admin;
