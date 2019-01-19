import React, { Component } from 'react'
import {Navbar, Row} from 'reactstrap';
import { ExpansionList, ExpansionPanel } from 'react-md';
import { MdKeyboardArrowDown } from "react-icons/md";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatIds : []
    }
  }

  componentDidMount() {
    console.log("mount");
    // get all conversations.
    fetch('https://api-chatalyze.herokuapp.com/conversation/get_all_keys')
      .then((data) => data.json())
      .then((datajson) => {
        var temp = [];
        for(var arr in datajson) {
          temp.push(datajson[arr]);
        }
        this.setState({chatIds : temp});
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
            <ExpansionPanel label="1" expanderIcon={<MdKeyboardArrowDown size={35} />} >
            </ExpansionPanel>
            <ExpansionPanel label="2" expanderIcon={<MdKeyboardArrowDown size={35} />} >
            </ExpansionPanel>
            <ExpansionPanel label="3" expanderIcon={<MdKeyboardArrowDown size={35} />} >
            </ExpansionPanel>
          </ExpansionList>
        </ExpansionPanel>

      </div>
    )
  }
}

export default Admin;
