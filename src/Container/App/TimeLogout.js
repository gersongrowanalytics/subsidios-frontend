import React, { Component } from 'react'
import IdleTimer from 'react-idle-timer'

export default class TimeLogout extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.handleOnAction = this.handleOnAction.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
    this.handleOnIdle = this.handleOnIdle.bind(this)
  }

  render() {
    return (
      <div>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          // timeout={5000}
          timeout={60000}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        
      </div>
    )
  }

  handleOnAction (event) {
    // console.log('user did something', event)
  }

  handleOnActive (event) {
    // console.log('user is active', event)
    // console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  handleOnIdle (event) {
    // this.props.CerrarSesionReducer()
    // dispatch(CerrarSesionReducer())
    // console.log('user is idle', event)
    // console.log('last active', this.idleTimer.getLastActiveTime())
  }
}