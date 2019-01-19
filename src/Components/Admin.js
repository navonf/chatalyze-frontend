import React, { Component } from 'react'
import {Navbar, Row} from 'reactstrap';
import { ExpansionList, ExpansionPanel } from 'react-md';
import { MdKeyboardArrowDown } from "react-icons/md";

class Admin extends Component {

  render() {
    return(
      <div style={{backgroundColor: "white", height:"100vh"}}>
        <Navbar className="bg-dark fixed-top">
            <h3 className="mx-auto" style={{color: '#F6C344'}}>
                <span style={{color: "white"}}>Admin</span>
            </h3>
        </Navbar>
        <br />

        <ExpansionPanel label="convos" expanderIcon={<MdKeyboardArrowDown size={35} />} >
          <p>what is up</p>
        </ExpansionPanel>

      </div>
    )
  }
}

export default Admin;
