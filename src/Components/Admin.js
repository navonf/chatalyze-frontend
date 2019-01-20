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
      theName : "",
      messages: [],
      initiated: true
    }
  }

  clearChat(names) {
    const chatId = {
      key: names,
    }
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
    })
    .catch(error => {
        console.log('Error fetching and data.', error);
    });
  }

  expandToggle(names) {
    if(this.state.chatData[names]['expandToggle'] != null) {
      var currentChatData = this.state.chatData;
      currentChatData[names]['expandToggle'] = !currentChatData[names]['expandToggle'];
      this.setState({chatData : currentChatData});
    }

    if(this.state.chatData[names]['expandToggle']) {
      var liveTranscript = setInterval(() => {
        if(!this.state.chatData[names]['expandToggle']){
          clearInterval(liveTranscript);
        }

        // fetch to get the transcripts in a loop
        fetch('https://api-chatalyze.herokuapp.com/conversation/get_all_transcript')
          .then((data) => data.json())
          .then((datajson) => {
            if(this.state.chatData[names]['details'] != null) {
              var tempChatData = this.state.chatData;
              tempChatData[names]['details'] = datajson[names]['details'];
              this.setState({chatData : tempChatData});
              console.log("updated details");
              console.log(this.state.chatData);
            }
          })
          .catch(error => {
            console.log(error);
          })

      }, 750);
    }
  }

  componentDidMount() {
    fetch('https://api-chatalyze.herokuapp.com/conversation/get_all_transcript')
      .then((data) => data.json())
      .then((datajson) => {
        for(var key in datajson) datajson[key]['expandToggle'] = false;
        this.setState({
          chatData : datajson
        });
        console.log("yeet");
        console.log(this.state.chatData);
        var ids = [];
        for(var key in datajson) ids.push(key);
        this.setState({chatIds : ids});
      })
      .catch(error => {
          console.log('Error fetching data.', error);
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
          label="Conversations" expanded={true} expanderIcon={<MdKeyboardArrowDown size={35} style={{color:"white"}}/>} >
          <ExpansionList>
            {this.state.chatIds.map((names, idx) => {
              var nameList = names.split("&");
              console.log("in the compo");
              console.log(this.state.chatData[names]['details']);
              return (
                <ExpansionPanel
                  headerStyle={styles.convoHeader} key={names}
                  label={`${nameList.shift()} and ${nameList.shift()}`}
                  onCancel={() => this.clearChat(names)}
                  onExpandToggle={() => this.expandToggle(names)}
                  cancelLabel={"Report"} saveProps={false} cancelSecondary={true} closeOnCancel={false}
                  expanderIcon={<MdKeyboardArrowDown size={35} style={{color:"#E44562"}} />} 
                >
                {
                  this.state.initiated ? 
                  this.state.chatData[names]['details'].map((msg, index) => {
                      var msg_color = 'black';
                      var msg_weight = '400';
                      if(msg.sentiment <= -.2 && msg.magnitude >= .3){
                        msg_color = 'red';
                        msg_weight = '700';
                      }
                      var alert = ''
                      if(msg.sentiment <= -.5) alert = '❌';
                      return(
                          <div key={index} style={{color:`${msg_color}`, fontWeight:`${msg_weight}`}}>
                              {alert}{' '}{msg.chatString}
                          </div>
                      );
                  }) : null
                }
                  {/* {this.state.chatData[names]['details'].forEach((obj, idx) => {
                    console.log("deep in");
                    console.log(obj.chatString);
                    console.log("sent " + obj.sentiment);
                    console.log("mag " + obj.magnitude);
                    return <span>{obj.chatString}</span>
                  })} */}
              </ExpansionPanel>
              ); 
            })}
          </ExpansionList>
        </ExpansionPanel>

      </div>
    )
  }
}

export default Admin;
