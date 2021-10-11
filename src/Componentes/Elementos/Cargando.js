import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

class IconoCargandoSITb extends React.Component {
    constructor(props) {
      super(props);
      this.player = React.createRef();
    }
  
    doSomething() {
      this.player.current.play(); // make use of the player and call methods
    }
  
    render() {
      return (
        <Player
          onEvent={event => {
            if (event === 'load') this.doSomething(); // check event type and do something
          }}
          ref={this.player}
          autoplay={false}
          loop={true}
          controls={true}
          src="https://assets6.lottiefiles.com/private_files/lf30_ip9sj61c.json"
          style={{ height: '300px', width: '300px' }}
        ></Player>
      );
    }
}

export default IconoCargandoSITb