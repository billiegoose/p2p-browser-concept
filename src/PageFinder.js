import React, { Component } from 'react'
import pure from 'purecss'

const styles = {
  left: 0,
  right: 0,
  top: 40,
  bottom: 0,
  position: 'absolute'
}

export default ({ siteURL, onChange }) => (
  <div style={styles}>
    <div className="pure-g">
      <div className="pure-u-1-1" style={{ height: '50px' }} />
      <div className="pure-u-1-4" />
      <div className="pure-u-1-2">
        <form className="pure-form">
          <fieldset>
            <input
              type="text"
              value={siteURL}
              onChange={onChange}
              placeholder="Enter site URL"
              className="pure-input-3-4"
            />
            <button
              type="button"
              className="pure-button pure-button-primary"
              style={{
                marginLeft: 4,
                width: 70,
                height: 40,
                borderRadius: 4,
                marginTop: 0
              }}
            >
              Go
            </button>
          </fieldset>
        </form>
      </div>
      <div className="pure-u-1-4" />
    </div>
  </div>
)
