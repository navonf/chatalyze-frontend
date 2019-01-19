import React from 'react';
import ReactTyped from 'react-typed';
import '../styles.css';

const Landing = () => {

  return (
    <div style={{backgroundColor: "#202424", height:"100vh"}}>
      <div class="mx-auto text-center landing">
        <h1 class="mx-auto mb-0 landing-font">chatalyze
          <span><img src="chat.png" height="100"/></span>
        </h1>
        <ReactTyped
          strings={["an app to prevent bullying", "an app to prevent abuse", "an app to prevent violence", "an app to prevent harassment", "an app to create a better workplace."]}
          typeSpeed={60}
          backSpeed={90}
          backDelay={1}
          smartBackspace={true}
          className="typedjs-font"
        />
      </div>
    </div>
  )
}

export default Landing;
