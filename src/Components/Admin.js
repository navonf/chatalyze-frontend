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

  clearChat(names) {
    const chatId = {
      key: names,
    }
    console.log("clear");

    fetch('https://api-chatalyze.herokuapp.com/conversation/clear',{
      method: 'POST',
      body: JSON.stringify(chatId),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      var currentChatId = this.state.chatData;
      currentChatId[names] = "";
      this.setState({chatData : currentChatId});
    });
  }

  componentDidMount() {
    fetch('https://api-chatalyze.herokuapp.com/conversation/get_all_transcript')
      .then((data) => data.json())
      .then((datajson) => {
        this.setState({chatData : datajson});

        var ids = [];
        for(var key in datajson) ids.push(key);
        this.setState({chatIds : ids});
      });
  }

  render() {
    const styles = {
      convoHeader : {
        fontWeight: 'bold',
      }
    }

    return(
      <div style={{backgroundColor: "white", height:"100vh"}}>
        <Navbar className="bg-dark fixed-top">
            <h3 className="mx-auto" style={{color: '#F6C344'}}>
                <span style={{color: "white"}}>Admin</span>
            </h3>
        </Navbar>
        <br />

        <ExpansionPanel footer={null} headerStyle={styles.convoHeader}
          label="Conversations" expanderIcon={<MdKeyboardArrowDown size={35} />} >
          <ExpansionList>
            {
              this.state.chatIds.map((names, idx) => {
                var nameList = names.split("&");
                return <ExpansionPanel
                  headerStyle={styles.convoHeader} key={names}
                  label={`${nameList.shift()} and ${nameList.shift()}`}
                  cancelLabel={"CLEAR"} cancelSecondary={true} closeOnCancel={false}
                  onCancel={() => this.clearChat(names)}
                  expanderIcon={<MdKeyboardArrowDown size={35} />} >
                  <span>
                    {this.state.chatData[names]['transcript']}
                  </span>
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
